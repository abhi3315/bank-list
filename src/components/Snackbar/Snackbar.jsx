import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { actions } from "../App.reducer";

import useStyles from "./styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomizedSnackbars({ state, dispatch }) {
  const classes = useStyles();
  const { snackbar, snackbarMessage, snackbarSeverity } = state;

  const handleClose = () => {
    dispatch({
      type: actions.CLOSE_SNACKBAR,
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

CustomizedSnackbars.propTypes = {
  state: PropTypes.shape({}),
  dispatch: PropTypes.func,
};

export default CustomizedSnackbars;
