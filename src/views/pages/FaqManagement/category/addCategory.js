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
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  addNewCategory,
  modifyCategory,
  getSegmentList,
  getCategoryListBySegmentId,
} from "../../../../redux/actions/faqManagement";
import { toast } from "react-toastify";

const AddFaq = ({ location: { state } }) => {
  let pathname = window.location.pathname;
  let path_type = pathname.split("/")[3];
  const dispatch = useDispatch();

  const FaqReducer = useSelector((state) => state.FaqReducer);

  const { segmentList, categoryListBySegmentId } = FaqReducer;

  const [categoryData, setCategoryData] = useState({
    name: "",
    id: "",
    segment_id: "",
    segment_name: "",
  });
  const [heading, setHeading] = useState("Add New Category");
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (path_type === "edit_category") {
      if (state && state.data) {
        const { name, segment_id } = state.data;
        const id = state.data._id;
        const segment_name = state.data.segment_info.name;
        setCategoryData({
          ...categoryData,
          name,
          id,
          segment_id,
          segment_name,
        });
      } else {
        history.goBack();
      }
      setHeading("Edit Category");
    }
    dispatch(getSegmentList(segmentList));
  }, []);

  const { name, id, segment_id, segment_name } = categoryData;

  const filterOptions = segmentList.data.map((option) => {
    const { name, _id } = option;
    return { value: name, label: name, id: _id };
  });

  console.log(categoryListBySegmentId.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      const data = {
        name,
        id,
        segment_id,
      };

      if (
        categoryListBySegmentId.data.find(
          (el) => el.name.toLowerCase() === data.name.toLowerCase()
        ) !== undefined
      ) {
        toast.error("Category Name Exits");
        validator.current.showMessages();
        forceUpdate(1);
      } else {
        if (path_type === "add_category") {
          delete data.id;
          return dispatch(addNewCategory(data));
        }
        if (path_type === "edit_category") {
          delete data.segment_id;
          return dispatch(modifyCategory(data));
        }
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

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
                <Label>
                  Segment<span className="astrick"> *</span>
                </Label>
                {path_type === "edit_category" ? (
                  <Input
                    type="text"
                    value={segment_name}
                    name="question"
                    disabled={true}
                  />
                ) : (
                  <Select
                    className="React"
                    classNamePrefix="select"
                    defaultValue={segment_name}
                    onChange={(data) => {
                      if (data != null) {
                        dispatch(getCategoryListBySegmentId(data.id));
                        setCategoryData({
                          ...categoryData,
                          segment_id: data.id,
                        });
                      }
                    }}
                    name="clear"
                    options={filterOptions}
                    isClearable={segment_name && true}
                    required
                  />
                )}
                <span className="input_error mt-1">
                  {validator.current.message(
                    "Segment Name",
                    segment_id,
                    "required"
                  )}
                </span>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label>
                  Name<span className="astrick"> *</span>
                </Label>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleChange}
                />
                <span className="input_error mt-1">
                  {validator.current.message(
                    "name",
                    name,
                    "required|max:50|alpha_space"
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

export default CardComponent(AddFaq);
