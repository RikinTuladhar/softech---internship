import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-yellow-300">
      <Navbar />

      <section className="w-full flex py-20 min-h-[100vh] bg-green-200">
        <div className="w-[60%] px-20 bg-yellow-300">
          <h1 className="text-7xl font-semibold">Learn without limits</h1>

          <p className="py-8 pr-16">
            Start, switch, or advance your career with more than 7,000 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
         <div className="flex items-center gap-x-2">
         <div className="w-[10rem]">
         <PrimaryButton />
         </div>
         <div className="w-[20rem]">
         <SecondaryButton />

         </div>
         </div>
        </div>
        <div className="w-[40%] bg-green-800">
          <img
            src="/CourseraLearners_C_Composition_Hillary_copy__3_.png"
            alt="image of lady"
          />
        </div>
      </section>
    </div>
  );
}
