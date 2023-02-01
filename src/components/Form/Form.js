import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { createTodo } from "../../api/todo";

const url = "/boards";

const Form = () => {
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const { title, description } = todo;

  const handleForm = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const createQuery = useMutation(() => createTodo(url, todo), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodo"]);
    },
  });

  return (
    <TodoForm
      onSubmit={(e) => {
        e.preventDefault();
        createQuery.mutate();
      }}
    >
      <input
        value={title}
        onChange={handleForm}
        name="title"
        placeholder="title"
      />
      <input
        value={description}
        onChange={handleForm}
        name="description"
        placeholder="description"
      />
      <button>등록</button>
    </TodoForm>
  );
};

export default Form;

const TodoForm = styled.form``;
