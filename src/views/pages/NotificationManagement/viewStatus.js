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

const ViewStatus = () => {
  const [statusInfo, setStatusInfo] = useState("N.A");
  const adminReducer = useSelector((state) => state.adminReducer);
  // const { status } = adminReducer.notificationsStatus;
  console.log(adminReducer.notificationsStatus.status);
  useEffect(() => {
    console.log(statusInfo);
    setStatusInfo(adminReducer.notificationsStatus.status);
  }, [adminReducer.notificationsStatus.status, statusInfo]);
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
        <CardTitle>View Status</CardTitle>
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
            <Col sm={6}>
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="text"
                  // maxLength="20"
                  readOnly
                  value={
                    statusInfo
                      ? statusInfo.charAt(0).toUpperCase() + statusInfo.slice(1)
                      : "N.A"
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default CardComponent(ViewStatus);
