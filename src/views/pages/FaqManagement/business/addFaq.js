import React from "react";

import AddFaq from "../common/addFaq";
import CardComponent from "../../../../components/hoc/cardComponent";

export const AddFaqHome = ({ location: { state } }) => {
  return <AddFaq state={state} segmentName="Business" />;
};

export default CardComponent(AddFaqHome);