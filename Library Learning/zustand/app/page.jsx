"use client";
import React from "react";
import { create } from "zustand";
const useStore = create((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () =>
    set((state) => ({
      count: state.count != 0 ? state.count - 1 : 0,
    })),
}));

console.log("Rerendrin");
const page = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default page;
