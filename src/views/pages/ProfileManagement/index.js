import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  CustomInput,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import CardComponent from "../../../components/hoc/cardComponent";
import { updateProfile } from "../../../redux/actions/admin";

class ProfileManagement extends Component {
  state = {
    name: "",
    email: "",
    mobile: "",
    user_type: "",
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    if (this.props.adminData.user_info) {
      this.setState({
        name: this.props.adminData.user_info.personal_info.user_name,
        email: this.props.adminData.user_info.email,
        mobile: this.props.adminData.user_info.mobile,
        user_type: this.props.adminData.user_info.user_type,
      });
    }
  }

  handleChange = (e) => {
    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      this.setState({ [e.target.id]: e.target.value });
    } else {
      e.preventDefault();
      return;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user_name: this.state.name,
      // mobile: this.state.mobile,
    };
    // let formdata = new FormData();
    // formdata.append("user_name", data.user_name);
    // formdata.append("mobile", data.mobile);
    this.props.updateProfile(data);
  };

  render() {
    const { name, email, mobile, user_type } = this.state;
    return (
      <React.Fragment>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardBody>
          <Form className="mt-2" onSubmit={this.handleSubmit}>
            <Row>
              {/* <Col sm="12">
                                    <FormGroup>
                                        <Label for="userName">Username</Label>
                                        <Input id="userName" defaultValue="johny_01" />
                                    </FormGroup>
                                </Col> */}
              <Col sm="12">
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    // defaultValue={JSON.parse(localStorage.getItem('user')).name}
                    onChange={this.handleChange}
                    value={name}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    disabled={true}
                    // defaultValue={JSON.parse(localStorage.getItem('user')).email}
                    defaultValue={email}
                  />
                </FormGroup>
              </Col>
              {/* <Col sm="12">
                                <FormGroup>
                                    <Label for="Mobile">Mobile</Label>
                                    <Input id="mobile" value={mobile} onChange={this.handleChange} minLength={10} maxLength={12} required />
                                </FormGroup>
                            </Col> */}
              <Col sm="12">
                <FormGroup>
                  <Label for="Role">Role</Label>
                  <Input id="Role" disabled={true} defaultValue={user_type} />
                </FormGroup>
              </Col>
              <Col className="d-flex justify-content-start flex-wrap" sm="12">
                <Button.Ripple className="mr-50" color="primary">
                  Save Changes
                </Button.Ripple>
                {/* <Button.Ripple type="submit" color="danger">
                                    Cancel
                                    </Button.Ripple> */}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminData: state.auth.login.adminData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(updateProfile(data)),
  };
};

export default CardComponent(
  connect(mapStateToProps, mapDispatchToProps)(ProfileManagement)
);
