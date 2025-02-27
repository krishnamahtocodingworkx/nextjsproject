"use client";
import React from "react";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const params = useParams(); 
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{params?.id ? `User ID: ${params.id}` : "No ID Provided"}</h2>
    </div>
  );
};

export default ProfilePage;
