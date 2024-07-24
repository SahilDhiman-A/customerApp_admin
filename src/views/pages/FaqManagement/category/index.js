import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { CardBody, CardHeader, CardTitle, Button, Badge } from "reactstrap";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import CardComponent from "../../../../components/hoc/cardComponent";
import ReactTable from "react-table";
import * as Icon from "react-feather";
import "react-table/react-table.css";
import "../../../../assets/scss/plugins/extensions/react-tables.scss";
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss";
import {
  getCategoryList,
  blockUnblockCategory,
} from "../../../../redux/actions/faqManagement";

import { history } from "../../../../history";

const FaqManagementCategory = ({ getCategoryListAction, categoryList }) => {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState({ data: [], count: 0 });

  const limit = 10;

  let event_type = window.location.pathname.split("/")[2];

  useEffect(() => {
    getCategoryListAction();
  }, []);

  useEffect(() => {
    setCategoryData(categoryList);
  }, [categoryList]);

  const getColumns = () => {
    let columns = [
      {
        Header: "#",
        Cell: (props) => 1 + props.index,
      },
      {
        Header: "Category",
        accessor: "name",
      },
      {
        Header: "Segment",
        accessor: "segment_info.name",
      },
      {
        Header: "Actions",
        Cell: ({
          original: { name, _id, is_active, segment_id, segment_info },
        }) => {
          if (name === "Plan Change" || name === "Top up") {
            return "";
          } else
            return (
              <React.Fragment>
                <a
                  title="Edit Category Data"
                  onClick={() =>
                    history.push(`/FaqManagement/${event_type}/edit_category`, {
                      data: { name, _id, segment_id, segment_info },
                    })
                  }
                >
                  <Icon.Edit2 size={20} className="mr-50" />
                </a>
                <a onClick={() => {}} title="Activate/Deactivate">
                  <label className="react-toggle-wrapper d-inline-block align-middle">
                    <Toggle
                      checked={is_active}
                      onChange={() => {
                        dispatch(
                          blockUnblockCategory(
                            {
                              id: _id,
                              is_active: !is_active,
                            },
                            () => getCategoryListAction()
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
      {/* <Card className="mb-0">
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
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <CardHeader>
        <CardTitle>
          Category&nbsp;
          <Badge color="primary">{`count:${categoryData.data.length} `}</Badge>
        </CardTitle>
        <Button
          color="primary"
          onClick={() =>
            history.push(`/FaqManagement/${event_type}/add_category`)
          }
        >
          <Icon.Plus className="mr-2" />
          Add
        </Button>
      </CardHeader>
      <CardBody>
        <ReactTable
          data={categoryData.data}
          columns={getColumns()}
          defaultPageSize={limit}
          className="-striped -highlight"
          pageSizeOptions={[10]}
          // onPageChange={(pageIndex) => {}}
          // onPageSizeChange={(rowPerPage) => {}}
          // minRows={4}
          noDataText="No Category found"
        />
      </CardBody>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categoryList: state.FaqReducer.categoryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryListAction: () => dispatch(getCategoryList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent(FaqManagementCategory));
