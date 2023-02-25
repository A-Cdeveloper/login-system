import { Navigate, useSearchParams } from "react-router-dom";

import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import Loader from "../../components/ui/Loader";

import useLoginReg from "../../hooks/loginreg";
import { userLogin, userRegistration } from "../../utils/http-users";

const LoginRegister = () => {
  const { sendRequest, isLoading, error, auhtCtx } = useLoginReg();
  /* eslint-disable */
  const [searchParams, setSearchParams] = useSearchParams();
  let mode = "login";
  if (searchParams.get("mode") && searchParams.get("mode") !== "login") {
    mode = "register";
  }

  // useEffect(() => {
  //   setError("");
  // }, [searchParams]);

  //

  console.log(error);

  const loginHandler = (values) => {
    sendRequest(values, userLogin, mode);
  };

  const registerHandler = (values) => {
    sendRequest(values, userRegistration, mode);
  };

  let content = (
    <div className="loginbox">
      {mode && mode === "login" && (
        <>
          <LoginForm title="Login" errorMsg={error} onLogin={loginHandler} />
        </>
      )}
      {mode && mode === "register" && <RegisterForm title="Create account" errorMsg={error} onRegister={registerHandler} />}
    </div>
  );

  if (auhtCtx.isLogedIn) {
    content = <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <>
      {content}
      {isLoading && <Loader />}
    </>
  );
};

export default LoginRegister;
