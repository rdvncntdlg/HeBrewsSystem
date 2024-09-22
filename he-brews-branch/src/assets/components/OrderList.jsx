import React from 'react';
import OrderCard from './OrderCard';

const OrderList = () => {
  const orders = [
    {
      name: "Tanya Leon",
      orderId: "745632",
      itemCount: "6",
      totalPrice: "$250.00",
      status: "Pending",
      items: [
        { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/33f3231cc52e761d53aff6583ea71bf65af60e3d088de33ed65a710e76e30e06?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Veg Hawaiian Pizza", size: "Regular", price: "$12.00" },
        { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c98126c9be4dbb783b9e5d9624bd4a479277221aa5e558e9098d586262572f1?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Veg-Korma Special Pizza", size: "Large", price: "$35.00" },
        { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7dd67a7c703fa568c7dd02400da855c3bcb06cab85c3865c175c04c66b5d244d?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Chicken Paneer Pizza", size: "Medium", price: "$25.00" }
      ]
    },
    {
      name: "Cornelius Hopkins",
      orderId: "525896",
      itemCount: "3",
      totalPrice: "$82.00",
      status: "Done",
      items: [
        { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/33f3231cc52e761d53aff6583ea71bf65af60e3d088de33ed65a710e76e30e06?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Veg Hawaiian Pizza", size: "Regular", price: "$12.00" },
        { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c98126c9be4dbb783b9e5d9624bd4a479277221aa5e558e9098d586262572f1?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Veg-Korma Special Pizza", size: "Large", price: "$35.00" },
        { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7dd67a7c703fa568c7dd02400da855c3bcb06cab85c3865c175c04c66b5d244d?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Chicken Paneer Pizza", size: "Medium", price: "$25.00" }
      ]
    }
  ];

  return (
    <div className="flex flex-col px-10 pt-10 pb-44 bg-white shadow-lg max-w-[75%] rounded-[30px] max-md:px-5 max-md:pb-24 mt-5">
      <div className="flex flex-col w-full rounded-none max-md:max-w-full">
        {orders.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;