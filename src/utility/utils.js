import axios from "axios";
import { history } from "../history";
import { store } from "../redux/storeConfig/store";
import { IS_LOADING } from "../redux/action_types";

// const domain = 'http://basicdev.affleprojects.com/v1' //dev
// const domain = 'http://34.93.57.70:3001/v1' //staging
// const domain = 'http://34.93.57.70:3002/v1' //testing

const domain = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: domain,
});

axiosInstance.interceptors.request.use(function requestSuccess(config) {
  const auth_token =
    localStorage.getItem("spectraAdmin") &&
    JSON.parse(localStorage.getItem("spectraAdmin")).token;
  config.headers["x-source"] = "web";
  if (auth_token) {
    config.headers["Authorization"] = "Bearer " + auth_token;
  } else {
  }
  store.dispatch({ type: IS_LOADING, payload: true });
  return config;
});

axiosInstance.interceptors.response.use(
  function responseSuccess(config) {
    store.dispatch({ type: IS_LOADING, payload: false });
    return config;
  },
  function responseError(error) {
    store.dispatch({ type: IS_LOADING, payload: false });
    if (error && error.response && error.response.status === 401) {
      // rootReducer.p
      // history.push('/pages/login')
      localStorage.removeItem("spectraAdmin");
      // store.dispatch({ type: 'AUTH_STATUS', payload: error.response.status })
      // store.dispatch({ type: REDIRECT_PATH, payload: history.location.pathname })
      history.push("/pages/login");
    }
    if (error && error.response && error.response.status === 403) {
      // history.push('/pages/login')
    }

    return Promise.reject(error);
  }
);

export const setUser = (data) => {
  return localStorage.setItem("spectraAdmin", JSON.stringify(data));
};

export const userData = localStorage.getItem("spectraAdmin")
  ? JSON.parse(localStorage.getItem("spectraAdmin"))
  : {};

export const removeUser = () => localStorage.removeItem("spectraAdmin");

export const route = (e, path, state) => {
  e.preventDefault();
  history.push(path, state);
};

export const subDomainRole =
  localStorage.getItem("spectraAdmin") &&
  JSON.parse(localStorage.getItem("spectraAdmin")).role;

export const getExcelData = (fileUrl) => {
  // const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", "file.xls"); //or any other extension
  document.body.appendChild(link);
  link.click();
};

export const getXlsData = (data) => {
  var csv = "Can_Id,Remark\n";
  data.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = "faq.csv";
  hiddenElement.click();
};
