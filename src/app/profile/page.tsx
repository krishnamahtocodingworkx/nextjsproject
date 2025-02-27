"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        console.log("User details:", data);
        setUser(data); // Store user data if needed
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, []);

  return <div>Profile: {user ? JSON.stringify(user) : "Loading..."}</div>;
};

export default Profile;
