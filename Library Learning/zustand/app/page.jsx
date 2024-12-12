"use client";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import {
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
console.log("Rerendrin");
import { wrap } from "framer-motion";

function ParallaxText({ children, baseVelocity = 100, arr }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {arr.map((d, i) => (
          <span key={i}>{d} </span>
        ))}
      </motion.div>
    </div>
  );
}

const page = () => {
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(null);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <motion.div
        className="bg-red-300 fixed top-0 left-0 right-0 h-10 "
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <section className="w-full pt-[85vh] pb-[85vh] relative bg-purple-900">
        <ParallaxText
          arr={[
            "Outree",
            "Vintro",
            "wqewqe",
            "Outree",
            "Vintro",
            "Outree",
            "Vintro",
            "Outree",
            "Vintro",
          ]}
          baseVelocity={-5}
        >
          Framer Motion
        </ParallaxText>
        <ParallaxText arr={["Outree", "Vintro"]} baseVelocity={5}>
          Scroll velocity
        </ParallaxText>
      </section>
      <div className="w-full h-[200vh] "></div>

      <div ref={scrollRef} style={{ overflow: "scroll" }}>
        <motion.div
          className="bg-green-400 size-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
        />
      </div>
    </div>
  );
};

export default page;
