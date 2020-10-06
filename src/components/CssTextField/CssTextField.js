import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#f46d4f",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f46d4f",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c4c4c4",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f46d4f",
      },
    },
  },
})(TextField);
