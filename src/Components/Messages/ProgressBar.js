/** @format */

import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ uploadstate, percentUploaded }) =>
  uploadstate === "uploading" && (
    <Progress
      className="progress__bar"
      percent={percentUploaded}
      progress
      indicating
      size="medium"
      inverted
    />
  );

export default ProgressBar;
