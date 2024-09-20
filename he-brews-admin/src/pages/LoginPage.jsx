import React from "react";
import LoginCard from "../assets/components/LoginCard";

function LoginPage() {
  return (
    <main className="flex overflow-hidden flex-col bg-white">
      <div className="flex relative flex-col w-full min-h-screen"> {/* Changed min-h to screen */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3d65d0260250ff3a3617d23644e59963c0d1780d4632f2a7a4b5a008b07c3e7?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
          alt=""
          className="object-cover absolute inset-0 w-full h-full" 
        />
        <section className="flex relative flex-col justify-center items-center px-16 py-44 w-full bg-neutral-950 bg-opacity-70 h-screen max-md:px-5 max-md:py-24 max-md:max-w-full">
          <div className="pr-14 -mb-9 max-w-full rounded-3xl bg-neutral-100 shadow-[6px_12px_14px_rgba(0,0,0,0.25)] w-[1008px] max-md:pr-5 max-md:mb-2.5">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center items-center px-20 py-56 w-full rounded-3xl bg-neutral-950 max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/775a1679251c75046d413b100265fffa2701ae6f3b53c657655c0c6413ad35e2?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
                    alt="Company Logo"
                    className="object-contain max-w-full aspect-[1.01] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] w-[220px]"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
                <LoginCard />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
