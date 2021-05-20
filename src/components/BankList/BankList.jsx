import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import {
  Grid,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  Checkbox,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import cities from "../../utils/cities";
import { actions } from "../App.reducer";
import headCells from "./const";
import debounce from "../../utils/debounce";

import useStyles from "./styles";

function BankList({ state, dispatch }) {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data } = state;
  React.useEffect(() => {
    setFilter("");
    setRows(data);
  }, [data]);
  const handleAutocompleteChange = (newValue) => {
    dispatch({
      type: actions.SET_CITY,
      payload: newValue?.name?.toUpperCase() || "",
    });
  };
  const getFilteredData = (value) => {
    const filteredData = data?.filter((each) => {
      return (
        each.bank_name.toLowerCase().includes(value.toLowerCase()) ||
        each.branch.toLowerCase().includes(value.toLowerCase()) ||
        each.ifsc.toLowerCase().includes(value.toLowerCase()) ||
        each.address.toLowerCase().includes(value.toLowerCase()) ||
        each.district.toLowerCase().includes(value.toLowerCase()) ||
        each.state.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilter(value);
    setRows(filteredData);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const toggleFavourites = (ifsc) => {
    dispatch({
      type: actions.TOGGLE_FAVOURITE,
      payload: ifsc,
    });
  };
  const handleRowClick = (row) => {
    history.push({ pathname: `/banks/${row.ifsc}`, state: { ...row } });
  };
  return (
    <>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={5}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => handleAutocompleteChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                value={filter}
                label="Select City"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            fullWidth
            label="Filter Banks"
            variant="outlined"
            onChange={(e) => debounce(getFilteredData(e.target.value))}
          />
        </Grid>
      </Grid>
      {!state.city && (
        <Grid container justify="center" align="center">
          <Typography variant="caption" className={classes.text}>
            Select a city
          </Typography>
        </Grid>
      )}
      {state.status === "fetching" && (
        <div className={classes.loading}>
          <CircularProgress size={40} />
        </div>
      )}
      {state.status === "fetched" && !rows?.length && state.city && (
        <Grid container justify="center" align="center">
          <Typography variant="caption" className={classes.text}>
            No bank found!
          </Typography>
        </Grid>
      )}
      {!!rows?.length && state.city && state.status !== "fetching" && (
        <Paper className={classes.paper}>
          <TableContainer className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell, index) => (
                    <TableCell key={index}>{headCell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((each) => (
                    <TableRow
                      hover
                      className={classes.pointer}
                      key={each.ifsc}
                      onClick={() => handleRowClick(each)}
                    >
                      <TableCell>
                        <Checkbox
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavourites(each.ifsc);
                          }}
                          checked={state.favourites?.includes(each.ifsc)}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                        />
                      </TableCell>
                      <TableCell>{each.bank_name}</TableCell>
                      <TableCell>{each.branch}</TableCell>
                      <TableCell>{each.ifsc}</TableCell>
                      <TableCell>{each.city}</TableCell>
                      <TableCell>{each.address}</TableCell>
                      <TableCell>{each.district}</TableCell>
                      <TableCell>{each.state}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}

BankList.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

export default BankList;
