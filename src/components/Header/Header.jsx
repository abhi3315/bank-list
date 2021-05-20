import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import useStyles from "./styles";

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.headContainer}>
        <Toolbar>
          <AccountBalanceIcon />
          <Typography variant="h5" className={classes.head}>
            Bank Branches
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
