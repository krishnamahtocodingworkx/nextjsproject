"use client";
import React from "react";

const ProfilePage = ({ params }: any) => {
  console.log("params :", params);
  return (
    <div>
      ProfilePage
      <h1>{params.id}</h1>
    </div>
  );
};

export default ProfilePage;
