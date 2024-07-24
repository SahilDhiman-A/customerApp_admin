import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
  FormGroup,
  Card,
  Row,
  Col,
  Button,
  Badge,
} from "reactstrap";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import CardComponent from "../../../../components/hoc/cardComponent";
import ReactTable from "react-table";
import * as Icon from "react-feather";
import "react-table/react-table.css";
import "../../../../assets/scss/plugins/extensions/react-tables.scss";
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss";
import {
  getSegmentList,
  blockUnblockSegment,
} from "../../../../redux/actions/faqManagement";
import { history } from "../../../../history";

const FaqManagementCategory = ({ getSegmentListAction, segmentList }) => {
  const dispatch = useDispatch();

  const [segmentData, setData] = useState({ data: [], count: 0 });

  const limit = 10;

  let event_type = window.location.pathname.split("/")[2];

  useEffect(() => {
    getSegmentListAction();
  }, []);

  useEffect(() => {
    setData(segmentList);
  }, [segmentList]);

  const getColumns = () => {
    let columns = [
      {
        Header: "#",
        Cell: (props) => props.index + 1,
      },
      {
        Header: "Segment",
        accessor: "name",
      },

      {
        Header: "Actions",
        Cell: ({ original: { name, _id, is_active } }) => {
          return (
            <React.Fragment>
              <a
                title="Edit Segment Data"
                onClick={() =>
                  history.push(`/FaqManagement/${event_type}/edit_segment`, {
                    data: { name, _id },
                  })
                }
              >
                <Icon.Edit2 size={20} className="mr-50" />
              </a>
              <a title="Activate/Deactivate">
                <label className="react-toggle-wrapper d-inline-block align-middle">
                  <Toggle
                    checked={is_active}
                    onChange={() => {
                      dispatch(
                        blockUnblockSegment(
                          {
                            id: _id,
                            is_active: !is_active,
                          },
                          () => getSegmentListAction()
                        )
                      );
                    }}
                    name="controlledSwitch"
                  />
                </label>
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
      <Card className="mb-0">
        <CardBody>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label>Search Notification</Label>
                <Input
                  type="text"
                  // onChange={(e) => {
                  //   let newQuery = distributorQuery;
                  //   newQuery["searchKeyword"] = e.target.value;
                  //   updateQueries(newQuery);
                  // }}
                />
                ``
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <CardHeader>
        <CardTitle>
          Segment&nbsp;
          <Badge color="primary">{`count:${segmentData.data.length} `}</Badge>
        </CardTitle>
        <Button
          color="primary"
          onClick={() =>
            history.push(`/FaqManagement/${event_type}/add_segment`)
          }
        >
          Add
        </Button>
      </CardHeader>
      <CardBody>
        <ReactTable
          data={segmentData.data}
          columns={getColumns()}
          defaultPageSize={limit}
          className="-striped -highlight"
          pageSizeOptions={[10]}
          // pages={Math.ceil(count / limit)}x
          // page={pageIndex}
          manual
          // defaultPageSize={limit}
          // onPageChange={(pageIndex) => {
          //   // pageIndex = props.pageIndex;
          //   updatePageIndex(pageIndex);
          //   let newQuery = faqQuery;
          //   newQuery["skip"] = pageIndex * newQuery.limit;
          //   // newQuery["limit"] = 10;
          //   updateQueries(newQuery);
          // }}
          // onPageSizeChange={(rowPerPage) => {
          //   let newQuery = faqQuery;
          //   newQuery["limit"] = rowPerPage;
          //   updateQueries(newQuery);
          // }}
          // minRows={4}
          noDataText="No Segment found"
        />
      </CardBody>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    segmentList: state.FaqReducer.segmentList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSegmentListAction: () => dispatch(getSegmentList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent(FaqManagementCategory));
