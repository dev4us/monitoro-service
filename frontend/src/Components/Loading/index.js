import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingPage = () => (
  <div className="loaderFullWidth">
    <SyncLoader sizeUnit={"px"} size={15} color={"#73c6f3"} />
  </div>
);

export default LoadingPage;
