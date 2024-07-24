import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Layout } from "./utility/context/Layout";
import * as serviceWorker from "./serviceWorker";
import { store } from "./redux/storeConfig/store";

import "./index.scss";
import "./@fake-db";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastr from "toastr";
// import "../node_modules/toastr/build/toastr.min.css";
toastr.options = {
  closeButton: true,
  progressBar: true,
  preventDuplicates: true,
  newestOnTop: true,
  extendedTimeOut: 300000000,
};

const LazyApp = lazy(() => import("./App"));

// configureDatabase()
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div></div>}>
      <Layout>
        <ToastContainer />
        <LazyApp />
      </Layout>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
