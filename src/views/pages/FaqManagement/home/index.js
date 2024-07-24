import React from "react";
import { connect } from "react-redux";

import CardComponent from "../../../../components/hoc/cardComponent";

import {
  getFaqListBySegment,
  getFaqById,
} from "../../../../redux/actions/faqManagement";

import Faq from "../common";

const FaqManagement = ({ getFaqListAction, faqData, getFaqByIdAction }) => {
  return (
    <Faq
      getFaqListAction={getFaqListAction}
      faqData={faqData}
      getFaqByIdAction={getFaqByIdAction}
      segmentName="Home"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    faqData: state.FaqReducer.faqData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFaqListAction: (faqData, segmentName) =>
      dispatch(getFaqListBySegment(faqData, segmentName)),
    getFaqByIdAction: (id) => dispatch(getFaqById(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent(FaqManagement));
