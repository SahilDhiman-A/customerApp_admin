import { history } from "../../../history";
import { axiosInstance as axios, removeUser } from "../../../utility/utils";
import {
  ADMIN_DATA,
  IS_LOADING,
  NOTIFICATIONS_DATA,
  NOTIFICATION_DATA_BY_ID,
  NOTIFICATION_ANALYTICS,
  NOTIFICATION_STATUS,
} from "../../action_types";
import { toast } from "react-toastify";

export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await axios.post(
      `/user/updateprofile?user_name=${data.user_name}`
    );
    if (response && response.data.statusCode === 200) {
      // await removeUser();
      await localStorage.setItem(
        "spectraAdmin",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("spectraAdmin")),
          user_info: response.data.data,
        })
      );
      dispatch({
        type: ADMIN_DATA,
        payload: JSON.parse(localStorage.getItem("spectraAdmin")),
      });
      dispatch({ type: IS_LOADING, payload: false });

      toast.success(response.data.message);
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (e) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const viewNotification = (id) => async (dispatch) => {
  // let data = {
  //   title: "ABC",
  //   description: "notification notification notification notification",
  //   shortDescription: "notification notification notification notification",
  //   notificationFileLink:
  //     "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  //   canIdDataFile: "",
  //   notificationType: "Generic",
  // };
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await axios.get(
      `/notification/getnotificationsbyid?_id=${id}`
    );
    if (
      response &&
      response.data &&
      response.data.data.length &&
      response.data.statusCode === 200
    ) {
      dispatch({
        type: NOTIFICATION_DATA_BY_ID,
        payload: response.data.data[0],
      });
      dispatch({ type: IS_LOADING, payload: false });
    } else {
      toast.error(response.data.message);
      dispatch({ type: IS_LOADING, payload: false });
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const res = await axios.post("/user/resetpassword", data);
    if (res && res.data.statusCode === 200) {
      removeUser();
      toast.success("Password has been reset. Please login again");
      dispatch({ type: IS_LOADING, payload: false });
      history.push("/");
    } else {
      toast.error(res.data.message);
      dispatch({ type: IS_LOADING, payload: false });
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const postNotification = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await axios.post(
      `/notification/addnewnotification`,
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.messsage);
      history.push("/");
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.messsage);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const getAlltNotifications = (data) => async (dispatch) => {
  const { limit, skip } = data;
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await axios.get(
      `/notification/getallnotificationslist?skip=${skip}&limit=${limit}`
    );
    if (response && response.data && response.data.statusCode === 200) {
      let total_count = response.data ? response.data.additionalInfo : 0;
      dispatch({
        type: NOTIFICATIONS_DATA,
        payload: { ...response.data, total_count },
      });
      dispatch({ type: IS_LOADING, payload: false });
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.messsage);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const getAnalyticData = (id) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await axios.get(
      `/notification/getnotificationsanalytics?refrence_id=${id}`
    );
    if (response && response.data.statusCode === 200) {
      dispatch({ type: NOTIFICATION_ANALYTICS, payload: response.data.data });
      dispatch({ type: IS_LOADING, payload: false });
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.messsage);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const getbulkuploadstatus = (fileUrl) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await axios.get(
      `/notification/getbulkuploadstatus?file_url=${fileUrl}`
    );
    if (response && response.data.statusCode === 200) {
      dispatch({ type: NOTIFICATION_STATUS, payload: response.data.data });
      dispatch({ type: IS_LOADING, payload: false });
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.messsage);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};
