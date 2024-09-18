import React from "react";
import LoginForm from "./LoginForm";

function LoginCard() {
  return (
    <div className="pr-14 -mb-9 max-w-full rounded-3xl bg-neutral-100 shadow-[6px_12px_14px_rgba(0,0,0,0.25)] w-[504px] max-md:pr-5 max-md:mb-2.5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center items-center px-20 py-56 w-full rounded-3xl bg-neutral-950 max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full">
            <img
              src="src/assets/images/logo.png"
              className="transition-all w-48" // or adjust this as needed
              alt="Logo"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
