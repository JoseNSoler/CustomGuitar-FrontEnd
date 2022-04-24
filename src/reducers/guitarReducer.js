import * as typeName from "../actions/guitarActions";

const initialState = {
  loading: false,
  error: false,
  guitar: {},
  order: {
    id: "7f30e",
    fecha: "24/04/2022",
    carrito: [
      {
        articulo: {
          id: "c959c",
          tipo: "Acústica",
          modelo: "Concert",
          marca: "FENDER",
          precio: 1200000.0,
          imagen:
            "https://cdn.shopify.com/s/files/1/2235/9983/products/FENDERCC-60SNATURAL_960x.png?v=1630938375",
          numCuerdas: 6,
          tipoCuerda: "Nylon",
          afinacion: "E",
        },
        luthier: {
          seleccionado: true,
          precio: 250000,
        },
        cantidad: 1,
        total: 1450000.0,
      },
    ],
    total: 1450000.0,
    comprobante: "2579862147",
    uid: "ju87tr56ej58",
  },
};

export default function guitar(state = initialState, action) {
  switch (action.type) {
    case typeName.LOADING:
      return { ...state, loading: true };
    case typeName.SET_GUITAR:
      return {
        ...state,
        guitar: action.payload.guitar,
        loading: false,
        error: false,
      };
    case typeName.LOADED_FAILURE:
      return { ...state, loading: false, error: true };
    case typeName.SET_ORDER:
      return {
        ...state,
        order: action.payload.order,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}
