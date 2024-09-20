import React from 'react';
import FeedbackItem from './FeedbackItem';

const feedbackItems = [
  { title: "Food", bgColor: "bg-zinc-300" },
  { title: "Food Quality", bgColor: "bg-neutral-100" },
  { title: "Drinks", bgColor: "bg-neutral-100" },
  { title: "Customer Service", bgColor: "bg-zinc-300" },
  { title: "Menu", bgColor: "bg-zinc-300" },
  { title: "Ambiance", bgColor: "bg-neutral-100" },
  { title: "Amount of Serving", bgColor: "bg-neutral-100" },
  { title: "Price", bgColor: "bg-zinc-300" }
];

function FeedbackGrid() {
  return (
    <div className="mt-2 ml-3 max-w-full w-[800px]">
      {[0, 2, 4, 6].map((index) => (
        <div key={index} className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <FeedbackItem title={feedbackItems[index].title} bgColor={feedbackItems[index].bgColor} />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <FeedbackItem title={feedbackItems[index + 1].title} bgColor={feedbackItems[index + 1].bgColor} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackGrid;