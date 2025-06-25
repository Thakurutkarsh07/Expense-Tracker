import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const handleSuccess = async () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <button className="w-full border border-gray-300 py-2 mt-2 rounded-lg hover:bg-green-100 transition" onClick={handleSuccess}>Login with Google</button>
    </div>
  );
};

export default GoogleLoginButton;
