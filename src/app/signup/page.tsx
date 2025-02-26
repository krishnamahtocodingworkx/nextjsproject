"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    userName: "",
  });
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form :", form);
    try {
      const res = await axios.post("/api/users/signup", form);
      console.log("Response :", res);

      router.push("/login");
    } catch (error) {
      console.log("Error in Signup :", error);
    }
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center border-white">
      <form
        onSubmit={handleFormSubmit}
        className="bg-sky-950 rounded-lg w-[50vw] px-[10%] border-2 border-red-500 flex flex-col justify-center items-center gap-5"
      >
        <h2 className="font-semibold text-2xl text-cyan-200">Signup Form</h2>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="userName" className="text-blue-400 ">
            Username
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            value={form.userName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, userName: e.target.value }))
            }
            className="px-3 py-2 rounded-md text-black "
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email" className="text-blue-400 ">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="px-3 py-2 rounded-md text-black "
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="password" className="text-blue-400 ">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="text"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            className="px-3 py-2 rounded-md text-black "
          />
        </div>
        <button type="submit">Singup</button>
        <Link href={"/login"}>Back to Login</Link>
      </form>
    </div>
  );
};

export default Signup;
