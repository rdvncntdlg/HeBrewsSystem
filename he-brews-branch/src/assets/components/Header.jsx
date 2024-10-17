import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header({ text }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState(null); // Initially null to indicate loading
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown') === null) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch employee profile data
  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found for authentication.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/employee-profile', { // Changed to employee profile endpoint
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Profile Data:', data); // Log the response data to inspect structure

        // Ensure data contains the required user fields
        if (data.success && data.user) {
          const { firstname, lastname, position, branch } = data.user; // Destructure user object
          setProfileData({ firstname, lastname, position, branch }); // Set profile data
        } else {
          console.error('Incomplete profile data:', data);
        }
      } catch (error) {
        console.error('Error fetching employee profile:', error);
      }
    };

    fetchEmployeeProfile();
  }, []);

  // Handle logout click
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
    navigate('/'); // Redirect to the login or home page
  };

  return (
    <header className="flex flex-wrap gap-5 justify-between text-black max-md:mr-2.5 max-md:max-w-full">
      <h1 className="my-auto text-4xl font-bold">{text}</h1>
      <div className="flex gap-2 text-right items-center">
        {profileData ? ( // Render only if profileData is available
          <>
            <div className="flex flex-col my-auto">
              <div className="text-base font-bold">{`${profileData.firstname} ${profileData.lastname}`}</div>
              <div className="self-end text-sm max-md:mr-0.5">{profileData.branch}</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/734201e55d4fb723c84ea91e8101c53f5dea06defe30783025a534621eabbcb6?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
              alt="Employee profile"
              className="object-contain shrink-0 rounded-full aspect-square w-[50px]"
            />
          </>
        ) : (
          <div>Loading profile...</div> // Show loading indicator while fetching data
        )}
        <div className="relative">
          <MoreVertical size={20} className="cursor-pointer" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg p-4 w-48 z-10 dropdown">
              <ul className="space-y-2">
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-md transition-colors">
                  Account Settings
                </li>
                <li 
                  className="py-2 px-4 cursor-pointer text-red-500 hover:bg-red-100 rounded-md transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;