import { useState } from "react";

import "./App.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function App() {
  const {
    register,
    handleSubmit,
    setError, //set error comming from backend
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "Test@gmail.com",
    },
    resolver: zodResolver(schema), //connectiong zod with hook form
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 2000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", { message: "Email is already taken" });
    }
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input {...register("email")} type="text" placeholder="Email" />
          {errors.email && <div>{errors.email.message}</div>}
          <input {...register("password")} type="text" placeholder="Password" />
          {errors.password && <div>{errors.password.message}</div>}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading" : "Submit"}
          </button>
          {errors.root && <div>{errors.root.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;
