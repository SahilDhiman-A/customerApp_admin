import React, { Component, Fragment } from "react";
import { Card } from "reactstrap";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";

const CardComponent = (WrappedComponent, isCard = true) => {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
    }

    // componentDidUpdate(prevProps) {
    //   //   if (prevProps.isLoading !== this.props.isLoading) {
    //   //     this.setState({ isLoading: this.props.isLoading });
    //   //   }
    // }

    render() {
      const { isLoading } = this.props;
      return (
        <Fragment>
          {isCard ? (
            <Card className="hoc_wrapper">
              {isLoading && (
                <div className="card-loader">
                  <Spinner color="primary" />
                </div>
              )}
              <WrappedComponent {...this.props} />
            </Card>
          ) : (
            <Fragment>
              {isLoading && (
                <div className="card-loader">
                  <Spinner color="primary" />
                </div>
              )}
              <WrappedComponent {...this.props} />
            </Fragment>
          )}
        </Fragment>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isLoading: state.loader.isLoading,
    };
  };
  return connect(mapStateToProps)(HOC);
};

export default CardComponent;
