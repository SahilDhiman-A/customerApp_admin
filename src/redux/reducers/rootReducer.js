import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import loader from "./loader";
import adminReducer from "./admin";
import FaqReducer from "./faqManagement";

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  loader,
  adminReducer,
  FaqReducer,
});

export default rootReducer;
