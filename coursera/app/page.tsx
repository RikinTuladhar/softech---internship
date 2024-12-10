import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RecommendCertificateCard from "@/components/card/RecommendCertificateCard";
import role from "@/types/role";
import Card from "@/components/card/Card";

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
    <div className="w-full min-h-screen ">
      <Navbar />

      {firstSecion()}
      {secondSection()}
      {thirdSection(roles)}
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
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="w-[150px]">
            <PrimaryButton title="Show 8 more" className="" />
          </div>
          <div className="w-[150px]">
            <SecondaryButton title="View All"  />
          </div>
        </div>
      </section>
    </div>
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
