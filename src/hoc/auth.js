// import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import React, { useEffect } from "react";

export default function (SpecificComponent, option, adminRoute = null) {
  // option
  // null => 아무나 출입가능
  // true => 로그인한 유저만 출입 가능
  // false => 로그인한 유저는 출입 불가능
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    useEffect(() => {
      const token = getCookie("token");
      console.log(token);
      if (!token && option) {
        console.log("go away");
        navigate("/auth");
      }
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}

// const AuthWithHoc = (Component) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = getCookie("tokne");
//     if (!token) navigate("/auth");
//   }, []);
//   return <Component />;
// };

// export default AuthWithHoc;
