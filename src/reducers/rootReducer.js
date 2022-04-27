import { combineReducers } from "redux";
import guitar from "./guitarReducer";

const rootReducer = combineReducers({
  guitar: guitar,
});

export default rootReducer;
