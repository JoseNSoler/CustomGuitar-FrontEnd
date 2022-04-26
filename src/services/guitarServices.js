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

  const getOrderById = (id) => {
    return axios({
      method: "GET",
      url: `orden/${id}`,
    });
  };

  const createOrderById = (UID, luthierBool, product) => {
    return axios({
      method: "POST",
      url: `orden/crear/${luthierBool.toString()}/${UID}`,
      data: product

    });
  }

  return { getGuitarBySpecs, getOrderById, createOrderById };
};

export default guitarServices();
