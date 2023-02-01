import axios from "axios";
import { getCookie } from "../utils/cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});
