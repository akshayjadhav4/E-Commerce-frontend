import React from "react";
import BaseLayout from "../Base Layout/BaseLayout";
import "./AdminDashboard.css";
import { List } from "@material-ui/core";
import SidebarOption from "../SidebarOption/SidebarOption";

function AdminDashboard() {
  return (
    <BaseLayout title="Admin Dashboard">
      <div className="adminDashboard">
        <div className="adminDashboard__left">
          <List>
            <SidebarOption title="Dashboard" path="/admin/dashboard" />
            <SidebarOption
              title="Create Product"
              path="/admin/create/prpduct"
            />
            <SidebarOption
              title="Manage Prodcuts"
              path="/admin/manage/prodcuts"
            />

            <SidebarOption
              title="Create Category"
              path="/admin/create/category"
            />
            <SidebarOption
              title="Manage Category"
              path="/admin/manage/category"
            />
            <SidebarOption title="Manage Orders" path="/admin/manage/orders" />
          </List>
        </div>
        <div className="adminDashboard__right">
          <h1>Panal</h1>
        </div>
      </div>
    </BaseLayout>
  );
}

export default AdminDashboard;
