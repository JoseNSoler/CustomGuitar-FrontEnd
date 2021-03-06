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

  const createOrderById = (uid, luthierBool, product) => {
    return axios({
      method: "POST",
      url: `orden/crear/${luthierBool.toString()}/${uid}`,
      data: product,
    });
  };

  const updateReceiptOrder = (id, uid, receipt) => {
    return axios({
      method: "GET",
      url: `orden/actualizar/${id}/${uid}/${receipt}`,
    });
  };

  const updateReceiptOrderURL = (id, uID, url) => {
    return axios({
      method: "PUT",
      url: `orden/actualizar/${id}/${uID}`,
      data: {
        comprobante: url
      }
    });
  };

  return {
    getGuitarBySpecs,
    getOrderById,
    createOrderById,
    updateReceiptOrder,
    updateReceiptOrderURL,
  };
};

export default guitarServices();
