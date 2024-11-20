import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-custom-black text-white py-6 animate-fade-in delay-500">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm mb-4">&copy; {new Date().getFullYear()} He Brews Cafe. All rights reserved.</p>
          {/* Card Container */}
          <div className="flex justify-center gap-6">
            {/* App Store Card */}
            <a
              href="https://apps.apple.com/us/app/your-app" // Replace with your app's App Store link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-custom-black rounded-lg shadow-lg p-4 w-60 flex items-center justify-between"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1f/App_Store_logo_2018.svg" // App Store logo image
                alt="Download on the App Store"
                className="h-10"
              />
              <div className="text-left">
                <p className="text-sm">Download on the</p>
                <p className="font-bold">App Store</p>
              </div>
            </a>

            {/* Google Play Card */}
            <a
              href="https://play.google.com/store/apps/details?id=com.yourapp" // Replace with your app's Google Play link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-4 w-60 flex items-center justify-between"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_Play_Store_logo_2015.svg" // Google Play logo image
                alt="Get it on Google Play"
                className="h-10"
              />
              <div className="text-left">
                <p className="text-sm">GET IT ON</p>
                <p className="font-bold">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
