import React, { useRef } from "react";
import CardComponent from "../../../components/hoc/cardComponent";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Button,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { history } from "../../../history";
import DropzoneProgrammatically from "../../../components/@vuexy/dropZone";
import "../../../assets/scss/plugins/extensions/dropzone.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { postNotification } from "../../../redux/actions/admin";
import { connect } from "react-redux";
import sampleFile from "../../../utility/sample.xls";
import SimpleReactValidator from "simple-react-validator";

const AddNotification = (props) => {
  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator());
  const [fileData, setFileData] = useState({
    imageFile: [],
    pdfFile: [],
  });

  const [canIdFile, setCanIdFile] = useState([]);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    shortDescription: "",
  });
  const [fileType, setFileType] = useState({
    isPdf: false,
    isImage: false,
    isVideo: false,
  });
  const [videoLink, setVideoLink] = useState("");

  const [notificationType, setNotificationType] = useState("offer");

  const getFile = (file, name) => {
    file.length && setFileData({ ...fileData, [name]: file });
    // this.setState({ ngoLogo: file[0] })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { imageFile, pdfFile } = fileData;
    const { isPdf, isImage, isVideo } = fileType;
    let data = {
      ...notificationData,
      notificationType,
      canIdFile,
    };

    if (validator.current.allValid()) {
      console.log(isPdf, pdfFile);
      if (isPdf && !pdfFile.length)
        return toast.error("Please upload file for selected type");
      if (isImage && !imageFile.length)
        return toast.error("Please upload file for selected type");
      if (isVideo && !videoLink)
        return toast.error("Please provide video link.");
      if (!canIdFile.length) {
        return toast.error("Please upload file with canIds.");
      }
      let formdata = new FormData();
      formdata.append("title", notificationData.title);
      formdata.append("detailed_description", notificationData.description);
      formdata.append("sort_description", notificationData.shortDescription);
      formdata.append("type", notificationType);
      formdata.append("user_file", canIdFile[0]);
      if (imageFile.length) {
        data.imageFile = imageFile;
        data.isImage = isImage;
        formdata.append("image_url", imageFile[0]);
      }
      if (pdfFile.length) {
        data.pdfFile = pdfFile;
        data.isPdf = isPdf;
        formdata.append("pdf_url", pdfFile[0]);
      }
      if (videoLink) {
        data.videoLink = videoLink;
        data.isVideo = isVideo;
        formdata.append("video_url", videoLink);
      }
      props.postNotification(formdata);
    } else {
      validator.current.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      // forceUpdate();
      forceUpdate(1);
    }

    // let data = {
    //     ...notificationData, ...(videoLink && videoLink), ...(offer && offer), ...(payment && payment),
    //     ...(general && general), ...(isPdf && isPdf), ...(isImage && isImage), ...(isVideo && isVideo), canIdFile: canIdFile, ...(pdfFile && pdfFile),
    //     ...(imageFile && imageFile)
    // }
  };

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
        <CardTitle>Create New Notification</CardTitle>
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
        {/* <DropzoneProgrammatically buttonText='upload' fileType={["image/*", ".pdf", '.docx']} maxSize={2097152} /> */}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={12}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  maxLength="20"
                  value={notificationData.title}
                  onChange={(e) =>
                    setNotificationData({
                      ...notificationData,
                      title: e.target.value,
                    })
                  }
                  onBlur={validator.current.showMessageFor("title")}
                />
                <span className="mt-1 danger d-inline-flex">
                  {validator.current.message(
                    "Title",
                    notificationData.title,
                    "required"
                  )}
                </span>
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  // height={8}
                  rows={5}
                  maxLength="240"
                  name="description"
                  value={notificationData.description}
                  onKeyDown={(e) => {
                    if (
                      e.keyCode == 13 &&
                      e.target.value.split("\n").length >=
                        e.target.getAttribute("rows")
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    //                 const returnChar = /\n/gi
                    // const a = e.target.value.match(returnChar)
                    // const b = title.match(returnChar)
                    // if (value.length > 80 || (a && b && a.length > 1 && b.length === 1)) return
                    // dispatch(setState('title', value))
                    setNotificationData({
                      ...notificationData,
                      description: e.target.value,
                    });
                  }}
                  onBlur={validator.current.showMessageFor("description")}
                />
                <span className="mt-1 danger d-inline-flex">
                  {validator.current.message(
                    "Description",
                    notificationData.description,
                    "required"
                  )}
                </span>
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Label>Short Description</Label>
                <Input
                  type="text"
                  name="shortDescription"
                  maxLength="80"
                  value={notificationData.shortDescription}
                  onChange={(e) =>
                    setNotificationData({
                      ...notificationData,
                      shortDescription: e.target.value,
                    })
                  }
                  onBlur={validator.current.showMessageFor("shortDescription")}
                />
                <span className="mt-1 danger d-inline-flex">
                  {validator.current.message(
                    "Short Description",
                    notificationData.shortDescription,
                    "required"
                  )}
                </span>
              </FormGroup>

              <hr />
            </Col>

            <Col sm={12}>
              <FormGroup className="">
                <h5>Select File Type</h5>
                <div className="d-flex ml-1 mt-2 align-items-center">
                  <Label check style={{ fontWeight: "bold" }}>
                    <Input
                      type="checkbox"
                      name="pdf"
                      checked={fileType.isPdf}
                      onChange={() => {
                        setFileType((state) => ({
                          isPdf: !state.isPdf,
                          isVideo: false,
                          isImage: false,
                        }));
                        setFileData({
                          imageFile: [],
                          pdfFile: [],
                          canIdFile: [],
                        });
                      }}
                    />{" "}
                    PDF
                  </Label>
                  <Label check className="ml-3" style={{ fontWeight: "bold" }}>
                    <Input
                      type="checkbox"
                      name="image"
                      checked={fileType.isImage}
                      onChange={() => {
                        setFileType((state) => ({
                          isPdf: false,
                          isVideo: false,
                          isImage: !state.isImage,
                        }));
                        setFileData({
                          imageFile: [],
                          pdfFile: [],
                          canIdFile: [],
                        });
                      }}
                    />{" "}
                    IMAGE
                  </Label>
                  <Label check className="ml-3" style={{ fontWeight: "bold" }}>
                    <Input
                      type="checkbox"
                      name="video"
                      checked={fileType.isVideo}
                      onChange={() => {
                        setFileType((state) => ({
                          isPdf: false,
                          isVideo: !state.isVideo,
                          isImage: false,
                        }));
                        setFileData({
                          imageFile: [],
                          pdfFile: [],
                          canIdFile: [],
                        });
                      }}
                    />{" "}
                    VIDEO
                  </Label>
                </div>
                {(fileType.isPdf || fileType.isImage) && (
                  <DropzoneProgrammatically
                    isuploadIcon={true}
                    buttonText={
                      fileType.isImage ? "upload image" : "upload pdf"
                    }
                    fileType={[fileType.isImage ? "image/*" : ".pdf"]}
                    maxSize={2097152}
                    getFile={(file) =>
                      getFile(
                        file,
                        fileType.isImage
                          ? "imageFile"
                          : fileType.isPdf
                          ? "pdfFile"
                          : ""
                      )
                    }
                  />
                )}
                {fileType.isVideo && (
                  <div className="mt-2">
                    <Label>Video Link</Label>
                    <Input
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                  </div>
                )}
              </FormGroup>
              <hr />
            </Col>
            <Col sm={12}>
              <FormGroup className="">
                <h5>
                  Upload Users canId Data (xls, xlsx){" "}
                  <span
                    style={{ fontSize: "12px", textDecoration: "underline" }}
                  >
                    <a
                      download="sample.xls"
                      href={sampleFile}
                      className="primary"
                    >
                      Sample file
                    </a>
                  </span>
                </h5>

                {
                  <DropzoneProgrammatically
                    isuploadIcon={true}
                    buttonText="upload file"
                    fileType={[".xls", ".xlsx"]}
                    maxSize={2097152}
                    required
                    getFile={(file) => setCanIdFile(file)}
                  />
                }
              </FormGroup>
              <hr />
            </Col>
            <Col sm={12}>
              <FormGroup className="">
                <h5>Select Notification Type</h5>
                <div className="d-flex ml-1 mt-2 align-items-center">
                  <Label check style={{ fontWeight: "bold" }}>
                    <Input
                      type="radio"
                      name="notificationType"
                      required
                      checked={notificationType === "offer"}
                      onChange={(e) => {
                        setNotificationType("offer");
                      }}
                    />{" "}
                    Offer Related
                  </Label>
                  <Label check className="ml-3" style={{ fontWeight: "bold" }}>
                    <Input
                      type="radio"
                      name="notificationType"
                      checked={notificationType === "payment"}
                      onChange={(e) => {
                        setNotificationType("payment");
                      }}
                    />{" "}
                    Payment Related
                  </Label>
                  <Label check className="ml-3" style={{ fontWeight: "bold" }}>
                    <Input
                      type="radio"
                      name="notificationType"
                      checked={notificationType === "general"}
                      onChange={(e) => {
                        setNotificationType("general");
                      }}
                    />{" "}
                    Generic
                  </Label>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" color="primary" className="mt-2">
            Submit
          </Button>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postNotification: (formdata) => dispatch(postNotification(formdata)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CardComponent(AddNotification));
