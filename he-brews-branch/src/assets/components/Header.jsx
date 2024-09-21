import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header({ text }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle logout click
  const handleLogout = () => {
    // Perform any logout logic here, such as clearing authentication tokens

    // Redirect to login page
    navigate('/');
  };

  return (
    <header className="flex flex-wrap gap-5 justify-between text-black max-md:mr-2.5 max-md:max-w-full">
      <h1 className="my-auto text-4xl font-bold">{text}</h1>
      <div className="flex gap-2 text-right items-center">
        <div className="flex flex-col my-auto">
          <div className="text-base font-bold">Candor, Valerie Myca L.</div>
          <div className="self-end text-sm max-md:mr-0.5">Administrator</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/734201e55d4fb723c84ea91e8101c53f5dea06defe30783025a534621eabbcb6?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
          alt="Administrator profile"
          className="object-contain shrink-0 rounded-full aspect-square w-[50px]"
        />
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
