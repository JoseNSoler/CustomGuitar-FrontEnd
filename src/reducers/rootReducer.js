import { combineReducers } from "redux";
import guitar from "./guitarReducer";

const reducer = combineReducers({
  guitar: guitar,
});

export default reducer;
