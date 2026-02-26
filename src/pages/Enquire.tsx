import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Enquire = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/tours", { replace: true });
  }, [navigate]);
  return null;
};

export default Enquire;
