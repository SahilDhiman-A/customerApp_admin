import React from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import googleSvg from "../../../../assets/img/svg/google.svg";

import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { connect } from "react-redux";
import { loginAction } from "../../../../redux/actions/auth";
import SpinnerComponent from "../../../../components/@vuexy/spinner/Fallback-spinner";

class Login extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
  };

  componentDidMount() {
    if (localStorage.getItem("spectraAdmin")) history.push("/");
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    let data = {
      email,
      password,
      user_type: "superadmin",
    };

    this.props.loginAction(data);
  };

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="4"
          // xl="7"
          // lg="10"
          // md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            {/* <Row className="m-0">

              <Col sm={6} className="p-0"> */}
            <Card className="rounded-0 mb-0 px-2">
              <CardBody>
                <h4>Login</h4>
                <p>Welcome back, please login to your account.</p>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                      autoComplete="off"
                    />
                    <div className="form-control-position">
                      <Mail size={15} />
                    </div>
                    <Label>Email</Label>
                  </FormGroup>
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      required
                      autoComplete="off"
                    />
                    <div className="form-control-position">
                      <Lock size={15} />
                    </div>
                    <Label>Password</Label>
                  </FormGroup>
                  <FormGroup className="d-flex justify-content-between align-items-center">
                    {/* <Checkbox
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label="Remember me"
                        /> */}
                    {/* <a className="float-right" onClick={() => { history.push('/pages/forgotpassword') }}>
                          Forgot Password?
                            </a> */}
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    {/* <Button.Ripple color="primary" outline onClick={() => { history.push('/pages/register') }}>
                          Register
                            </Button.Ripple> */}
                    <Button.Ripple color="primary" type="submit">
                      Login
                    </Button.Ripple>
                  </div>
                </Form>
              </CardBody>
              {/* <div className="auth-footer">
                    <div className="divider">
                      <div className="divider-text">OR</div>
                    </div>
                    <div className="footer-btn">
                      <Button.Ripple className="btn-facebook" color="">
                        <Facebook size={14} />
                      </Button.Ripple>
                      <Button.Ripple className="btn-twitter" color="">
                        <Twitter size={14} stroke="white" />
                      </Button.Ripple>
                      <Button.Ripple className="btn-google" color="">
                        <img src={googleSvg} alt="google" height="15" width="15" />
                      </Button.Ripple>
                      <Button.Ripple className="btn-github" color="">
                        <GitHub size={14} stroke="white" />
                      </Button.Ripple>
                    </div>
                  </div> */}
              {this.props.isLoading && (
                <div className="card-loader">
                  <Spinner color="primary" />
                </div>
              )}
            </Card>
            {/* </Col>
            </Row> */}
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToprops = (state) => {
  return {
    isLoading: state.loader.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) => dispatch(loginAction(data)),
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(Login);
