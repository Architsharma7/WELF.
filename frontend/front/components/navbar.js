import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useAuth } from "../auth/authContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isDAOMember } = useAuth();

  return (
    <div className="w-screen">
      <div className="xl:mx-auto xl:flex xl:justify-center xl:mt-5 mt-0">
        <nav className="bg-white xl:px-6 px-2 sm:px-4 py-2 xl:w-3/5 w-full xl:rounded-3xl z-20 border border-black">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl whitespace-nowrap text-black 4xl:text-4xl">
                Welf
                <span className="text-2xl text-blue-600 4xl:text-4xl">.</span>
              </span>
            </a>
            <div className="flex md:order-2">
              {/* <button
                type="button"
                className="text-blue-700 bg-white border border-blue-600 hover:bg-blue-500 hover:text-white hover:scale-110 transition duration-200 rounded-3xl text-sm 4xl:text-lg px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                Connect Wallet
              </button> */}
              <ConnectButton
                showBalance={false}
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
              <button
                className="inline-flex items-center p-2 text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {open && (
              <div className="w-screen bg-white py-4 px-3 flex flex-col items-center mx-auto justify-center text-center">
                {isDAOMember ? (
                  <ul>
                    <li className="text-black mt-2">
                      <a href="/campaign">Campaigns</a>
                    </li>
                    <li className="text-black my-2">
                      <a href="/explore">Proposals</a>
                    </li>
                    <li className="text-black my-2">
                      <a href="/proposal">Create</a>
                    </li>
                    <li className="text-black my-2">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li className="text-black my-2">
                      <a href="/">Home</a>
                    </li>
                    <li className="text-black mt-2">
                      <a href="/campaign">Campaigns</a>
                    </li>
                    <li className="text-black my-2">
                      <a href="/onboard">Join DAO</a>
                    </li>
                    <li className="text-black my-2">
                      <a href="/donatordashboard">Dashboard</a>
                    </li>
                  </ul>
                )}
              </div>
            )}
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              {isDAOMember ? (
                <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                  <li>
                    <a
                      href="/"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/campaign"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Campaigns
                    </a>
                  </li>
                  <li>
                    <a
                      href="/explore"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Proposals
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dashboard"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                  <li>
                    <a
                      href="/"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/campaign"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Campaigns
                    </a>
                  </li>
                  <li>
                    <a
                      href="/onboarding"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Join DAO
                    </a>
                  </li>
                  <li>
                    <a
                      href="/donatordashboard"
                      className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 text-xl relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-black
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 4xl:text-2xl"
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
