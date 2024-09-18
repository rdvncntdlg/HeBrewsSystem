import { Search } from 'lucide-react';
import React from 'react';

function SearchBar() {
  return (
    <div className="flex flex-col max-w-full w-[20%] max-md:mt-10 max-md:mr-2.5">
  <form className="flex items-center px-4 py-2 text-base whitespace-nowrap bg-white border border-black border-solid rounded-2xl text-neutral-400">
    <input
      type="text"
      id="searchInput"
      placeholder="Search"
      className="bg-transparent border-none outline-none text-black flex-grow"
    />
    <button
      type="submit"
      aria-label="Search"
      className="text-black ml-2"  // Adds a small margin if needed
    >
      <Search />
    </button>
  </form>
</div>

  );
}

export default SearchBar;