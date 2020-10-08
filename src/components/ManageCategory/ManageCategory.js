import React, { useEffect } from "react";
import "./ManageCategory.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import {
  selectCategories,
  getCategories,
  deleteCategory,
} from "../../features/category/categorySlice";

function ManageCategory() {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="manageCategory">
      <Typography variant="h4">Manage Category</Typography>
      <hr />
      <br />
      <div className="manageCategory__list">
        {categories.map((category) => (
          <Card
            key={category._id}
            variant="outlined"
            className="manageCategory__card"
          >
            <CardContent className="manageCategory__cardContent">
              <p>{category.name}</p>
            </CardContent>
            <CardActions className="manageCategory__cardActions">
              <IconButton
                onClick={() => {
                  dispatch(deleteCategory(category._id));
                }}
              >
                <DeleteForeverIcon className="manageCategory__deleteIcon" />
              </IconButton>
              <IconButton>
                <EditIcon className="manageCategory__editIcon" />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ManageCategory;
