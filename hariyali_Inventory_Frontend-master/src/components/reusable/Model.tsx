import React from "react";

export default function Modal({ children }:{children:React.ReactNode}) {
    return (
        <div className="fixed z-50 inset-0 bg-black/40 w-[100%]   min-h-screen flex md:items-center py-20 justify-center">
            <div className=" px-5 md:px-0">{children}</div>
        </div>
    );
}
