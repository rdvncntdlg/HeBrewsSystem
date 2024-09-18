import React from 'react';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';

function Users() {
    return (
      <div className="overflow-hidden max-md:pr-5">
      <Header text="Users"/>
      <div className='flex justify-end mt-8 mb-4'>
        <SearchBar />
      </div>
      <section className="mt-16 max-md:mt-10 max-md:max-w-full">
      </section>
  </div>
    )
  };
  
  export default Users;