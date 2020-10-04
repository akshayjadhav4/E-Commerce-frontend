import React from "react";
import "./BaseLayout.css";
import { Container, Typography } from "@material-ui/core";
function BaseLayout({ title = "Title", children = <p>AKSHAY</p> }) {
  return (
    <Container className="baseLayout">
      <div className="baseLayout__container">
        <Typography className="baseLayout__title" align="center" variant="h4">
          {title}
        </Typography>
        <div className="baseLayout__content">{children}</div>
        <footer className="baseLayout__footer">
          <Container>
            <p>CREATED BY AKS USING MERN AND REDUX TOOLKIT</p>
          </Container>
        </footer>
      </div>
    </Container>
  );
}

export default BaseLayout;
