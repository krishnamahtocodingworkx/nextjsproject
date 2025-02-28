"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const token = window.location.search.split("=")[1];
  console.log("token :", token);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyEmail = async () => {
    try {
      const res = axios.post("api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(error?.message);
    }
  };
  useEffect(() => {
    if (token) verifyEmail();
  }, []);
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h1>Verify Email page</h1>
      <p>{token ? token : "No Token"}</p>
      {verified ? (
        <>
          <h3>Email Verified</h3>
          <Link href={"/login"}>Go back to Login</Link>
        </>
      ) : (
        <>
          <h3>Not Verified</h3>
          {error && <>{error}</>}
        </>
      )}
    </div>
  );
};

export default page;
