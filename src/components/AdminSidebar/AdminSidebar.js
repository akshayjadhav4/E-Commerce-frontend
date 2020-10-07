import React from "react";
import { List } from "@material-ui/core";
import SidebarOption from "../SidebarOption/SidebarOption";
function AdminSidebar() {
  return (
    <div className="adminSidebar">
      <List>
        <SidebarOption title="Dashboard" path="/admin/dashboard" />
        <SidebarOption title="Create Product" path="/admin/create/prpduct" />
        <SidebarOption title="Manage Prodcuts" path="/admin/manage/prodcuts" />

        <SidebarOption title="Create Category" path="/admin/create/category" />
        <SidebarOption title="Manage Category" path="/admin/manage/category" />
        <SidebarOption title="Manage Orders" path="/admin/manage/orders" />
      </List>
    </div>
  );
}

export default AdminSidebar;
