import React from "react";
import {
  Button,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Formik, Field, useFormik } from "formik";
import * as Yup from "yup";
import CardComponent from "../../../components/hoc/cardComponent";
import { connect } from "react-redux";
import { resetPassword } from "../../../redux/actions/admin";
// const formSchema = Yup.object().shape({
//   oldpass: Yup.string().required("Required"),
//   newpass: Yup.string().required("Required"),
//   confirmpass: Yup.string()
//     .oneOf([Yup.ref("newpass"), null], "Passwords must match")
//     .required("Required"),
// });
const ChangePassword = (props) => {
  const formik = useFormik({
    initialValues: {
      oldpass: "",
      newpass: "",
      confirmpass: "",
    },
    validationSchema: Yup.object().shape({
      oldpass: Yup.string().required("Required"),
      newpass: Yup.string().required("Required"),
      confirmpass: Yup.string()
        .oneOf([Yup.ref("newpass"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      let data = {
        old_password: values.oldpass,
        new_password: values.newpass,
      };
      props.resetPassword(data);
    },
  });
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
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className="pt-1">
          <Col sm="12">
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Input
                  name="oldpass"
                  id="oldpass"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.oldpass}
                  //   className={`form-control ${
                  //     errors.oldpass && touched.oldpass && "is-invalid"
                  //   }`}
                  placeholder="Old Password"
                />
                {/* {errors.oldpass && touched.oldpass ? (
                      <div className="text-danger">{errors.oldpass}</div>
                    ) : null} */}
                {formik.touched.oldpass && formik.errors.oldpass ? (
                  <div
                    className={` ${
                      formik.touched.oldpass &&
                      formik.errors.oldpass &&
                      "is-invalid primary mt-1"
                    }`}
                  >
                    {formik.errors.oldpass}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Input
                  name="newpass"
                  type="password"
                  id="newpass"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newpass}
                  placeholder="New Password"
                />
                {formik.touched.newpass && formik.errors.newpass ? (
                  <div
                    className={`
                    "is-invalid primary mt-1"
                  }`}
                  >
                    {formik.errors.newpass}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Input
                  name="confirmpass"
                  id="confirmpass"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpass}
                />
                {formik.touched.confirmpass && formik.errors.confirmpass ? (
                  <div
                    className={`
                    "is-invalid primary mt-1"
                  }`}
                  >
                    {formik.errors.confirmpass}
                  </div>
                ) : null}
              </FormGroup>
              <div className="d-flex justify-content-start flex-wrap">
                <Button.Ripple
                  className="mr-1 mb-1"
                  color="primary"
                  type="submit"
                >
                  Save Changes
                </Button.Ripple>
                {/* <Button.Ripple
                  className="mb-1"
                  color="danger"
                  type="reset"
                  outline
                >
                  Cancel
                </Button.Ripple> */}
              </div>
            </Form>
          </Col>
        </Row>
      </CardBody>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (data) => dispatch(resetPassword(data)),
  };
};

export default connect(null, mapDispatchToProps)(CardComponent(ChangePassword));
