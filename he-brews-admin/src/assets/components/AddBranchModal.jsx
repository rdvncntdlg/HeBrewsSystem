import React, { useState, useEffect, useRef } from 'react';

function AddBranchModal({ onClose }) {
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchImage, setBranchImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for storing latitude and longitude
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleImageChange = (e) => {
    setBranchImage(e.target.files[0]);
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatLng({ lat, lng });

    // Move the marker to the new position
    if (markerRef.current) {
      markerRef.current.setPosition(event.latLng);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', branchName);
    formData.append('address', branchAddress);
    formData.append('image', branchImage);
    formData.append('latitude', latLng.lat);
    formData.append('longitude', latLng.lng);

    try {
      const response = await fetch('http://localhost:3000/api/add-branches', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add branch');
      }

      const result = await response.json();
      console.log('Branch added successfully:', result);
      setLoading(false);
      onClose(); // Close the modal after success
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Error adding branch');
    }
  };

  // Load Google Maps script and initialize map
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
  
      script.onerror = () => {
        console.error('Google Maps script failed to load.');
      };
  
      document.body.appendChild(script);
  
      script.onload = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 }, // Default center
          zoom: 8,
        });
  
        // Add a marker
        markerRef.current = new window.google.maps.Marker({
          position: map.getCenter(),
          map: map,
        });
  
        // Add click event listener to the map
        map.addListener('click', handleMapClick);
      };
    };
  
    loadGoogleMaps();
  }, []);
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Add New Branch</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input 
              type="text" 
              value={branchName} 
              onChange={(e) => setBranchName(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Address</label>
            <input 
              type="text" 
              value={branchAddress} 
              onChange={(e) => setBranchAddress(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
              required
              placeholder="Enter branch address" // Optional placeholder
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Image</label>
            <input 
              type="file" 
              onChange={handleImageChange} 
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300" 
              accept="image/*"
              required // Make it required if needed
            />
          </div>

          {/* Map for selecting location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Location</label>
            <div ref={mapRef} style={{ height: '300px', width: '100%' }}></div>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Branch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBranchModal;
