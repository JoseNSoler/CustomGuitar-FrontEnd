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
      url: `orden/id/${id}`,
    });
  };

  const createOrderById = (UID, luthierBool, product) => {
    return axios({
      method: "POST",
      url: `orden/crear/${luthierBool.toString()}/${UID}`,
      data: product,
    });
  };

  const updateReceiptOrder = (id, uID, receipt) => {
    return axios({
      method: "GET",
      url: `orden/actualizar/${id}/${uID}/${receipt}`,
    });
  };

  return {
    getGuitarBySpecs,
    getOrderById,
    createOrderById,
    updateReceiptOrder,
  };
};

export default guitarServices();
