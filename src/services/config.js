import axios from "axios";

export const instance = axios.create({
  baseURL: "https://app-guitarras-custom.herokuapp.com/",
});
