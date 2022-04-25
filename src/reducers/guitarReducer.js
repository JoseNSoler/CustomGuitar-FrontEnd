import * as typeName from "../actions/guitarActions";

const initialState = {
  loading: false,
  error: false,
  guitar: {},
  order: {},
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
