import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const HoverText = ({title}) => {
  return (
    <div className="relative  inline-block group">
      <button className="absolute  transition-all right-0 flex justify-center items-center hover:gap-x-0 gap-x-5 text-[20px] md:text-[25px] text-primary">
        {/* Move "Services" and shrink the underline */}
        <motion.span
          // initial={{
          //   x: 0,
          // }}
          // whileHover={{ traslateX: 15 }}

          className="transition-transform duration-300"
        >
          {title}
        </motion.span>
        <span>
          <ArrowRight />
        </span>

        {/* Shrinking underline */}
        <div className="absolute bottom-0  w-full h-[1px] bg-primary transition-all duration-300   "></div>
      </button>
    </div>
  );
};

export default HoverText;
