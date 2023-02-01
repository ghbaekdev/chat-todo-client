import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInApi, signUpApi } from "../api/auth";
import { setCookie } from "../utils/cookie";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputValue;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSignIn = async () => {
    const token = await signInApi("/auth/signin", inputValue);
    if (token.data.accessToken) {
      setCookie("token", token.data.accessToken, {
        secure: true,
      });
      setInputValue({
        username: "",
        password: "",
      });
      navigate("/");
    }
  };
  const handleSignUp = async () => {
    const token = await signUpApi("/auth/signup", inputValue);
    if (token.data.accessToken) {
      setCookie("token", token.data.accessToken, {
        secure: true,
      });
      setInputValue({
        username: "",
        password: "",
      });
    }
  };

  return (
    <Form>
      <input value={username} name="username" onChange={handleInput} />
      <input value={password} name="password" onChange={handleInput} />
      <button type="button" onClick={handleSignIn}>
        로그인
      </button>
      <button type="button" onClick={handleSignUp}>
        회원가입
      </button>
    </Form>
  );
};

export default Login;

const Form = styled.form``;
