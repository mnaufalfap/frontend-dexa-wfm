/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { HOST_API } from "../../config";
import axios from "axios";

export default function Logout() {
  const handleLogout = async () => {
    const token = localStorage.getItem("_token");

    const url = `${HOST_API}/user/logout`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      if (response.status === 200 || response.status === 201) {
        localStorage.removeItem("_token");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
      }
      window.location.href = "/auth/login";
    } catch (error: any) {
      return response.data.message;
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);
  return <div></div>;
}
