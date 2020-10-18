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
import { Alert } from "@material-ui/lab";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FlipMove from "react-flip-move";
import {
  selectCategories,
  getCategories,
  deleteCategory,
  clearCategoriesMessage,
} from "../../features/category/categorySlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import { selectError, clearError } from "../../features/error/errorSlice";
import UpdateCategoryDialog from "../UpdateCategoryDialog/UpdateCategoryDialog";

function ManageCategory() {
  const dispatch = useDispatch();
  const { categories, message } = useSelector(selectCategories);
  const { user, token } = useSelector(selectAuthentication);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearCategoriesMessage());
    dispatch(clearError());
  }, [dispatch]);
  return (
    <div className="manageCategory">
      <Typography variant="h4">Manage Category</Typography>
      <hr />
      <br />
      {/* Alert to show error */}
      {error && <Alert severity="error">{error}</Alert>}
      {/* Alert to show Success */}
      {message && <Alert severity="success">{message}</Alert>}
      <br />
      <div className="manageCategory__list">
        <FlipMove>
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
                    dispatch(deleteCategory(category._id, user._id, token));
                    setTimeout(() => {
                      dispatch(clearCategoriesMessage());
                    }, 3000);
                  }}
                >
                  <DeleteForeverIcon className="manageCategory__deleteIcon" />
                </IconButton>
                <UpdateCategoryDialog category={category} />
              </CardActions>
            </Card>
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default ManageCategory;
