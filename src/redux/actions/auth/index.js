import { history } from "../../../history";
import { axiosInstance as axios } from "../../../utility/utils";
import { ADMIN_DATA, IS_LOADING } from "../../action_types";
import { toast } from "react-toastify";

export const registerAction = (data) => {
  return async (dispatch) => {
    const response = "";
    await localStorage.setItem("spectraAdmin", JSON.stringify({ ...data }));
    dispatch({ type: "CHANGE_ROLE", payload: "admin" });
    history.push("/");
  };
};

export const loginAction = (data) => async (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.post("/user/login", data);
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      await localStorage.setItem(
        "spectraAdmin",
        JSON.stringify({ ...response.data.data, role: "superadmin" })
      );
      dispatch({
        type: ADMIN_DATA,
        payload: JSON.parse(localStorage.getItem("spectraAdmin")),
      });
      dispatch({
        type: "CHANGE_ROLE",
        payload: response.data.data.user_info.user_type,
      });
      history.push("/");
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const logOutAction = (data) => {
  return async (dispatch) => {
    await localStorage.removeItem("spectraAdmin");
    history.push("/pages/login");
  };
};
