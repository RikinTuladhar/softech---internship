"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
export default function Home() {
  return (
    <div className="w-full relative">
      {navBar()}
      <div className="w-full px-4 md:px-20 mt-10 min-h-[100vh] ">
        <section className="pt-5 md:pt-16">
          {headerSection()}
          {secondSection()}
          {thridSection()}
          {fourthSection()}
          {fifthSection()}
          {sixthFunction()}
          {seventhSection()}
          {eightSection()}
        </section>
      </div>
      {footer()}
    </div>
  );
}

function navBar() {
  return <div className="w-[35rem] fixed bottom-10 shadow-lg  left-10 px-10 flex justify-between items-center rounded-md h-[5rem] bg-white text-primary">
    <div className="text-[1.9rem]">Outside</div>
    <div className="flex gap-x-5 text-[1.2rem]">
      <p className="text-[#262424]">Menu</p>
      <p className="text-[#ede9e5] bg-[#262424] rounded-2xl px-[0.5rem] py-[0.1rem]">Contact</p>
    </div>
  </div>;
}

function footer() {
  return <section className="w-full p-[1rem] md:p-0 md:px-0  md:pl-[37%]  py-10 md:py-20 min-h-screen bg-[#262424]">
    <div className="w-full space-y-5">
      <h1 className="text-[#9f5f45] text-[1.5rem] md:text-[2.563rem]">
        We’re always interested in new ideas.
      </h1>
      <h2 className="text-[1rem] md:text-[1.563rem] underline underline-offset-8">
        Get in touch
      </h2>
    </div>
    <div className="w-full flex text-[1rem] md:text-[20px] text-[#9f5f45] mt-20">
      <div className="w-[50%] md:w-[40%]">
        <ul>
          <li>Home</li>
          <li>Projects</li>
          <li>Services</li>
          <li>Approach</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Company</li>
          <li>Opportunities</li>
        </ul>
      </div>
    </div>
    <div className="w-full flex-col leading-tight py-20 flex md:pr-20 text-[2.2rem] md:text-[4rem] text-[#9f5f45] mt-10 md:mt-20">
      <div className="flex w-full justify-between">
        <h1>Kathmandu</h1> <h1>15:25</h1>
      </div>
      <div className="flex w-full justify-between">
        <h1>Milan</h1> <h1>15:25</h1>
      </div>
      <div className="flex w-full justify-between">
        <h1>Belfast</h1> <h1>15:25</h1>
      </div>
      <div className="flex w-full justify-between">
        <h1>New York</h1> <h1>15:25</h1>
      </div>
    </div>
  </section>;
}

function eightSection() {
  return (
    <section className="w-full space-y-5 md:space-y-10  md:py-14 pl-14 md:pl-96 h-[90vh] bg-background">
      <h1 className="text-[#262424] text-[1.65rem] md:text-[2.4rem] leading-none">
        In the process, we commit a portion of our profits to initiatives in
        Kathmandu. As a company, we aim to be responsible, human-centered, and
        community-oriented, embodying our values from the inside out.
      </h1>
      <div className="w-full ">
        <button className=" text-[20px] md:text-[25px] justify-center items-center gap-x-2 flex text-primary  ">
          <span>Company</span>{" "}
          <span>
            {" "}
            <ArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
}

function seventhSection() {
  return (
    <section className="w-full py-2 md:py-10 min-h-[80vh] bg-background">
      <div className="w-full rounded h-[60vh] md:h-[80vh] overflow-hidden ">
        <img
          src="/images/Home_Company.avif"
          className="w-full h-full md:h-[100vh] rounded object-cover  object-center md:object-bottom"
          alt="image of home"
        />
      </div>
    </section>
  );
}

function sixthFunction() {
  return (
    <section className="w-full my-28 md:my-0  flex flex-col gap-y-10 justify-center items-center min-h-screen">
      <h1 className="text-[#262424]  pr-0 md:pr-32 text-[2.5rem] md:text-[4rem] leading-none">
        To help small, impactful companies compete at scale, we keep our
        approach–to design, development, and collaboration–flexible.
      </h1>
      <div className="w-full">
        <button className=" text-[20px] md:text-[25px] justify-center items-center gap-x-2 flex text-primary  ">
          <span>Approach</span>{" "}
          <span>
            {" "}
            <ArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
}

function fifthSection() {
  const [datas, setDatas] = useState([
    {
      id: 1,
      imgPath: "/images/Home_Mauj.avif",
      title: "Creating a sexual & menstrual resource hub for Arab women with ",
    },
    {
      id: 2,
      imgPath: "/images/Home_F_G.avif",
      title: "Exploring the future of ethically sourced meat with Fork & Good ",
    },
    {
      id: 3,
      imgPath: "/images/Home_Nui.avif",
      title: "Returning to natural materials in fashion with Nui ",
    },
  ]);
  return (
    <section className="w-full mt-14 space-y-12 my-5 md:my-10 md:space-y-20 md:mt-5 min-h-[100vh]">
      {datas &&
        datas.map((data, i) => (
          <div
            key={i}
            className="w-full block md:flex space-y-2 md:space-y-0   md:h-[80vh] gap-x-0 md:gap-x-20 bg-background"
          >
            <div className="w-full md:w-[70%]">
              <img
                src={data.imgPath}
                className="rounded-md w-full h-full"
                alt="img of item"
              />
            </div>
            <div className="w-full md:w-[30%]">
              <p className="text-[1.1rem] md:text-[1.35rem] text-[#272525]">
                {data.title}
                <span className="text-primary">Mauj →</span>
              </p>
            </div>
          </div>
        ))}
    </section>
  );
}

function fourthSection() {
  return (
    <section className="w-full space-y-5 pr-0 md:pr-96 min-h-[50vh] bg-background">
      <h1 className="text-[2rem] md:text-[3rem] leading-[2rem] md:leading-[3rem] text-[#272525]">
        Our mission is to support the meaningful companies, causes, and
        communities building a more equitable world.
      </h1>
      <div className="w-full">
        <button className=" text-[20px] md:text-[25px] justify-center items-center gap-x-2 flex text-primary  ">
          <span>Projects</span>{" "}
          <span>
            {" "}
            <ArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
}

function headerSection() {
  return (
    <h1 className="font-sans pr-0 md:pr-56 text-[2.5rem] leading-none md:leading-none whitespace-pre-wrap md:text-[4rem] text-[#262424]">
      Outside is an impact-driven design & technology studio born in Nepal,
      creating globally.
    </h1>
  );
}

function secondSection() {
  return (
    <section className="video mt-16 md:mt-20  rounded w-full h-auto md:h-[700px]">
      <video
        src="/videos/video1.mp4"
        className="w-full rounded  h-full"
        playsInline
        loop
        autoPlay
        muted
      ></video>
    </section>
  );
}

function thridSection() {
  return (
    <section className="flex flex-wrap md:flex-nowrap gap-y-5 w-full mt-28 md:mt-0 mb-32 md:mb-0  min-h-[100vh] bg-background">
      <div className="w-full md:w-[60%] gap-y-10 flex flex-col pr-0 md:pr-52 justify-center">
        <p className="text-[1.5rem] md:text-[1.8rem] leading-tight text-[#272525]">
          We provide a range of strategy, design, and technology solutions to
          companies & organizations of all sizes.
        </p>

        <div className="w-full">
          <button className=" text-[20px] md:text-[25px] justify-center items-center gap-x-2 flex text-primary  ">
            <span>Services</span>{" "}
            <span>
              {" "}
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
      <div className="w-full md:w-[50%] text-primary text-left leading-none text-[2.6rem] md:text-[4.95rem] flex justify-center pl-14 md:pl-0 flex-col  ">
        <h2>Site & App</h2>
        <h2>Brand</h2>
        <h2>Collateral</h2>
        <h2>Voice</h2>
      </div>
    </section>
  );
}
