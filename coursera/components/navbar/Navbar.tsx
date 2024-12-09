"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Search, Menu } from "lucide-react";
import { X } from "lucide-react";
import { ChevronRight } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    // Function to check the screen width and update state
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setMobileView(window.innerWidth < 500);
      };

      // Check initially on mount
      handleResize();

      // Add event listener for resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  console.log(mobileView);

  return <>{!mobileView ? DesktopView() : MobileView(showMenu, setShowMenu)}</>;
};

export default Navbar;

function MobileView(
  showMenu: boolean,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <nav className="w-full  border   sticky top-0 bg-background">
      {showMenu ? (
        <div className="w-full min-h-[100vh] bg-background ">
          <div className="w-full h-[4rem]   border-b px-2  flex justify-between items-center  ">
            <div></div>
            <div className="">
              <img src="/logo.svg" className="size-24" alt="Image of logo" />
            </div>
            <div>
              <X onClick={() => setShowMenu(!showMenu)} />
            </div>
          </div>
          <div className="w-full  px-4">
            <div className="border-b flex items-center font-semibold  justify-between py-3">
              <div className="text-xs">Explore</div>
              <div>
                {" "}
                <ChevronRight />
              </div>
            </div>
            <div className="py-3">
              <ul className="text-xs space-y-2 font-semibold">
                <li>For Businesses</li>
                <li>For Governmnets</li>
                <li>For Universities</li>
              </ul>
            </div>
          </div>
          <div className="w-full absolute  space-y-2 bottom-0  px-3 py-4 ">
            <div>
             <PrimaryButton className="" title="Join For Free"/>
            </div>
            <div>
              <SecondaryButton title="Log In"/>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex justify-between items-center   border  py-2 px-5 top-0">
          <div className="flex justify-center items-center gap-x-7">
            <div className="text-secondary">
              <Menu onClick={() => setShowMenu(!showMenu)} />
            </div>
            <div className="pr-2">
              <img src="logo.svg" className="w-24 h-10" alt="Logo" />
            </div>
          </div>
          <div className="text-secondary">
            <Search />
          </div>
        </div>
      )}
    </nav>
  );
}

function DesktopView() {
  return (
    <nav className="w-full border flex-wrap flex items-center py-2 justify-between px-10 sticky top-0 bg-background">
      <div className="md:flex flex-wrap items-center gap-x-3">
        <div className="pr-2">
          <img src="logo.svg" className="w-10 md:w-28 h-10" alt="Logo" />
        </div>
        <div>
          <button className="px-3 text-primary flex flex-wrap gap-2 justify-center text-sm items-center border-primary border py-1 rounded-md">
            <span className="font-bold">Explore</span> <ChevronDown size={18} />
          </button>
        </div>
        <div className="relative w-[5rem] md:w-[28rem]">
          <input
            type="text"
            className="text-xs rounded-3xl w-full border px-4 py-3"
            placeholder="What do you want to learn?"
          />
          <div className="absolute top-[17%] text-white right-3 bg-primary rounded-full size-7 grid place-items-center">
            <Search size={18} />
          </div>
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <ul className="flex text-secondary justify-center gap-x-4 text-xs items-center">
          <li>Online Degrees</li>
          <li>Careers</li>
          <li className="text-primary">Log in</li>
        </ul>
        <div className="text-sm">
          <button className="text-primary px-2 py-2 rounded-md border-primary border font-bold">
            Join for free
          </button>
        </div>
      </div>
    </nav>
  );
}
