import React from "react";
import "./SidebarOption.css";
import { ListItem } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function SidebarOption({ title, path }) {
  const history = useHistory();

  return (
    <div className="sidebarOption">
      <ListItem
        key={title}
        button
        divider
        selected={history.location.pathname === { path }}
      >
        <Link
          to={path}
          className={`sidebarOption__link ${
            history.location.pathname === path && "sidebarOption__link--active"
          }`}
        >
          {title}
        </Link>
      </ListItem>
    </div>
  );
}

export default SidebarOption;
