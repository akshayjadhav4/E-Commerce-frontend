import React from "react";
import BaseLayout from "../Base Layout/BaseLayout";
import "./AdminDashboard.css";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
function AdminDashboard() {
  const history = useHistory();

  // getting authentication state from store
  const { user } = useSelector(selectAuthentication);
  return (
    <BaseLayout title="Admin Dashboard">
      <div className="adminDashboard">
        <div className="adminDashboard__left">
          <AdminSidebar />
        </div>
        <div className="adminDashboard__right">
          {history.location.pathname === "/admin/dashboard" && (
            <div className="admindashboard__info">
              <Typography variant="h4">Welcome Admin</Typography>
              <hr />
              <Typography>
                Name : {user.firstName} {user.lastName}
              </Typography>
              <Typography>Email : {user.email}</Typography>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

export default AdminDashboard;
