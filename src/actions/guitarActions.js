import guitarServices from "../services/guitarServices";

export const LOADING = "LOADING";
export const LOADED_FAILURE = "LOADED_FAILURE";

export const SET_GUITAR = "SET_GUITAR";

export const SET_ORDER = "SET_ORDER";
export const CREATE_ORDER = "CREATE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";

export const loading = () => ({ type: LOADING });

export const loadedFailure = () => ({ type: LOADED_FAILURE });

export const setGuitar = (payload) => ({
  type: SET_GUITAR,
  payload,
});

export const setGuitarBySpecs =
  (typeGuitar, strings, typeStrings, model, brand, tuner) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      await guitarServices
        .getGuitarBySpecs(typeGuitar, strings, typeStrings, model, brand, tuner)
        .then(function (response) {
          dispatch(
            setGuitar({
              guitar: response.data,
            })
          );
        });
    } catch (error) {
      dispatch(loadedFailure());
    }
  };

export const setOrder = (payload) => ({
  type: SET_ORDER,
  payload,
});

export const createOrder = (payload) => ({
  type: CREATE_ORDER,
  payload,
});

export const updateOrder = (payload) => ({
  type: UPDATE_ORDER,
  payload,
});

export const setOrderById = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    await guitarServices.getOrderById(id).then(function (response) {
      dispatch(
        setOrder({
          order: response.data,
        })
      );
    });
  } catch (error) {
    dispatch(loadedFailure());
  }
};

export const createOrderByUID = (UID, luthierBool, product) => (dispatch) => {
  dispatch(loading());
  try {
    guitarServices
      .createOrderById(UID, luthierBool, product)
      .then(function (response) {
        dispatch(
          createOrder({
            order: response.data,
          })
        );
      });
  } catch (error) {
    console.log(error);
    dispatch(loadedFailure());
  }
};

export const updateOrderById = (id, uID, receipt) => async (dispatch) => {
  dispatch(loading());
  try {
    await guitarServices
      .updateReceiptOrder(id, uID, receipt)
      .then(function (response) {
        dispatch(
          setOrder({
            order: response.data,
          })
        );
      });
  } catch (error) {
    dispatch(loadedFailure());
  }
};
