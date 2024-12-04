"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { easeIn, motion } from "framer-motion";
import HoverText from "@/components/hoverText/HoverText";
import getTime from "@/util/getDate";
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
  return (
    <div className="w-[95%] mx-2 md:mx-0 md:w-[35rem] z-50 fixed bottom-5 md:bottom-10 shadow-lg  left-0 md:left-10  px-5 md:px-10 flex justify-center gap-4 md:gap-0 md:justify-between items-center rounded-md h-[4.1rem] md:h-[5rem] bg-white text-primary">
      <div className="text-[1.5rem] md:text-[1.9rem]">Outside</div>
      <div className="flex   gap-x-5 items-center  md:gap-x-5 text-[1.2rem]">
        <p className="text-[1rem] text-[#262424]">Menu</p>
        <p className="text-[1rem] text-[#ede9e5] bg-[#262424] rounded-2xl px-3  md:px-[0.5rem] md:py-[0.1rem]">
          Contact
        </p>
      </div>
    </div>
  );
}

function footer() {
  const { kathmandu, milan, belfast, newYork } = getTime();
  return (
    <section className="w-full z-50  p-[1rem] md:p-0 md:px-0  md:pl-[37%]  py-10 md:py-20 min-h-screen bg-[#262424]">
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
          <h1>Kathmandu</h1> <h1>{kathmandu}</h1>
        </div>
        <div className="flex w-full justify-between">
          <h1>Milan</h1> <h1>{milan}</h1>
        </div>
        <div className="flex w-full justify-between">
          <h1>Belfast</h1> <h1 id="belfastTime">{belfast}</h1>
        </div>
        <div className="flex w-full justify-between">
          <h1>New York</h1> <h1 id="newYorkTime">{newYork}</h1>
        </div>
      </div>
    </section>
  );
}

function eightSection() {
  return (
    <section className="w-full space-y-2 pb-48 md:pb-0 md:space-y-10  md:py-14 pl-14 md:pl-96 h-auto md:h-[90vh] bg-background">
      <h1 className="text-[#262424] text-[1.65rem] md:text-[2.4rem] leading-none">
        In the process, we commit a portion of our profits to initiatives in
        Kathmandu. As a company, we aim to be responsible, human-centered, and
        community-oriented, embodying our values from the inside out.
      </h1>
      <div className="w-full relative">
        <div className="absolute z-0 left-32 md:left-[9.5rem]">
          <HoverText title={"Company"} />
        </div>
      </div>
    </section>
  );
}

function seventhSection() {
  return (
    <section className="w-full py-2 md:py-10 min-h-[80vh] bg-background">
      <div className="w-full rounded h-[60vh] md:h-[80vh] overflow-hidden ">
        <motion.img
         initial={{
          opacity: 0.3,
          scaleX: 0.8,
          y: 20,
        }}
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          scaleX: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
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
      <div className="w-full relative">
        <div className="absolute left-[8.1rem] md:left-40">
          <HoverText title={"Approach"} />
        </div>
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
          <motion.div
          initial={{
      
            scaleX: 0.9,
            y: 20,
          }}
          viewport={{ once: true }}
          whileInView={{
            
            scaleX: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
            key={i}
            className="w-full block rounded-md md:flex space-y-2 md:space-y-0   md:h-[80vh] gap-x-0 md:gap-x-20 bg-background"
          >
            <div className="w-full rounded-md overflow-hidden  md:w-[70%]">
              <img
                src={data.imgPath}
                className="rounded-md hover:scale-105 transition-all duration-500 w-full h-full"
                alt="img of item"
              />
            </div>
            <div className="w-full md:w-[30%]">
              <p className="text-[1.1rem] md:text-[1.35rem] text-[#272525]">
                {data.title}
                <span className="text-primary">Mauj →</span>
              </p>
            </div>
          </motion.div>
        ))}
    </section>
  );
}

function fourthSection() {
  return (
    <section className="w-full space-y-5 pr-0 md:pr-96 min-h-[50vh] bg-background">
      <h1 className="text-[2rem]  md:text-[3rem] leading-[2rem] md:leading-[3rem] text-[#272525]">
        Our mission is to support the meaningful companies, causes, and
        communities building a more equitable world.
      </h1>
      <div className="relative   h-[10vh] w-full ">
        <div
          className="  absolute left-[7.4rem] md:left-[8.5rem]
        "
        >
          <HoverText title={"Projects"} />
        </div>
      </div>
    </section>
  );
}

function headerSection() {
  return (
    <motion.h1
      initial={{
        y: 50,
        opacity: 0,
      }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="font-sans pr-0 md:pr-56 text-[2.5rem] leading-none md:leading-none whitespace-pre-wrap md:text-[4rem] text-[#262424]"
    >
      Outside is an impact-driven design & technology studio born in Nepal,
      creating globally.
    </motion.h1>
  );
}

function secondSection() {
  return (
    <section className="video mt-16 md:mt-20 rounded w-full h-auto md:h-[700px]">
      <motion.video
        initial={{
          opacity: 0,
          scaleX: 0.8,
          y: 100,
        }}
        animate={{
          opacity: 1,
          scaleX: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        src="/videos/video1.mp4"
        className="origin-center w-full rounded h-full"
        playsInline
        loop
        autoPlay
        muted
      ></motion.video>
    </section>
  );
}

function thridSection() {
  const [hovered, setHovered] = useState({
    row1: "false",
    row2: "false",
    row3: "false",
    row4: "false",
  });
  const [i, setI] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const row1: string[] = ["Site & App", "Strategy", "UI & UX", "Strategy"];
  const row2: string[] = ["Brand", "Visible", "Strategy", "Tone of voice"];
  const row3: string[] = ["Collateral", "Packaging", "Editiroal", "Merch"];
  const row4: string[] = ["Voice", "Copywriting", "Story Telling", "Messaging"];
  function handleMouseEnter(
    rowName: keyof typeof hovered,
    rowNumber: string[]
  ) {
    setHovered((prev) => ({ ...prev, [rowName]: true }));
    intervalRef.current = setInterval(() => {
      setI((prev) => (prev < rowNumber.length - 1 ? prev + 1 : 0));
    }, 1000);
  }

  function handleMouseLeave(rowName: keyof typeof hovered) {
    setHovered((prev) => ({ ...prev, [rowName]: false }));
    setI(0);
    clearInterval(intervalRef.current); // Clear the interval
  }

  return (
    <section className="flex flex-wrap md:flex-nowrap gap-y-5 w-full mt-28 md:mt-0 mb-32 md:mb-0 min-h-[100vh] bg-background">
      <div className="w-full md:w-[60%] gap-4 md:gap-y-10 flex flex-col pr-0 md:pr-52 justify-center">
        <p className="text-[1.5rem] md:text-[1.8rem] leading-tight text-[#272525]">
          We provide a range of strategy, design, and technology solutions to
          companies & organizations of all sizes.
        </p>
        <div className="w-full relative">
          <div className="absolute left-28 md:left-32">
            <HoverText title={"Service"} />
          </div>
        </div>
      </div>
      <div className="parent w-full md:w-[50%]   text-primary text-left leading-none text-[2.6rem] md:text-[4.95rem] flex justify-center pl-14 md:pl-0 cursor-pointer flex-col">
        <h2
          className={`child`}
          onMouseEnter={() => handleMouseEnter("row1", row1)}
          onMouseLeave={() => handleMouseLeave("row1")}
        >
          {!hovered.row1 ? row1[0] : row1[i]}
        </h2>
        <h2
          className={`child`}
          onMouseEnter={() => handleMouseEnter("row2", row2)}
          onMouseLeave={() => handleMouseLeave("row2")}
        >
          {" "}
          {!hovered.row2 ? row2[0] : row2[i]}
        </h2>
        <h2
          className={`child`}
          onMouseEnter={() => handleMouseEnter("row3", row3)}
          onMouseLeave={() => handleMouseLeave("row3")}
        >
          {" "}
          {!hovered.row3 ? row3[0] : row3[i]}
        </h2>
        <h2
          className={`child`}
          onMouseEnter={() => handleMouseEnter("row4", row4)}
          onMouseLeave={() => handleMouseLeave("row4")}
        >
          {" "}
          {!hovered.row4 ? row4[0] : row4[i]}
        </h2>
      </div>
    </section>
  );
}
