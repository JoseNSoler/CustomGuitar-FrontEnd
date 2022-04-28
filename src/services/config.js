import axios from "axios";
//"https://app-guitarras-custom-v2.herokuapp.com/",
export const instance = axios.create({
  baseURL: "https://app-guitarras-custom.herokuapp.com/",
});
