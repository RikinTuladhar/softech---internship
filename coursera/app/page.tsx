import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RecommendCertificateCard from "@/components/card/RecommendCertificateCard";
import role from "@/types/role";
import Card from "@/components/card/Card";
import PopularCard from "@/components/card/PopularCard";
import ExploreCard from "@/components/card/ExploreCard";

export default function Home() {
  const roles: role[] = [
    {
      id: 1,
      title: "Project Management ",
    },
    {
      id: 2,
      title: "Data Analyst ",
    },
    {
      id: 3,
      title: "Digital Marketer ",
    },
    {
      id: 4,
      title: "IT Support Specialist",
    },
    {
      id: 5,
      title: "Business Analyst",
    },
    {
      id: 6,
      title: "Cybersecurity ",
    },
    {
      id: 7,
      title: "Front-End Development ",
    },
    {
      id: 8,
      title: "UX Designer ",
    },
  ];
  return (
    <div className=" w-full min-h-screen ">
      <div className=" hidden md:flex w-full text-white  gap-x-5 pl-14 items-center h-[40px] bg-black">
        <h3 className="hover:bg-white hover:text-black py-4">
          For Individuals
        </h3>
        <h3 className="hover:bg-white hover:text-black py-4">For Businesses</h3>
        <h3 className="hover:bg-white hover:text-black py-4">
          For Universities
        </h3>
        <h3 className="hover:bg-white hover:text-black py-4">
          For Governments
        </h3>
      </div>
      <Navbar />

      <div className="w-full py-4 space-y-4 min-h-screen px-4 text-center ">
        <h1 className="text-[48px] leading-tight font-semibold">
          Learn without limits
        </h1>
        <p>
          Start, switch or advance your carrer with more than 7000 courses,
          Professional Certificates, and degree from world-class universities
          and companies.
        </p>
        <div className="space-y-4">
          <button className="text-white rounded-md w-full bg-primary py-2 px-2">
            Join For Free
          </button>
          <button className="text-primary rounded-md w-full bg-background border border-primary  py-2 px-2">
            Try Coursera for Business
          </button>
        </div>
      </div>

      <div className="w-full py-4 bg-[#F2F5FA] min-h-[50vh] ">
        <p className="text-[16px] px-10 font-semibold text-center">
          We collaborate with{" "}
          <span className="text-primary underline">
            350+ leading universities and companies
          </span>
        </p>
      </div>

      <div className="py-10 px-4">
        <h1 className="text-[20px] font-bold">
          Lunch a new career in as little as 6 months
        </h1>
        <button
          className="text-primary text-[14px] underline font-semibold
        "
        >
          View all roles
        </button>
        <div className=" flex flex-row gap-4 w-full py-6 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0  w-[240px] space-y-4 px-4 border py-6 rounded-2xl min-h-[80vh] "
            >
              <div className="space-y-1">
                <h2 className="text-[18px] font-semibold">Project Manager</h2>
                <p className="text-[12px] text-secondary">
                  Oversee the planning and execution of projects to ensure
                  they're successful
                </p>
              </div>
              <div className="w-full h-[0.1px] bg-secondary"></div>
              <div>
                <h3 className="text-[12px]">Median Salary </h3>
                <div>
                  <span className="text-[12px]"> All Occupations</span>
                  <div className="w-[50%] rounded-md flex items-center px-1 py-1 text-secondary bg-gray-100">
                    <span className="text-xs font-bold">$37,960</span>
                  </div>
                  <div>
                    <span className="text-[12px]">Project Manager</span>
                    <div className="rounded-md flex items-center px-1 py-1 text-white bg-purple-900">
                      <span className="text-xs font-bold">$37,960</span>
                    </div>
                    <div className="py-2">
                      <p className="text-[12px] text-secondary">
                        Job Openings:336,402**
                      </p>
                      <p className="text-[12px] text-secondary">
                        Projected 10 year growth: +11.1%**
                      </p>
                    </div>
                    <div>
                      <span className="text-[12px] text-primary font-semibold">
                        See recommendations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between px-2 ">
            <div className="px-1  w-[60%] rounded-2xl flex justify-evenly  items-center bg-slate-100">
              <div className="size-3 rounded-full bg-slate-600 "></div>
              <div className="size-3 rounded-full bg-slate-600 "></div>
              <div className="size-3 rounded-full bg-slate-600 "></div>
              <div className="size-3 rounded-full bg-slate-600 "></div>
              <div className="size-3 rounded-full bg-slate-600 "></div>
            </div>
            <div className="flex gap-x-2">
              <div className="size-7 rounded-full bg-red-200"></div>
              <div className="size-7 rounded-full bg-red-400"></div>
            </div>
          </div>
      </div>

      {/* Desktop view */}
      {/* {
        <>
          {firstSecion()}
          {secondSection()}
          {thirdSection(roles)}
          {forthSection()}
          {fifthSection()}
          {sixthSection()}
          {seventhSection()}
          {eightSection()}
          {ninthSection()}
          {TenthSection()}
          {elevnthSection()}
          {twelvethSection()}
          {thirtheenSection()}
          {fourthteenSection()}
          {footer()}
        </>
      } */}
    </div>
  );
}

function footer() {
  return (
    <section className="py-10 min-h-screen  gap-y-20 px-10 flex flex-col   bg-[#f5f5f5] w-full">
      <div className="grid gap-10 grid-cols-4">
        {" "}
        <div>
          <h1 className="text-[20px] font-bold py-2">Get Started with AI</h1>
          <ul className="text-[14px] space-y-4">
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold py-2 text-[20px]">
            Popular Carrer Certificate
          </h1>
          <ul className="text-[14px] space-y-4">
            <li>Adobe Content Creator Professional Certificate</li>
            <li>Adobe Content Creator Professional Certificate</li>
            <li>Adobe Content Creator Professional Certificate</li>
            <li>Adobe Content Creator Professional Certificate</li>
            <li>Adobe Content Creator Professional Certificate</li>
            <li>Adobe Content Creator Professional Certificate</li>
          </ul>
        </div>
        <div>
          <h1 className="text-[20px] font-bold py-2">Popular Subjects</h1>
          <ul className="text-[14px] space-y-4">
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
            <li>Artificial Intelligence</li>
          </ul>
        </div>
        <div>
          <h1 className="text-[20px] font-bold py-2">Popular Resources</h1>
          <ul className="text-[14px] space-y-4">
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
            <li>High-Income Skills Worth Learning</li>
          </ul>
        </div>
      </div>
      <div className="grid gap-10 grid-cols-4">
        {" "}
        <div>
          <h1 className="text-[20px] font-bold py-2">Coursera</h1>
          <ul className="text-[14px] space-y-4">
            <li>About</li>
            <li>About</li>
            <li>About</li>
            <li>About</li>
            <li>About</li>
            <li>About</li>
          </ul>
        </div>
        <div>
          <h1 className="text-[20px] font-bold py-2">
            Popular Carrer Certificate
          </h1>
          <ul className="text-[14px] space-y-4">
            <li>Learners</li>
            <li>Learners</li>
            <li>Learners</li>
            <li>Learners</li>
            <li>Learners</li>
            <li>Learners</li>
          </ul>
        </div>
        <div>
          <h1 className="text-[20px] font-bold py-2">Popular Subjects</h1>
          <ul className="text-[14px] space-y-4">
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
            <li>AWS & DLAI GenAI with LLMs Course</li>
          </ul>
        </div>
        <div>
          <h1 className="text-[20px] font-bold py-2">More</h1>
          <ul className="text-[14px] space-y-4">
            <li>Place</li>
            <li>Place</li>
            <li>Place</li>
            <li>Place</li>
            <li>Place</li>
            <li>Place</li>
            <li>Place</li>
          </ul>
        </div>
      </div>

      <div>
        <div className="w-full h-[0.1px]  bg-gray-400"></div>
        <div className="w-full flex py-16 items-center justify-between ">
          <div className="text-[14px] text-secondary">
            &copy 2024 Coursera Inc. All rights reserced
          </div>
          <div className="flex gap-5">
            <div>
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/facebook.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/linkedin.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/twitter.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/youtube.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/instagram.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/9b7e964107839c77644d7e7d15035b73.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function fourthteenSection() {
  return (
    <section className="py-10 px-10  bg-background    w-full">
      <div className="flex px-12 h-[135vh] justify-between items-center">
        <div className="w-[50%] h-full ">
          <img
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/front-page-rebrand/secondary-consumer-cta/Image-Next-Step.png?auto=format%2Ccompress&dpr=1&w=471&h=330&q=40"
            alt="image of girl"
            className="w-full "
          />
        </div>
        <div className="w-[50%] flex flex-col gap-y-4 h-full px-24 pt-10 ">
          <h1 className="text-[44px] font-semibold ">
            Take the next step toward your personal and professional goals with
            Coursera.
          </h1>
          <span className="text-[16px]">
            Join now to receive personalized recommendations from the full
            Coursera catalog.
          </span>
          <div className="w-[200px]">
            <PrimaryButton className="" title="Join for Free" />
          </div>
        </div>
      </div>
      <div className="w-full  h-[1px] bg-secondary"></div>
      <div className="text-secondary  space-y-1  pt-8 text-xs">
        <div>
          <span>
            * Employment, Wages, and Projected Change in Employment by Typical
            Entry-level Education : U.S. Bureau of Labor Statistics. Sept. 2022,
            www.bls.gov/emp/tables/education-summary.htm{" "}
          </span>
        </div>
        <div>
          <span>
            ** Median salary and job opening data are sourced from United States
            Lightcast™ Job Postings Report. Data for job roles relevant to
            featured programs (7/1/2022 - 6/30/2023) Median salary (median with
            0-2 years experience for UX Designer) and job opening data are
            sourced from United States Lightcast™ Job Postings Report. Data for
            job roles relevant to featured programs (7/1/2022 - 6/30/2023)
          </span>
        </div>
        <div>
          <span>
            *** Growth rate data is sourced from United States Lightcast™ Job
            Postings Report. Data for job roles relevant to featured programs
            (7/1/2022 - 6/30/2023)
          </span>
        </div>
      </div>
    </section>
  );
}

function thirtheenSection() {
  return (
    <section className="py-10 px-10 bg-[#f2f5fa] flex justify-between items-center  w-full">
      <div
        className="w-[50%] space-y-5   h-full
    "
      >
        <h1 className="text-[48px] font-semibold">
          Drive your business forward by empowering your talent
        </h1>
        <p>
          Train teams with industry-leading experts and universities, enhanced
          by AI tools and recognized credentials.
        </p>
        <div className="w-[50%]">
          <PrimaryButton className="" title="Discover Coursera for Business" />
        </div>
        <div>
          <span>Upskill a small team?</span>{" "}
          <span className="text-primary underline">
            Check out coursera for Teams
          </span>
        </div>
      </div>
      <div className="w-[50%] h- px-10 grid grid-cols-3  py-8   ">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="border px-10 py-10  flex justify-center items-center"
          >
            <img
              className=""
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/13nB6DdjBJdV5aWWWB5DbH/115574ebbc6de3dffd98daed665dc736/loreal.svg?auto=format%2Ccompress&dpr=1&w=60%25&h=18"
              alt="Lorem"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function twelvethSection() {
  return (
    <section className="py-10 px-36 bg-background min-h-[150vh] w-full">
      <div className="w-full flex py-4 justify-center flex-col items-center h-[150vh]  ">
        <div>
          <h1 className="text-[44px] font-semibold">
            From the Coursera community
          </h1>
          <h3 className="text-[28px]">
            162+ million people have already joined Coursera
          </h3>
        </div>
        <div className="  flex w-full min-h-[100vh]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[35%]  py-10 h-full px-2 ">
              <div className="flex  justify-center  items-center ">
                <img
                  src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/N4qrT1XIveNL5SMHSkjTH/b57854e9246bd3aa9fe9ebc51ce650d1/Circle_Kenia.png?auto=format%2Ccompress&dpr=1&w=202&h=202&q=40"
                  alt="Image of girl"
                  className=" h-full w-48"
                />
              </div>
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-[#382d8b] text-[28px]">
                  Kenia R.
                </h3>
                <h5 className="text-[16px]  text-secondary">United States</h5>
                <div className="flex justify-center items-center">
                  <div className="text-center w-[4rem] h-[2px] bg-[#2a73cc]"></div>
                </div>
              </div>
              <div className="py-4">
                <p className="text-[20px] text-center">
                  “Being a mother — especially a working mother means I’m
                  constantly trying to juggle my schedule, my kids’ schedules,
                  and work. I am very grateful for the flexible and remote
                  learning programs that Coursera has to offer.”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function elevnthSection() {
  return (
    <section className="w-full px-5   inline-block relative pb-5  bg-[#ebf3ff]">
      <div className="  justify-center relative items-center flex flex-col h-full">
        {/* Wrapper div to force height adjustment */}
        <div
          className="relative w-[50%] flex justify-center items-center"
          style={{ paddingTop: "500px" }}
        >
          {/* Image Container */}
          <div className="images absolute   -top-8  w-[540px] h-[490px]">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6xXERT0XZPJDXgjPzr8Bve/d858e0cda1a5e5df2cb8accd65d5c1b7/outcomes.png?auto=format%2Ccompress&dpr=1&w=606&h=553&q=40"
              className="w-full h-full"
              alt="image of gallery"
            />
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center flex-col px-8 space-y-4">
          <h1 className="text-[48px] font-bold ">
            Learner outcomes on Coursera
          </h1>
          <p className="text-[20px]">
            <span className="text-[#373a3c] font-bold">
              77% of learners report career benefits
            </span>{" "}
            <span className="text-[#373a3c]">
              {" "}
              , such as new skills, increased pay, and new job opportunities.
            </span>{" "}
            <span className="text-primary underline underline-offset-4">
              2023 Coursera Learner Outcomes Report
            </span>
          </p>
          <div className="w-full">
            <div className="w-[190px]">
              <PrimaryButton className="" title="Join for Free" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TenthSection() {
  return (
    <section className="w-full px-10 min-h-[30rem] py-[28px] bg-background]">
      <h1 className="text-[44px]">Explore Coursera</h1>

      <div className="py-8 grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <ExploreCard key={i} />
        ))}
      </div>
    </section>
  );
}

function ninthSection() {
  return (
    <section className="px-10  py-4">
      <span className="text-xs ">
        <sup>1</sup> Each university determines admission and the number of
        pre-approved prior learning credits that may count toward the degree
        requirements according to institutional policies, which may consider any
        existing credits you may have.
      </span>
    </section>
  );
}

function eightSection() {
  return (
    <section className="w-full px-10 min-h-[30rem] py-[28px] bg-background]">
      <div className="top headings">
        <h3 className="text-[20px] font-semibold">Degree Programs</h3>
        <h1 className="text-[44px]">Get a head start on a degree today</h1>
        <p className="text-[20px]">
          With these programs, you can build valuable skills, earn career
          credentials, and make progress toward a degree before you even enroll.
        </p>
      </div>
      <div className="py-4 grid-cols-4 grid gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="w-[150px]">
          <PrimaryButton title="Show 8 more" className="" />
        </div>
        <div className="w-[150px]">
          <SecondaryButton title="View All" />
        </div>
      </div>
    </section>
  );
}

function seventhSection() {
  return (
    <section className="w-full px-10 min-h-[30rem] py-[28px] bg-background]">
      <div className="top headings">
        <h3 className="text-[20px] font-semibold">100% Free</h3>
        <h1 className="text-[44px]">Start learning with free courses</h1>
        <p className="text-[20px]">
          Explore free online courses from the world's top universities and
          companies.
        </p>
      </div>
      <div className="py-4 grid-cols-4 grid gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="w-[150px]">
          <PrimaryButton title="Show 8 more" className="" />
        </div>
        <div className="w-[150px]">
          <SecondaryButton title="View All" />
        </div>
      </div>
    </section>
  );
}

function sixthSection() {
  return (
    <section className="w-full px-10 min-h-[30rem] py-[28px] bg-background]">
      <div className="top headings">
        <h3 className="text-[20px] font-semibold">
          Courses and Professional Certificates
        </h3>
        <h1 className="text-[44px]">New on Coursera</h1>
        <p className="text-[20px]">
          Explore our newest programs, focused on delivering in-demand skills.
        </p>
      </div>
      <div className="py-4 grid-cols-4 grid gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="w-[150px]">
          <PrimaryButton title="Show 8 more" className="" />
        </div>
        <div className="w-[150px]">
          <SecondaryButton title="View All" />
        </div>
      </div>
    </section>
  );
}

function fifthSection() {
  return (
    <section className="w-full px-10 min-h-[20rem] py-[50px] bg-background]">
      <div className="bg-[#f0f6ff] p-12 w-full  rounded-xl">
        <div className="space-y-4">
          <h1 className="font-semibold text-2xl">
            Popular certificate, new AI skills
          </h1>
          <p className="text-sm">
            Get job-ready with Google Professional Certificates—now including AI
            skills.
          </p>
        </div>
        <div className="pt-16 grid grid-cols-3 justify-between gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <PopularCard key={i} />
          ))}
          <div className="w-[8rem]">
            <PrimaryButton className="" title="View All" />
          </div>
        </div>
      </div>
    </section>
  );
}

function forthSection() {
  return (
    <section className="w-full px-10 min-h-[30rem] py-[20px] bg-background]">
      <div className="top headings">
        <h3 className="text-[20px] font-semibold">
          Specialization and Professional Certificates
        </h3>
        <h1 className="text-[44px]">Most Popular Certificates</h1>
        <p className="text-[20px]">
          Explore our most popular programs, get job-ready for an in-demand
          career.
        </p>
      </div>
      <div className="py-4 grid-cols-4 grid gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="w-[150px]">
          <PrimaryButton title="Show 8 more" className="" />
        </div>
        <div className="w-[150px]">
          <SecondaryButton title="View All" />
        </div>
      </div>
    </section>
  );
}

function thirdSection(roles: role[]) {
  return (
    <section className="bg-background px-10 w-full min-h-[100vh] py-5 ">
      <div className="w-full flex  items-center gap-x-8 py-5">
        <h1 className="text-[30px] text-[#0f1114] font-bold">
          Launch a new career in as little as 6 months
        </h1>
        <button className="text-sm flex justify-center items-center gap-x-2 text-[#0f1114]">
          <span>View all roles </span>
          <ArrowRight size={20} />{" "}
        </button>
      </div>
      <div className="w-full flex items-center justify-between min-h-[10vh]">
        {roles.map((role, i) => (
          <h2
            className="relative cursor-pointer text-sm hover:bg-blue-100 px-1 text-[#0f1114] py-4"
            key={i}
          >
            {role.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 hover:w-full"></span>
          </h2>
        ))}
      </div>
      <div className="w-full h-[5px] bg-slate-400"></div>
      <div className="w-full min-h-[100vh] border  py-10 my-5  rounded-lg  px-10 bg-background">
        <div className="w-full">
          <h1 className="text-[32px] font-bold">Digital Marketer</h1>
          <p className="text-sm text-[#5b6780]">
            Define and develop digital strategies to deliver business growth
            through online channels
          </p>
          <div className="py-4 text-sm space-y-5">
            <h2>Median Salary</h2>
            <div className="flex gap-5">
              <div className="w-[20rem] rounded-lg text-[#5b6780] px-2 flex items-center h-[2rem] bg-[#E8EEF7]">
                <p>All Occupations</p>
              </div>
              <p className="text-sm text-[#5b6780]">$320,233*</p>
            </div>
            <div className="flex gap-5">
              <div className="w-[30rem] text-white px-2 flex items-center text-sm rounded-lg h-[2rem] bg-[#340385]">
                <p>Digital Marketer</p>
              </div>
              <p className="text-[#5b6780] text-sm">$320,233**</p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#5b6780]"></div>
          <div className="py-5 space-y-2 font-semibold text-xs">
            <div className="flex space-x-1 ">
              <p className="text-dim">Job Opening:</p>
              <p>81,468**</p>
            </div>
            <div className="flex space-x-1">
              <p className="text-dim">Job Opening:</p>
              <p>81,468**</p>
            </div>
          </div>

          <div className="w-full min-h-28">
            <h3 className="py-5 font-bold">
              Recommended Professional Certificates
            </h3>
            <div className="w-full min-h-400 py-2 grid grid-cols-3 gap-2 ">
              {Array.from({ length: 3 }).map((_, i) => (
                <RecommendCertificateCard key={i} />
              ))}
            </div>
            <div className="w-full flex items-center gap-5 my-8  min-h-[15vh]">
              <div className="w-[100px]">
                <img
                  src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/27pQhthyhIEPsaxSlr0LFa/774f94e7410035dc3713e3d6ab256fd3/hillary_testimonial_image.jpg?auto=format%2Ccompress&dpr=1&h=136"
                  alt="image of girl"
                  className="w-full h-full"
                />
              </div>
              <div className="text-sm text-secondary">
                <p>
                  "After a year of taking courses on Coursera, I can happily say
                  that I have become a confident and aspiring entrepreneur and a
                  better marketing and advertising professional."
                </p>
                <p>– Hillary G.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function secondSection() {
  return (
    <section className="w-full h-[15rem] py-[16px] bg-[#F5F5F5]">
      <div className="w-full space-y-10  py-4">
        <h1 className=" text-center cursor-pointer text-[20px] md:text-[30px]">
          <span className="">We collaborate with </span>{" "}
          <span className="hover:underline hover:underline-offset-8 text-primary">
            {" "}
            350+ leading universities and companies
          </span>
        </h1>
        <div className="w-full  flex justify-around gap-8 items-center px-20 ">
          <div className="illion w-40">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/77hmeEJo3ZPlURCU02fD52/aa37b7f7b52285ba350acac62d8af5c1/illinois-3.png?auto=format%2Ccompress&dpr=2&h=32"
              alt=""
            />
          </div>
          <div className="duke w-24">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6XkOucZz6pMLV5DPvXCgCL/1777129a58b0a62b237bd28e9956afe8/duke-3.png?auto=format%2Ccompress&dpr=2&h=32"
              alt=""
            />
          </div>
          <div className="google w-28">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1c6RjBHi3Lqb9QpWxje7iA/b529f909c5230af3210ba2d47d149620/google.png?auto=format%2Ccompress&dpr=2&h=37"
              alt=""
            />
          </div>
          <div className="w-14">
            <img
              className="m w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pGxPXMmJf4n7umK1H/ccec31bbe2358210bf8391dcba6cd2f1/umich.png?auto=format%2Ccompress&dpr=2&h=55"
              alt=""
            />
          </div>
          <div className=" ibm w-24">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3toC4I7jbWxiedfxiyNjtT/735faeaf976a9692f425f8c3a7d125dc/1000px-IBM_logo.svg.png?auto=format%2Ccompress&dpr=2&h=37"
              alt=""
            />
          </div>
          <div className="imperial-college w-36">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/FHOd44z40jTFsSSao84AM/d1e357f5650a23bf2936114112d44445/imperial.png?auto=format%2Ccompress&dpr=2&h=35"
              alt=""
            />
          </div>
          <div className="stanford w-32">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4FSFmNXuDIzTvFb7n0v4mK/704ae9e0a7981fb6415f4cb4609bbbb3/stanford.svg?auto=format%2Ccompress&dpr=2&h=27"
              alt=""
            />
          </div>
          <div className="pen w-32">
            <img
              className="w-full h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ZeiauXe5bPProvfuIo7o2/55d005d42979ab585cdfa01f825b7d4f/penn.svg?auto=format%2Ccompress&dpr=2&h=37"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function firstSecion() {
  return (
    <section className="w-full flex items-center py-10  min-h-[100vh] ">
      <div className="w-full md:w-[60%] px-8 md:px-20 ">
        <h1 className="text-5xl md:text-7xl text-center md:text-left font-semibold">
          Learn without limits
        </h1>

        <p className="py-8 pr-0   text-center md:text-left md:pr-16">
          Start, switch, or advance your career with more than 7,000 courses,
          Professional Certificates, and degrees from world-class universities
          and companies.
        </p>
        <div className="flex-col md:flex-row flex items-center gap-y-5 gap-x-2">
          <div className="w-full md:w-[9rem]">
            <PrimaryButton className="" title={"Join For Free"} />
          </div>
          <div className="w-full md:w-[15rem]">
            <SecondaryButton title={"Try Coursera for Business"} />
          </div>
        </div>
      </div>
      <div className="hidden md:inline-block md:w-[40%] px-5">
        <img
          src="/CourseraLearners_C_Composition_Hillary_copy__3_.png"
          alt="image of lady"
        />
      </div>
    </section>
  );
}
