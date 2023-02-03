import { instance } from ".";
import { getCookie } from "../utils/cookie";

export const getTodoList = async (url) => {
  const response = await instance.get(url, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return response.data;
};

export const getTodoById = async (url, id) => {
  const response = await instance.get(`${url}/${id}`);
  console.log(response.data);
  return response.data;
};
export const createTodo = async (url, form) => {
  const response = await instance.post(url, form);
  console.log(response.data);
  return response.data;
};
export const updateTOdo = async (url, form) => {
  const response = await instance.patch(url, form);
  console.log(response.data);
  return response.data;
};

export const deleteTodo = async (url, id) => {
  const response = await instance.delete(`${url}/${id}`);
  return response.data;
};

export const updateLike = async (url, id) => {
  const response = await instance.post(`${url}/${id}/like`);
  return response.data;
};
