"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("response logout", res);
      if (res.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log("error in logout :", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1>Dashboard Page</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
