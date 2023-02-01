import { instance } from ".";

export const signInApi = async (url, form) => {
  try {
    const response = await instance.post(url, form);
    return response;
  } catch (e) {
    console.log("로그인 실패", e);
  }
};

export const signUpApi = async (url, form) => {
  try {
    const response = await instance.post(url, form);
    return response;
  } catch (e) {
    console.log("회원가입 실패", e);
  }
};
