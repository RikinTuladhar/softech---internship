"use client";

import SideBar from "../../components/sidebar";
import Header from "../../components/header";
import PageWrapper from "../../components/pagewrapper";
import { useState ,useEffect } from "react";


export default function PublicClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasGap = true;
  const gapClassName = hasGap ? "gap-10" : "";
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
   
  <>

  {
  isClient ?
  <div className={`flex ${gapClassName} min-h-screen`}>
    <SideBar />
    <div className="flex flex-col w-full">
      <Header />
      <PageWrapper>{children}</PageWrapper>
    </div>
  </div> : <div className={`flex  min-h-screen`}/>
    
 
  }
  </>
     
  );
}
