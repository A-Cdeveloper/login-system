import { useState, useContext } from "react";
import { AuthContext } from "../store/authContext";
import { useNavigate } from "react-router-dom";

const useLoginReg = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auhtCtx = useContext(AuthContext);
  //
  const sendRequest = async (values, fn, mode) => {
    try {
      setIsLoading(true);
      const res = await fn(values);
      const data = await res.json();
      if (res.status === 400) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
      if (mode === "login") {
        const { first_name, last_name, email, accessToken, refreshToken, expiresIn } = data;
        auhtCtx.login(first_name, last_name, email, accessToken, refreshToken, expiresIn);
      } else {
        navigate("/conformation", { replace: true, state: { email: values.email } });
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return {
    sendRequest,
    isLoading,
    error,
    auhtCtx,
  };
};

export default useLoginReg;
