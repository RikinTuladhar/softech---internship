"use client";
import { useCounterStore } from "@/store/store";
import Image from "next/image";
import { useEffect } from "react";

const logger = () => {
  const counter = useCounterStore.getState().count;
  console.log("Count", counter);
};

const setDefault = () => {
  useCounterStore.setState({ count: 1 });
};

export default function Home() {
  const count = useCounterStore((state) => state.count);

  return <OtherComponent count={count} />;
}

const OtherComponent = ({ count }: { count: number }) => {
  useEffect(() => {
    logger();
    setDefault();
  }, []);
  const increment = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);
  return (
    <div className="w-full h-screen flex justify-center flex-col items-center">
      <div> {count}</div>
      <div className="space-x-10">
        <button className=" " onClick={increment}>
          Increment
        </button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};
