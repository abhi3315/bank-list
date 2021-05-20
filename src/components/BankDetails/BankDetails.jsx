import { useLocation, useHistory } from "react-router-dom";
import { Paper, Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";

export default function BankDetails() {
  const classes = useStyles();
  const { state } = useLocation();
  const history = useHistory();
  if (!state) {
    history.push("/");
  }
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        {state && (
          <>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>Bank Name: </b>
                {state.bank_name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>IFSC: </b>
                {state.ifsc}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>Branch: </b>
                {state.branch}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>City: </b>
                {state.city}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>District: </b>
                {state.district}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>State: </b>
                {state.state}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <b>Address: </b>
                {state.address}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}
