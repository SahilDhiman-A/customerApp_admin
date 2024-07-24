import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const NotificationManagement = lazy(() =>
  import("./views/pages/NotificationManagement")
);

const Login = lazy(() => import("./views/pages/authentication/login/Login"));

const Register = lazy(() => import("./views/pages/authentication/register"));

const ForgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);

const ProfileManagement = lazy(() => import("./views/pages/ProfileManagement"));

const AddNotification = lazy(() =>
  import("./views/pages/NotificationManagement/addNotification")
);
const ViewStatus = lazy(() =>
  import("./views/pages/NotificationManagement/viewStatus")
);

const ViewNotification = lazy(() =>
  import("./views/pages/NotificationManagement/viewNotification")
);

const Analytics = lazy(() => import("./views/pages/Analytics"));

const ChangePassword = lazy(() => import("./views/pages/ChangePassword"));

const FaqManagement = lazy(() => import("./views/pages/FaqManagement/home"));

const AddFaqManagement = lazy(() =>
  import("./views/pages/FaqManagement/home/addFaq")
);

const FaqManagementBusiness = lazy(() =>
  import("./views/pages/FaqManagement/business")
);

const AddFaqManagementBusiness = lazy(() =>
  import("./views/pages/FaqManagement/business/addFaq")
);

const FaqManagementCategory = lazy(() =>
  import("./views/pages/FaqManagement/category")
);

const AddFaqManagementCategory = lazy(() =>
  import("./views/pages/FaqManagement/category/addCategory")
);
const FaqManagementSegment = lazy(() =>
  import("./views/pages/FaqManagement/segment")
);

const AddFaqManagementSegment = lazy(() =>
  import("./views/pages/FaqManagement/segment/addSegment")
);

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) =>
  localStorage.getItem("spectraAdmin") ? (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<div></div>}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  ) : (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag = context.fullLayout;
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    {props.location.pathname === "/pages/login" ? (
                      <Login {...props} />
                    ) : props.location.pathname === "/pages/forgotpassword" ? (
                      <ForgotPassword {...props} />
                    ) : props.location.pathname === "/pages/register" ? (
                      <Register {...props} />
                    ) : (
                      <Login {...props} />
                    )}
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={NotificationManagement} />
          <AppRoute exact path="/profile" component={ProfileManagement} />
          <AppRoute
            exact
            path="/add_notification"
            component={AddNotification}
          />
          <AppRoute exact path="/view_status" component={ViewStatus} />
          <AppRoute
            exact
            path="/notification/:id"
            component={ViewNotification}
          />
          <AppRoute exact path="/analytics" component={Analytics} />
          <AppRoute path="/changePassword" component={ChangePassword} />
          <AppRoute path="/pages/login" component={Login} fullLayout />
          <AppRoute path="/pages/register" component={Register} fullLayout />
          <AppRoute
            path="/pages/forgotpassword"
            component={ForgotPassword}
            fullLayout
          />
          <AppRoute
            path="/FaqManagement/home"
            component={FaqManagement}
            exact
          />
          <AppRoute
            path="/FaqManagement/home/add_faq"
            component={AddFaqManagement}
            exact
          />
          <AppRoute
            path="/FaqManagement/home/view_faq"
            component={AddFaqManagement}
            exact
          />
          <AppRoute
            path="/FaqManagement/home/edit_faq"
            component={AddFaqManagement}
            exact
          />
          <AppRoute
            path="/FaqManagement/business"
            component={FaqManagementBusiness}
            exact
          />
          <AppRoute
            path="/FaqManagement/business/add_faq"
            component={AddFaqManagementBusiness}
            exact
          />

          <AppRoute
            path="/FaqManagement/business/view_faq"
            component={AddFaqManagementBusiness}
            exact
          />
          <AppRoute
            path="/FaqManagement/business/edit_faq"
            component={AddFaqManagementBusiness}
            exact
          />
          <AppRoute
            path="/FaqManagement/category"
            component={FaqManagementCategory}
            exact
          />
          <AppRoute
            path="/FaqManagement/category/edit_category"
            component={AddFaqManagementCategory}
            exact
          />
          <AppRoute
            path="/FaqManagement/category/add_category"
            component={AddFaqManagementCategory}
            exact
          />
          <AppRoute
            path="/FaqManagement/segment"
            component={FaqManagementSegment}
            exact
          />
          <AppRoute
            path="/FaqManagement/segment/edit_segment"
            component={AddFaqManagementSegment}
            exact
          />
          <AppRoute
            path="/FaqManagement/segment/add_segment"
            component={AddFaqManagementSegment}
            exact
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
