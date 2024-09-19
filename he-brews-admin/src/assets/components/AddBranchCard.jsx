import React from 'react';

function AddBranchCard() {
  return (
    <div className="flex flex-col justify-center items-center px-11 py-24 mt-12 max-w-full rounded-3xl border-dashed border-[5px] border-stone-500 w-[227px] max-md:px-5 max-md:pb-24 max-md:mt-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/14e08c967747e01cbdcaed604f2412888ace83d3fc6e34f822b6efc2102477a4?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Add new branch" className="object-contain -mb-5 aspect-[0.83] w-[91px] max-md:mb-2.5" />
    </div>
  );
}

export default AddBranchCard;