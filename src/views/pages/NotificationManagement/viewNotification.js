import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Download } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import CardComponent from "../../../components/hoc/cardComponent";
import { history } from "../../../history";
import { viewNotification } from "../../../redux/actions/admin";
import { getExcelData } from "../../../utility/utils";

const ViewNotification = () => {
  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState({
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
  });
  const selector = useSelector(
    (state) => state.adminReducer.notificationDataById
  );

  const notificationId = useParams().id;

  useEffect(() => {
    dispatch(viewNotification(notificationId));
  }, []);

  useEffect(() => {
    setNotificationData(selector);
  }, [selector]);

  const { data, pdf_url, image_url, video_url, user_file } = notificationData;
  const { order_info } = data;
  const { title, sort_description, detailed_description, type } = order_info;
  return (
    <React.Fragment>
      <CardHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <CardTitle>View Notification</CardTitle>
        <Button
          color="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm={12}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  // maxLength="20"
                  readOnly
                  defaultValue={title}
                />
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  // maxLength="20"
                  readOnly
                  defaultValue={detailed_description}
                />
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Label>Short Description</Label>
                <Input
                  type="text"
                  // maxLength="20"
                  readOnly
                  defaultValue={sort_description}
                />
              </FormGroup>
            </Col>
            {pdf_url && (
              <Col sm={12}>
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>Pdf url :</Label>
                  <a href={pdf_url} target="_blank" className="primary ml-1">
                    {pdf_url}
                  </a>
                </FormGroup>
              </Col>
            )}
            {image_url && (
              <Col sm={12}>
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>Image url :</Label>
                  <a href={image_url} target="_blank" className="primary ml-1">
                    {image_url}
                  </a>
                </FormGroup>
              </Col>
            )}
            {video_url && (
              <Col sm={12}>
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>Video url :</Label>
                  <a href={video_url} target="_blank" className="primary ml-1">
                    {video_url}
                  </a>
                </FormGroup>
              </Col>
            )}
            <Col sm={12}>
              <FormGroup>
                <Button.Ripple
                  color="primary"
                  outline
                  className="my-1 d-flex align-items-center"
                  onClick={() => getExcelData(user_file)}
                >
                  <Download />
                  <span className="ml-1">Download Canid File</span>
                </Button.Ripple>
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Label>Notification Type</Label>
                <Input type="text" readOnly defaultValue={type} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default CardComponent(ViewNotification);
