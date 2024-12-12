'use client'
import React from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }

const page = () => {
  function Image({ id }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
      <section>
        <div ref={ref}>
          <img src={`/${id}.jpg`} alt="A London skyscraper" />
        </div>
        <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
      </section>
    );
  }
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {[1, 2, 1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,,1,1,1].map((image,i) => (
        <Image id={image} key={i} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
};

export default page;
