import { instance as axios } from "./config";

export const guitarServices = () => {
  const getGuitarBySpecs = (
    typeGuitar,
    strings,
    typeStrings,
    model,
    brand,
    tuner
  ) => {
    return axios({
      method: "GET",
      url: `guitarra/${typeGuitar}/${model}/${brand}/${strings}/${typeStrings}/${tuner}`,
    });
  };
  return { getGuitarBySpecs };
};

export default guitarServices();
