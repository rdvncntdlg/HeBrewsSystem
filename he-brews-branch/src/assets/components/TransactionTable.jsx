import React from 'react';
import TransactionTableHeader from './TransactionTableHeader';
import TransactionTableRow from './TransactionTableRow';

const transactions = [
  { id: "INV00001", customer: "Espina, Frankie", staff: "Sanchez, Kim", amount: "218.00", date: "01-05-2019", paymentMethod: "G CASH", branch: "MABINI ST. BATANGAS CITY" },
  { id: "INV00002", customer: "Candor, Valerie", staff: "Villena, Ashley", amount: "250.00", date: "02-14-2019", paymentMethod: "CASH", branch: "BAUAN" },
  { id: "INV00003", customer: "Abrahan, Nheldine", staff: "Atienza, Pauline", amount: "508.00", date: "03-23-2019", paymentMethod: "G CASH", branch: "BAUAN" },
  { id: "INV00004", customer: "Marasigan, Paula", staff: "Sanchez, Kim", amount: "325.00", date: "04-15-2019", paymentMethod: "CASH", branch: "P. BURGOS ST. BATANGAS CITY" },
  { id: "INV00005", customer: "Dilag, Rod Vincent", staff: "Forcado, Daniella", amount: "120.00", date: "05-18-2019", paymentMethod: "G CASH", branch: "BAUAN" },
  { id: "INV00006", customer: "Dimaandal, Carla", staff: "Forcado, Daniella", amount: "175.00", date: "06-08-2019", paymentMethod: "CASH", branch: "P. BURGOS ST. BATANGAS CITY" },
  { id: "INV00007", customer: "Flores, Julie", staff: "Comia, Kristha", amount: "852.00", date: "07-19-2019", paymentMethod: "G CASH", branch: "BAUAN" },
  { id: "INV00008", customer: "Gutierrez, Anne", staff: "Rosete, Elaine", amount: "258.00", date: "08-27-2019", paymentMethod: "G CASH", branch: "MABINI ST. BATANGAS CITY" },
  { id: "INV00009", customer: "Castillo, Dan", staff: "Villena, Ashley", amount: "456.00", date: "09-07-2019", paymentMethod: "CASH", branch: "MABINI ST. BATANGAS CITY" },
  { id: "INV00010", customer: "Cantos, Eric", staff: "Mercado, Jan", amount: "753.00", date: "10-10-2019", paymentMethod: "CASH", branch: "BAUAN" },
  { id: "INV00011", customer: "Ortiz, Lucy", staff: "Nuevez, Hanz", amount: "854.00", date: "11-03-2019", paymentMethod: "G CASH", branch: "P. BURGOS ST. BATANGAS CITY" },
  { id: "INV00012", customer: "Rodriguez, Faye", staff: "Ranchez, Ranz", amount: "824.00", date: "12-04-2019", paymentMethod: "CASH", branch: "BAUAN" }
];

function TransactionTable() {
  return (
    <section className="mt-12 w-full text-black max-md:mt-10 max-md:max-w-full">
      <TransactionTableHeader />
      {transactions.map((transaction, index) => (
        <TransactionTableRow key={transaction.id} transaction={transaction} isEven={index % 2 === 0} />
      ))}
    </section>
  );
}

export default TransactionTable;