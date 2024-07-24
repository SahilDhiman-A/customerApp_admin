import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody, CardHeader, CardTitle, Button, Badge } from "reactstrap";
import Toggle from "react-toggle";
import "react-toggle/style.css";

import ReactTable from "react-table";
import * as Icon from "react-feather";
import "react-table/react-table.css";
import "../../../../assets/scss/plugins/extensions/react-tables.scss";
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss";
import {
  getFaqListBySegment,
  blockUnblockFaq,
  bulkUploadFaq,
  getCategoryList,
} from "../../../../redux/actions/faqManagement";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import DropzoneProgrammatically from "../../../../components/@vuexy/dropZone";
import { history } from "../../../../history";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const Faq = ({ getFaqListAction, faqData, getFaqByIdAction, segmentName }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [isOpen, toggleModal] = useState(false);
  const [faqDataList, setFaqDataList] = useState({ data: [] });

  const FaqReducer = useSelector((state) => state.FaqReducer);
  const { categoryList } = FaqReducer;
  const category = categoryList.data.map((option) => option.name);
  // const [items, setItems] = useState([]);
  // const [valid, setValid] = useState(false);

  let limit = 10;
  let event_type = window.location.pathname.split("/")[2];

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    let valid = { val: false, length: 0 };

    return promise.then((d) => {
      if (d.length !== 0) {
        for (let i = 0; i < d.length; i++) {
          if (category.filter((el) => d[i].category_name === el).length === 0) {
            toggleModal(false);
            valid.val = true;
            break;
          }
        }
      }
      valid.length = d.length;
      return valid;
    });
  };

  useEffect(() => {
    getFaqListAction(faqData, segmentName);
    dispatch(getCategoryList(categoryList));
  }, []);

  useEffect(() => {
    setFaqDataList(faqData);
  }, [faqData]);

  useEffect(() => {
    dispatch(getFaqListBySegment(faqData, segmentName));
  }, [event_type, dispatch]);

  const getColumns = () => {
    let columns = [
      {
        Header: "#",
        Cell: (props) => 1 + props.index,
      },
      {
        Header: "Question",
        accessor: "faq_info.question",
      },
      {
        Header: "Category",
        accessor: "category_info.name",
      },
      {
        Header: "Thumbs Up/Down",
        Cell: ({ original: { faq_info } }) => {
          const { thumb_up_count, thumb_down_count } = faq_info || 0;
          return thumb_up_count + " / " + thumb_down_count;
        },
      },

      {
        Header: "View Count",
        accessor: "faq_info.view_count",
      },

      {
        Header: "Actions",
        Cell: ({ original: { _id, category_info, faq_info } }) => {
          const { is_active } = faq_info || [];
          const faqId = faq_info._id || "";

          return (
            <React.Fragment>
              <a
                title="View Faq Data"
                onClick={() =>
                  history.push(`/FaqManagement/${event_type}/view_faq`, {
                    data: { category_info, faq_info },
                  })
                }
              >
                <Icon.Eye size={20} className="mr-50" />
              </a>
              <a
                title="Edit Faq Data"
                onClick={() =>
                  history.push(`/FaqManagement/${event_type}/edit_faq`, {
                    data: { _id, category_info, faq_info },
                  })
                }
              >
                <Icon.Edit2 size={20} className="mr-50" />
              </a>
              <a title="Activate/Deactive">
                <label className="react-toggle-wrapper d-inline-block align-middle">
                  <Toggle
                    checked={is_active}
                    onChange={() => {
                      dispatch(
                        blockUnblockFaq(
                          {
                            id: faqId,
                            is_active: !is_active,
                          },
                          () => getFaqListAction(faqData, segmentName)
                        )
                      );
                    }}
                    name="controlledSwitch"
                  />
                </label>
              </a>
              <a
                title="Download"
                onClick={() => {
                  getFaqByIdAction(faq_info._id);
                }}
              >
                <Icon.Download size={20} className="mr-50" />
              </a>
            </React.Fragment>
          );
        },
      },
    ];
    return columns;
  };

  return (
    <React.Fragment>
      <CardHeader>
        <CardTitle>
          FAQ Management&nbsp;
          <Badge color="primary">{`count:${faqDataList.data.length} `}</Badge>
        </CardTitle>
        <div>
          <Button.Ripple
            color="primary"
            className="mr-1"
            outline
            onClick={() => toggleModal(true)}
          >
            <Icon.Paperclip className="mr-1" />
            Upload
          </Button.Ripple>
          <Button
            color="primary"
            onClick={() => history.push(`/FaqManagement/${event_type}/add_faq`)}
          >
            <Icon.Plus className="mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <ReactTable
          data={faqDataList.data}
          columns={getColumns()}
          defaultPageSize={limit}
          className="-striped -highlight"
          pageSizeOptions={[10]}
          noDataText="No Faq found"
        />
        <ConfirmationModal
          isOpen={isOpen}
          toggle={(bool) => toggleModal(bool)}
          confirm={async () => {
            const formData = new FormData();
            formData.append("file", file);
            if (!file) {
              return toast.error("Please upload file");
            }

            let valid = { val: false, length: 0 };
            await readExcel(file).then((d) => {
              valid.length = d.length;
              if (d.val) valid.val = true;
            });

            if (valid.val) return toast.error("Some of Category is Not found");
            if (valid.length === 0)
              return toast.error("Uploaded file is is-empty");

            dispatch(
              bulkUploadFaq(formData, segmentName, () => {
                toggleModal(false);
                setFile("");
              })
            );
          }}
          modalTitle="Upload Faq File"
        >
          <DropzoneProgrammatically
            isuploadIcon={true}
            showDropzone={true}
            buttonText={"Upload Distributors file"}
            fileType={[".xls", ".xlsx"]}
            maxSize={2097152}
            getFile={(file) => {
              setFile(file[0]);
            }}
            disabled={true}
          />
        </ConfirmationModal>
      </CardBody>
    </React.Fragment>
  );
};
export default Faq;
