// import { history } from "../../../history";
import { axiosInstance as axios } from "../../../utility/utils";
import {
  CATEGORY_DATA,
  SEGMENT_DATA,
  IS_LOADING,
  SEGMENT_DATA_BY_ID,
  FAQ_DATA,
  FAQ_DATA_BY_ID,
  CATEGORY_DATA_BY_SEGMENT_ID,
} from "../../action_types";
import { toast } from "react-toastify";
import { history } from "../../../history";
import { getXlsData } from "../../../utility/utils";

export const getCategoryList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`/category/getcategorylist`);
    if (response && response.data && response.data.statusCode === 200) {
      let total_count = response.data ? response.data.additionalInfo : 0;
      dispatch({
        type: CATEGORY_DATA,
        payload: { ...response.data, total_count },
      });
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: CATEGORY_DATA, payload: false });
  }
};

export const getCategoryListBySegmentId = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/category/getcategorybysegmentid/${id}`);
    if (response && response.data.statusCode === 200) {
      dispatch({
        type: CATEGORY_DATA_BY_SEGMENT_ID,
        payload: { ...response.data },
      });
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: CATEGORY_DATA_BY_SEGMENT_ID, payload: false });
  }
};

export const addNewCategory = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/category/addnewcategory`, data);
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      history.push("/faqManagement/category");
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const modifyCategory = (data) => async (dispatch) => {
  try {
    const response = await axios.put(`/category/modifycategory`, data);
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      history.push("/faqManagement/category");
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const blockUnblockCategory = (data, cd) => async (dispatch) => {
  try {
    const { id, is_active } = data;
    const response = await axios.put(
      `/category/activatedeactivate?id=${id}&is_active=${is_active}`
    );
    if (response && response.data.statusCode === 200) {
      toast.success(response.data.message);
      cd();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {}
};

export const getSegmentList = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`/segment/getsegmentlist`);
    if (response && response.data && response.data.statusCode === 200) {
      let total_count = response.data ? response.data.additionalInfo : 0;
      dispatch({
        type: SEGMENT_DATA,
        payload: { ...response.data, total_count },
      });
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: SEGMENT_DATA, payload: false });
  }
};

export const getSegmentById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/segment/getsegmentbyid/${id}`);
    console.log(response.data);
    if (response && response.data && response.data.statusCode === 200) {
      let total_count = response.data ? response.data.additionalInfo : 0;
      dispatch({
        type: SEGMENT_DATA_BY_ID,
        payload: { ...response.data, total_count },
      });
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: SEGMENT_DATA_BY_ID, payload: false });
  }
};

export const addNewSegment = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/segment/addnewsegment`, data);
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      history.push("/faqManagement/segment");
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const modifySegment = (data) => async (dispatch) => {
  try {
    const response = await axios.put(`/segment/modifysegment`, data);
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      history.push("/faqManagement/segment");
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const blockUnblockSegment = (data, cd) => async (dispatch) => {
  try {
    const { id, is_active } = data;
    const response = await axios.put(
      `/segment/activatedeactivate?id=${id}&is_active=${is_active}`
    );
    if (response && response.data.statusCode === 200) {
      toast.success(response.data.message);
      cd();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {}
};

export const getFaqListBySegment = (data, segmentType) => async (dispatch) => {
  try {
    const response = await axios.get(`/faq/getfaqbysegmentname/${segmentType}`);
    if (response && response.data && response.data.statusCode === 200) {
      let total_count = response.data ? response.data.additionalInfo : 0;
      dispatch({
        type: FAQ_DATA,
        payload: { ...response.data, total_count },
      });
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: FAQ_DATA, payload: false });
  }
};

export const addNewFaq = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/faq/addnewfaq`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      history.goBack();
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const modifyFaq = (data) => async (dispatch) => {
  try {
    const response = await axios.put(`/faq/modifyfaq`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response && response.data.statusCode === 200) {
      dispatch({ type: IS_LOADING, payload: false });
      toast.success(response.data.message);
      history.goBack();
    } else {
      dispatch({ type: IS_LOADING, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const blockUnblockFaq = (data, cd) => async (dispatch) => {
  try {
    const { id, is_active } = data;
    const response = await axios.put(
      `/faq/activatedeactivate?id=${id}&is_active=${is_active}`
    );

    if (response && response.data.statusCode === 200) {
      toast.success(response.data.message);
      cd();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {}
};

export const getFaqById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/faq/getfaqbyid/${id}?action=download`);
    if (response && response.data && response.data.statusCode === 200) {
      const faqData = response.data;
      console.log(faqData);
      const { thumb_down } = faqData.data || [];
      const thumbsDown =
        thumb_down &&
        thumb_down.map((down) => {
          return [down.can_id, down.reason];
        });
      thumbsDown ? getXlsData(thumbsDown) : getXlsData([]);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: FAQ_DATA_BY_ID, payload: false });
  }
};

export const bulkUploadFaq = (data, segmentName, cb) => async (dispatch) => {
  try {
    const res = await axios.post(`/faq/bulkuploadfaq`, data, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    if (res && res.data.statusCode === 200) {
      toast.success(res.data.message);
      dispatch(getFaqListBySegment(data, segmentName));
      cb();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {}
};
