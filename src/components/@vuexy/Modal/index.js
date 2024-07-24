import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalComponent extends React.Component {
  state = {
    modal: false,
  };

  toggleModal = () => {
    // this.setState((prevState) => ({
    //   modal: !prevState.modal,
    // }));
    this.props.closeModal && this.props.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        {/* <Button color="success" outline onClick={this.toggleModal}>
          Launch Modal
        </Button> */}
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>
            {this.props.heading}
          </ModalHeader>
          <ModalBody>
            {this.props.children}
            {/* <FormGroup>
              <Label for="email">Email:</Label>
              <Input type="email" id="email" placeholder="Email Address" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input type="password" id="password" placeholder="Password" />
            </FormGroup> */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              {this.props.buttonText}
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalComponent;
