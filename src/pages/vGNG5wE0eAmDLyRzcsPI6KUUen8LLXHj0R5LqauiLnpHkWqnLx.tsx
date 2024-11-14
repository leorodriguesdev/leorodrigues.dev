import React from "react";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

const SwaggerPage = () => {
  return <SwaggerUI url="/api/docs" />;
};

export default SwaggerPage;
