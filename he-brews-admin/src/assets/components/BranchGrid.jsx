import React, { useEffect, useState } from 'react';
import BranchCard from './BranchCard';
import AddBranchCard from './AddBranchCard';

function BranchGrid() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    // Logic to refresh the branch list or state
  };

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await fetch('http://localhost:3000/api/branches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBranches();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
        {branches.map((branch) => (
          <div key={branch.id} className="h-full">
            <BranchCard
              id={branch.id}    
              image={branch.image}
              name={branch.name}
              address={branch.address}
              icon={branch.icon}
              onDelete={handleDelete}
            />
          </div>
        ))}
        <div className="h-full">
          <AddBranchCard />
        </div>
      </div>
    </section>
  );
}

export default BranchGrid;
