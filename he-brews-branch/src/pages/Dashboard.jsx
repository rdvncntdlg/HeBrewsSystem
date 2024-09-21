import React from 'react';
import Header from '../assets/components/Header';
import StatCard from '../assets/components/StatCard';
import { PhilippinePeso, ShoppingBag, Users } from 'lucide-react';
import OrderList from '../assets/components/OrderList';

function Dashboard() {
    const statCards = [
        {
          icon: <PhilippinePeso />,
          value: "190k",
          change: "+5%",
          label: "Sales Today",
          changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf170c69e1ddd703a1700f6352d361f55ace47024a95caf6e063ed1f57651d4c?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
          bgColor: "bg-white",
        },
        {
            icon: <PhilippinePeso />,
            value: "90k",
            change: "+5%",
            label: "Revenue Today",
            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf170c69e1ddd703a1700f6352d361f55ace47024a95caf6e063ed1f57651d4c?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
            bgColor: "bg-white",
          },
        {
          icon: <ShoppingBag />,
          value: "200",
          change: "+3%",
          label: "Orders Today",
          changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf170c69e1ddd703a1700f6352d361f55ace47024a95caf6e063ed1f57651d4c?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
          bgColor: "bg-yellow-700",
        },
        {
          icon: <Users />,
          value: "100",
          change: "-10%",
          label: "Customers Today",
          changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/03f304ae1711358f6aba7cdb04d5e051f25c48c67b73f4e89b7289bc5b38a060?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
          bgColor: "bg-cyan-500",
        },
      ];
  return (
    <div className="overflow-hidden max-md:pr-5">
        <Header text="Dashboard"/>
        <section className="mt-16 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {statCards.map((card, index) => (
                  <StatCard key={index} {...card} />
                ))}
              </div>
        </section>
        <OrderList />
    </div>
  )
};

export default Dashboard;