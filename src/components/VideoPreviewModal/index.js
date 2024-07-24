import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import ReactPlayer from "react-player";

class VideoPreviewModal extends React.Component {
  toggleModal = () => {
    this.props.toggle(!this.props.isOpen);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={this.toggleModal}>Please Confirm</ModalHeader>
        <ModalBody>
          <ReactPlayer
            url={this.props.url}
            controls={this.props.controls}
            light={this.props.thumbnail}
            width="100%"
            // playIcon={() => <img src={Download} />}
            // height="100%"
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}

export default VideoPreviewModal;
