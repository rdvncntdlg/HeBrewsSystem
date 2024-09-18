import React from "react";
import LoginCard from "../assets/components/LoginCard";

function LoginPage() {
  return (
    <main className="flex overflow-hidden scrollbar-hidden flex-col bg-white">
      <div className="flex relative overflow-hidden scrollbar-hidden flex-col w-full min-h-[1024px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3d65d0260250ff3a3617d23644e59963c0d1780d4632f2a7a4b5a008b07c3e7?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
          alt=""
          className="object-cover absolute inset-0 size-full overflow-hidden scrollbar-hidden"
        />
        <section className="flex relative flex-col justify-center items-center px-16 py-44 w-full bg-neutral-950 bg-opacity-70 max-md:px-5 max-md:py-24 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <LoginCard />
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;