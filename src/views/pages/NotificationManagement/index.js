import React from "react";
import CardComponent from "../../../components/hoc/cardComponent";
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
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../../assets/scss/plugins/extensions/react-tables.scss";
import * as Icon from "react-feather";

import DropzoneProgrammatically from "../../../components/@vuexy/dropZone";
import { useState } from "react";
import { history } from "../../../history";
import ModalComponent from "../../../components/@vuexy/Modal";
import StatisticsCards from "../../../components/@vuexy/StatisticsCard";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  getAlltNotifications,
  getAnalyticData,
  getbulkuploadstatus,
} from "../../../redux/actions/admin";
import {
  NOTIFICATIONS_QUERY,
  NOTIFICATION_LIST_PAGE_INDEX,
} from "../../../redux/action_types";
import { getExcelData } from "../../../utility/utils";
const NotificationManagement = (props) => {
  // const [data, setData] = useState([]);

  // const { notificationsQuery } = props;

  const {
    notificationsData,
    notificationsQuery,
    updateQueries,
    getAlltNotifications,
    notificationAnalyticsData,
    pageIndex,
    setPageIndex,
    getbulkuploadstatusAction,
    notificationsStatus,
  } = props;

  useEffect(() => {
    props.getAlltNotifications(notificationsQuery);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [excelData] = useState({
    title: "Spectra",
    description: "abckjhdaksn asdhkadhaskdh asdhajsdhakjsdh kjhasdjkdhasjkdh",
    fileType: "pdf",
    notificationType: "offer related",
  });

  const getColumn = () => {
    let Column = [
      {
        Header: "#",
        Cell: (props) =>
          (pageIndex + 1) * notificationsQuery.limit -
          notificationsQuery.limit +
          1 +
          props.index,
      },
      {
        Header: "Title",
        accessor: "data.order_info.title",
      },
      {
        Header: "Description",
        accessor: "data.order_info.detailed_description",
      },
      {
        Header: "Type",
        accessor: "data.order_info.type",
        Cell: (props) => {
          switch (props.original.data.order_info.type) {
            case "payment":
              return "Payment Related";
            case "offer":
              return "Offer Related";
            case "general":
              return "Generic";
            default:
              return props.original.data.order_info.type;
          }
        },
      },
      {
        Header: "Notification Data",
        // accessor: 'address'
        Cell: (props) => {
          let { user_file } = props.original.data;
          return (
            <a
              className="primary"
              onClick={() => user_file && getExcelData(user_file)}
            >
              Download
            </a>
          );
        },
      },
      // {
      //   Header: "Notification Type",
      //   accessor: "notificationType",
      // },
      {
        Header: "Actions",
        getProps: (state, rowInfo, column) => {
          return {
            style: {
              overflow: "initial",
            },
          };
        },
        Cell: (props) => {
          let data = props.original;
          const { user_file } = data.data || "";
          return (
            <div>
              {/* <a className="primary" >View</a> */}
              <a
                onClick={() => history.push(`/notification/${data.id}`)}
                title="view"
              >
                <Icon.Eye size={20} className="mr-50" />
              </a>
              <a
                onClick={() => {
                  let { refrence_id } = props.original;
                  fetchAnalyticData(refrence_id);
                }}
                title="View Analytic Detail"
              >
                <Icon.BarChart size={20} className="mr-50" />
              </a>
              <a
                onClick={() => {
                  getbulkuploadstatusAction(user_file);
                  history.push("/view_status");
                }}
                title="View Status"
              >
                <Icon.Disc size={20} className="mr-50" />
              </a>
              {/* <UncontrolledButtonDropdown>
                                <DropdownToggle tag="a"
                                    color="flat-light"
                                >
                                    <Icon.ChevronDown size={15} />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a" href="#" >
                                        <Icon.Eye size={14} className="mr-50" />
                                        <span className="align-middle">View</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown> */}
            </div>
          );
        },
      },
    ];

    return Column;
  };

  const { total_user, device_ids, notification_read } =
    notificationAnalyticsData;

  const fetchAnalyticData = (id) => {
    props.getAnalyticData(id);
    setShowModal(true);
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
        <CardTitle>Notification Management</CardTitle>
        <Button
          color="primary"
          onClick={() => {
            history.push("/add_notification");
          }}
        >
          Add New
        </Button>
      </CardHeader>
      <CardBody>
        {/* <DropzoneProgrammatically buttonText='upload' fileType={["image/*", ".pdf", '.docx']} maxSize={2097152} /> */}
        <ReactTable
          data={notificationsData.data}
          columns={getColumn()}
          defaultPageSize={notificationsQuery.limit}
          className="-striped -highlight"
          pageSizeOptions={[10]}
          pages={Math.ceil(
            notificationsData.total_count / notificationsQuery.limit
          )}
          page={pageIndex}
          manual
          onPageChange={(pageIndex) => {
            // pageIndex = props.pageIndex;
            setPageIndex(pageIndex);
            let newQuery = notificationsQuery;
            newQuery["skip"] = pageIndex * newQuery.limit;
            // newQuery["limit"] = 10;
            updateQueries(newQuery);
            // getAudience(newQuery);
            getAlltNotifications(newQuery);
          }}
          onPageSizeChange={(rowPerPage) => {
            let newQuery = notificationsQuery;
            newQuery["limit"] = rowPerPage;
            updateQueries(newQuery);
            getAlltNotifications(newQuery);
          }}
          // minRows={4}
          noDataText="No Notification found"
        />
      </CardBody>
      {
        <ModalComponent
          showModal={showModal}
          heading={"Analytic Data"}
          closeModal={() => setShowModal(false)}
          buttonText={"Close"}
        >
          <Row className="match-height">
            <Col sm="4">
              <StatisticsCards
                icon={<Icon.Users className="primary" size={22} />}
                stat={total_user}
                statTitle="Total Users"
              />
            </Col>
            <Col sm="4">
              <StatisticsCards
                icon={<Icon.Smartphone className="primary" size={22} />}
                stat={device_ids}
                statTitle="Device ids found"
              />
            </Col>
            <Col sm="4">
              <StatisticsCards
                icon={<Icon.ArrowDown className="primary" size={22} />}
                stat={notification_read}
                statTitle="Notification read count"
              />
            </Col>
          </Row>
        </ModalComponent>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notificationsData: state.adminReducer.notificationsData,
    notificationsQuery: state.adminReducer.notificationsQuery,
    notificationAnalyticsData: state.adminReducer.notificationAnalyticsData,
    pageIndex: state.adminReducer.pageIndex,
    notificationsStatus: state.adminReducer.notificationsStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAlltNotifications: (data) => dispatch(getAlltNotifications(data)),
    updateQueries: (query) =>
      dispatch({
        type: NOTIFICATIONS_QUERY,
        payload: query,
      }),
    getAnalyticData: (id) => dispatch(getAnalyticData(id)),
    setPageIndex: (page) =>
      dispatch({
        type: NOTIFICATION_LIST_PAGE_INDEX,
        payload: page,
      }),
    getbulkuploadstatusAction: (user_file) =>
      dispatch(getbulkuploadstatus(user_file)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent(NotificationManagement));
