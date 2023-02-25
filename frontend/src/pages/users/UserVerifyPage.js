import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { userConformation } from "../../utils/http-users";

const UserVerifyPage = () => {
  const params = useParams();
  const [errorMsg, setError] = useState("");
  const { user_id, verToken } = params;

  useEffect(() => {
    const conformUser = async () => {
      try {
        const res = await userConformation(user_id, verToken);
        const data = await res.json();
        console.log(data);
        if (res.status === 400) {
          setError(data.message);
          return;
        }
      } catch (error) {
        setError(error);
      }
    };

    conformUser();
  }, [user_id, verToken]);

  let content = (
    <div className="text-center">
      <h1>You account is now active.</h1>
      <Link to="/?mode=login">Login to your account.</Link>
    </div>
  );
  if (errorMsg) {
    content = (
      <div className="text-center">
        <h1>{errorMsg}</h1>
      </div>
    );
  }

  return <>{content}</>;
};

export default UserVerifyPage;
