import React, { useEffect, useState } from 'react';

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); // Number of transactions per page
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch data from the backend with the Bearer token
    fetch('https://hebrewssystem.onrender.com/transactions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the transactions:', error);
        setError('Failed to fetch transactions');
      });
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const invoiceDate = new Date(transaction.invoicedate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      return (
        (!start || invoiceDate >= start) &&
        (!end || invoiceDate <= end)
      );
    });
    setFilteredTransactions(filtered);
  }, [startDate, endDate, transactions]);

  // Get the current page's transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <section className="mt-12 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-sm font-semibold text-gray-700">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate" className="text-sm font-semibold text-gray-700">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-neutral-950 text-white text-sm font-bold">
              <th className="px-4 py-2">INVOICE ID</th>
              <th className="px-4 py-2">CUSTOMER</th>
              <th className="px-4 py-2">STAFF</th>
              <th className="px-4 py-2">AMOUNT</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">PAYMENT METHOD</th>
              <th className="px-4 py-2">BRANCH</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={transaction.invoice_id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="text-center py-3 px-4 border">{transaction.invoice_id}</td>
                <td className="text-center py-3 px-4 border">{transaction.customer_id}</td>
                <td className="text-center py-3 px-4 border">{transaction.lastname}, {transaction.firstname}</td>
                <td className="text-center py-3 px-4 border">{transaction.totalamount}</td>
                <td className="text-center py-3 px-4 border">
                  {new Date(transaction.invoicedate).toLocaleDateString('en-US')}
                </td>
                <td className="text-center py-3 px-4 border">{transaction.paymentmethod}</td>
                <td className="text-center py-3 px-4 border">{transaction.branchname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="flex items-center text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default TransactionTable;