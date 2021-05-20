import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  gridContainer: {
    padding: "0 30px",
  },
  paper: {
    margin: 20,
    boxShadow: "0 0 10px grey",
  },
  tableContainer: {
    maxHeight: "65vh",
    overflow: "auto",
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  pointer: {
    cursor: "pointer",
  },
}));
