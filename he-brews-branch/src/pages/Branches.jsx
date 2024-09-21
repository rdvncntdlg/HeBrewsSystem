import React from 'react';
import Header from '../assets/components/Header';
import BranchGrid from '../assets/components/BranchGrid';
import SearchBar from '../assets/components/SearchBar';


function Branches() {
  return (
    <div className="overflow-hidden max-md:pr-5">
    <Header text="Branches" />
    <div className='flex justify-end mt-8 mb-4'>
      <SearchBar />
    </div>
    
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col items-center gap-4">
      <BranchGrid />
        
      </div>
    </div>
  </div>
  );
}

export default Branches;