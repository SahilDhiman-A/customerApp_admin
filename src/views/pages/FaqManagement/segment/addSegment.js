import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CardComponent from "../../../../components/hoc/cardComponent";
import { history } from "../../../../history";
import SimpleReactValidator from "simple-react-validator";
import {
  addNewSegment,
  modifySegment,
} from "../../../../redux/actions/faqManagement";
import { useDispatch } from "react-redux";

const AddSegment = ({ location: { state } }) => {
  const dispatch = useDispatch();
  let pathname = window.location.pathname;
  let path_type = pathname.split("/")[3];

  const [segmentData, setSegmentData] = useState({
    name: "",
    id: "",
  });

  const [heading, setHeading] = useState("Add New Segment");

  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (path_type === "edit_segment") {
      if (state && state.data) {
        const { name } = state.data;
        const id = state.data._id;
        setSegmentData({ ...segmentData, name, id });
      } else {
        history.goBack();
      }
      setHeading("Edit Segment");
    }
  }, []);

  const { name, id } = segmentData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      const data = {
        ...segmentData,
      };
      if (path_type === "edit_segment") {
        dispatch(modifySegment(data));
      } else {
        delete data.id;
        dispatch(addNewSegment(data));
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleChange = (e) => [
    setSegmentData({
      ...segmentData,
      [e.target.name]: e.target.value,
    }),
  ];

  return (
    <React.Fragment>
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        <Button color="primary" onClick={() => history.goBack()}>
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label>Segment Name</Label>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="input_error mt-1">
                  {validator.current.message(
                    "name",
                    name,
                    "required|max:50:alpha_space"
                  )}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default CardComponent(AddSegment);
