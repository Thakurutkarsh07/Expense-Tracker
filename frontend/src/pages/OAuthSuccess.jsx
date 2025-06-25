// OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // redirect to homepage
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
