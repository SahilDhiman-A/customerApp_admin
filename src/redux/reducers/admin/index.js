import {
  NOTIFICATION_DATA_BY_ID,
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_QUERY,
  NOTIFICATION_ANALYTICS,
  NOTIFICATION_LIST_PAGE_INDEX,
  NOTIFICATION_STATUS,
} from "../../action_types";

const initialState = {
  notificationDataById: {
    data: {
      order_info: {
        title: "",
        detailed_description: "",
        sort_description: "",
        type: "",
      },
    },
    pdf_url: "",
    image_url: "",
    video_url: "",
    user_file: "",
  },
  notificationsData: {
    data: [],
    total_count: 0,
  },
  notificationsQuery: {
    limit: 10,
    skip: 0,
  },
  pageIndex: 0,
  notificationAnalyticsData: {
    total_user: 0,
    device_ids: 0,
    notification_read: 0,
  },
  notificationsStatus: {
    data: {
      file_url: "",
      status: "",
      is_active: true,
      _id: "",
    },
  },
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_DATA_BY_ID:
      return { ...state, notificationDataById: { ...action.payload } };
    case NOTIFICATIONS_DATA:
      return { ...state, notificationsData: { ...action.payload } };
    case NOTIFICATIONS_QUERY:
      return { ...state, notificationsQuery: { ...action.payload } };
    case NOTIFICATION_LIST_PAGE_INDEX:
      return { ...state, pageIndex: action.payload };
    case NOTIFICATION_ANALYTICS:
      return { ...state, notificationAnalyticsData: action.payload };
    case NOTIFICATION_STATUS:
      return { ...state, notificationsStatus: action.payload };
    default:
      return { ...state };
  }
};

export default adminReducer;
