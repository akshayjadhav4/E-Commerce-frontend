import React from "react";
import "./BaseLayout.css";
import { Container, Typography } from "@material-ui/core";
import Navigation from "../Navigation/Navigation";
function BaseLayout({ title = "Title", children }) {
  return (
    <>
      <Navigation />
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
    </>
  );
}

export default BaseLayout;
