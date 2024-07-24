import { IS_LOADING } from "../../action_types";

const initialState = {
  isLoading: false,
};

const loader = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return { ...state };
  }
};

export default loader;
