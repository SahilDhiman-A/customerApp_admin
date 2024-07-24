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
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../history";
import SimpleReactValidator from "simple-react-validator";
import {
  addNewFaq,
  getCategoryList,
  modifyFaq,
} from "../../../../redux/actions/faqManagement";
import Select from "react-select";

import ReactPlayer from "react-player";

const AddFaq = ({ state, segmentName }) => {
  const [faqDetail, setFaqDetails] = useState({
    _id: null,
    question: null,
    answer: null,
    link: null,
    image_url: null,
    video_url: null,
    video: null,
    category_id: null,
    name: null,
    image: null,
  });

  const {
    _id,
    question,
    answer,
    link,
    image_url,
    video_url,
    video,
    category_id,
    name,
    image,
  } = faqDetail;

  let pathname = window.location.pathname;
  let path_type = pathname.split("/")[3];
  const dispatch = useDispatch();

  const [viewOnly, toggleViewType] = useState(false);
  const [heading, setHeading] = useState("ADD NEW FAQ");

  const [imageUpload, setImageUpload] = useState("");
  const [videoUpload, setVideoUpload] = useState("");
  const [buttonType, setButtonType] = useState("image");

  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  const FaqReducer = useSelector((state) => state.FaqReducer);
  const { categoryList } = FaqReducer;

  const details = (state) => {
    if (state && state.data) {
      const { question, answer, link, image_url, video_url, video, _id } =
        state.data.faq_info;
      const { name } = state.data.category_info;
      const category_id = state.data.category_info._id;
      setFaqDetails({
        ...faqDetail,
        _id,
        question,
        answer,
        link,
        image_url,
        video_url,
        video,
        category_id,
        name,
      });
    } else {
      history.goBack();
    }
  };
  useEffect(() => {
    if (path_type === "view_faq") {
      setHeading("View FAQ");
      details(state);
      toggleViewType(true);
    }
    if (path_type === "edit_faq") {
      details(state);
      setHeading("Edit FAQ");
    }
    dispatch(getCategoryList(categoryList));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);
      formData.append("category_id", category_id);
      if (link) {
        formData.append("link", link);
      }

      if (videoUpload) {
        formData.append("video", videoUpload);
      }
      if (imageUpload) {
        formData.append("image", imageUpload);
      }
      if (path_type === "add_faq") {
        return dispatch(addNewFaq(formData));
      }
      if (path_type === "edit_faq") {
        formData.delete("category_id");
        formData.append("id", _id);
        return dispatch(modifyFaq(formData));
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleChange = (e) => [
    setFaqDetails({
      ...faqDetail,
      [e.target.name]: e.target.value,
    }),
  ];
  const filterOptions = categoryList.data.map((option) => {
    return option.segment_info.name === segmentName && option.is_active === true
      ? { value: option.name, label: option.name, id: option._id }
      : "";
  });

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
                  Category<span className="astrick"> *</span>got passoword is
                  not working in admin panel
                </Label>
                {path_type === "edit_faq" || path_type === "view_faq" ? (
                  <Input
                    type="text"
                    value={name}
                    name="question"
                    disabled={true}
                  />
                ) : (
                  <Select
                    className="React"
                    classNamePrefix="select"
                    onChange={(data) => {
                      if (data != null) {
                        setFaqDetails({
                          ...faqDetail,
                          category_id: data.id,
                        });
                      }
                    }}
                    name="clear"
                    options={filterOptions.filter(function (el) {
                      return el;
                    })}
                    isClearable={filterOptions.value && true}
                    isDisabled={viewOnly}
                    required={true}
                  />
                )}
                <span className="input_error mt-1">
                  {validator.current.message(
                    "Category Name",
                    category_id,
                    "required"
                  )}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label>
                  Question<span className="astrick"> *</span>
                </Label>
                <Input
                  type="text"
                  value={question}
                  name="question"
                  onChange={handleChange}
                  disabled={viewOnly}
                />
                <span className="input_error mt-1">
                  {validator.current.message("question", question, "required")}
                </span>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label> Link</Label>
                <Input
                  name="link"
                  type="text"
                  value={link ? link : ""}
                  onChange={handleChange}
                  readOnly={viewOnly}
                />
                <span className="input_error mt-1">
                  {validator.current.message("link", link, "url")}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label>
                  Answer<span className="astrick"> *</span>
                </Label>
                <Input
                  type="textarea"
                  value={answer}
                  name="answer"
                  onChange={handleChange}
                  disabled={viewOnly}
                />
                <span className="input_error mt-1">
                  {validator.current.message(
                    "answer",
                    answer,
                    "required|max:1500"
                  )}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <>
            {image_url && (
              <span>
                <img
                  style={{ width: "320px", height: "200px" }}
                  alt="Image"
                  src={image_url ? image_url : ""}
                  width="100%"
                  height="100%"
                />
              </span>
            )}
            {video_url && (
              <span className="testimonial">
                <ReactPlayer
                  width="320px"
                  height="200px"
                  url={video_url}
                  playing={false}
                  controls={true}
                />
              </span>
            )}
          </>
          {!viewOnly && (
            <Row>
              <Col sm={6}>
                <FormGroup className="">
                  <h5>Upload Media</h5>
                  <div className="d-flex ml-1 mt-2 align-items-center">
                    <Label check style={{ fontWeight: "bold" }}>
                      <Input
                        type="checkbox"
                        name="image"
                        checked={buttonType === "image"}
                        readOnly={viewOnly}
                        onChange={() => {
                          setButtonType("image");
                        }}
                      />{" "}
                      Image
                    </Label>
                    <Label
                      check
                      className="ml-3"
                      style={{ fontWeight: "bold", marginLeft: "2px" }}
                    >
                      <Input
                        type="checkbox"
                        name="video"
                        checked={buttonType === "video"}
                        readOnly={viewOnly}
                        onChange={() => {
                          setButtonType("video");
                        }}
                      />{" "}
                      Video
                    </Label>
                  </div>
                  <div className="mt-1">
                    {buttonType === "image" ? (
                      <Input
                        name="image"
                        type="file"
                        accept=".jpeg,.png,.jpg"
                        value={image}
                        onChange={(e) => setImageUpload(e.target.files[0])}
                        readOnly={viewOnly}
                      />
                    ) : (
                      <Input
                        name="video"
                        type="file"
                        accept=".mp4"
                        value={video}
                        onChange={(e) => setVideoUpload(e.target.files[0])}
                        readOnly={viewOnly}
                        controls
                      />
                    )}
                  </div>
                </FormGroup>
              </Col>
            </Row>
          )}

          {!viewOnly && (
            <Button color="primary" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default AddFaq;
