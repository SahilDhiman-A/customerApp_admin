import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { Upload } from "react-feather";
import toast from "toastr";

import * as XLSX from "xlsx";

function ProgrammaticallyDropzone(props) {
  const { maxSize, getFileData, showDropzone, showImgName } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open, rejectedFiles } = useDropzone({
    accept: props.fileType || "image/*",
    minSize: 0,
    maxSize,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      getFileData(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file, i) =>
    file.type.includes("image/") ? (
      <div key={i} className="dz-thumb" key={file.name}>
        <div className="dz-thumb-inner">
          <img
            src={file.preview}
            className="dz-img"
            alt={file.name}
            width="100%"
          />
        </div>
      </div>
    ) : (
      <a key={i}>{file.path}</a>
    )
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    if (rejectedFiles.length) {
      if (rejectedFiles[0].size > maxSize) {
        toast.error(
          `size of file cannot exceeds ${maxSize / (1024 * 1024)} mb`
        );
      } else {
        toast.error("Please select correct file type!");
      }
    }
  }, [rejectedFiles]);

  return (
    <section>
      <div
        {...getRootProps({
          className: `dropzone ${!showDropzone ? "hide" : ""}`,
        })}
        onClick={open}
      >
        <input {...getInputProps()} />
        {files && files.length ? (
          <aside className="thumb-container mt-0 ml-2">{thumbs}</aside>
        ) : (
          <p className="mx-1">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      {
        <div className="d-flex align-items-center">
          {
            <Button.Ripple
              color="primary"
              outline
              className="my-1"
              style={{ overFlow: "inherit" }}
              onClick={open}
            >
              {!props.isuploadIcon ? props.buttonText : <Upload />}
            </Button.Ripple>
          }
          {/* <Upload onClick={open} /> */}
          <aside className="thumb-container mt-0 ml-2">{thumbs}</aside>
        </div>
      }
    </section>
  );
}

class DropzoneProgrammatically extends React.Component {
  getFileData = (data) => {
    this.props.getFile(data);
  };

  render() {
    const {
      buttonText,
      fileType,
      maxSize,
      getFile,
      isuploadIcon,
      showDropzone,
      showImgName,
    } = this.props;
    return (
      <Card>
        <CardBody className="pl-0">
          <ProgrammaticallyDropzone
            isuploadIcon={isuploadIcon}
            buttonText={buttonText}
            getFileData={this.getFileData}
            fileType={fileType}
            maxSize={maxSize}
            getFile={getFile}
            showDropzone={showDropzone}
            showImgName={showImgName}
          />
        </CardBody>
      </Card>
    );
  }
}

export default DropzoneProgrammatically;
