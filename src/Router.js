import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./hoc/auth";
import Login from "./pages/auth";
import Chat from "./pages/chat";
import Todo from "./pages/todo";
import WaitingRoom from "./pages/waitingRoom";

const Router = () => {
  const AuthTodo = Auth(Todo, true);
  const AuthLogin = Auth(Login, false);
  const AuthChat = Auth(Chat, true);
  const AuthChatRoom = Auth(WaitingRoom, true);

  return (
    <Routes>
      <Route path="/" element={<AuthTodo />} />
      <Route path="/auth" element={<AuthLogin />} />
      <Route path="/chat" element={<AuthChatRoom />} />
      <Route path="/chat/:roomName" element={<AuthChat />} />
    </Routes>
  );
};

export default Router;
