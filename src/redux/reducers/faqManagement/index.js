import * as actionTypes from "../../action_types";

const initialState = {
  categoryList: {
    data: [],
    count: 0,
  },
  categoryListBySegmentId: {
    data: [],
  },
  pageIndex: 0,
  segmentList: {
    data: [],
    count: 0,
  },
  segmentById: {
    data: [],
  },
  faqData: {
    data: [],
  },
  faqDataById: {
    data: [],
  },
};

const FaqReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CATEGORY_DATA:
      return { ...state, categoryList: { ...action.payload } };
    case actionTypes.CATEGORY_DATA_BY_SEGMENT_ID:
      return { ...state, categoryListBySegmentId: { ...action.payload } };
    case actionTypes.SEGMENT_DATA:
      return { ...state, segmentList: { ...action.payload } };
    case actionTypes.SEGMENT_DATA_BY_ID:
      return { ...state, segmentById: { ...action.payload } };
    case actionTypes.FAQ_DATA:
      return { ...state, faqData: { ...action.payload } };
    case actionTypes.FAQ_DATA_BY_ID:
      return { ...state, faqDataById: { ...action.payload } };
    default:
      return { ...state };
  }
};

export default FaqReducer;
