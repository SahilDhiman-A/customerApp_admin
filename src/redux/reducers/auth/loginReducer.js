import { ADMIN_DATA } from "../../action_types";

export const login = (
  state = {
    userRole: localStorage.getItem("spectraAdmin")
      ? JSON.parse(localStorage.getItem("spectraAdmin")).role
      : "",
    adminData: localStorage.getItem("spectraAdmin")
      ? JSON.parse(localStorage.getItem("spectraAdmin"))
      : {},
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_FB": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_TWITTER": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_GITHUB": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_JWT": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_JWT": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload };
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.payload };
    }
    case ADMIN_DATA: {
      return { ...state, adminData: action.payload };
    }
    default: {
      return state;
    }
  }
};
