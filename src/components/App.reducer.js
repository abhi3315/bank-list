export const actions = {
  OPEN_SNACKBAR: "OPEN_SNACKBAR",
  CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
  FETCHING: "FETCHING",
  FETCHED: "FETCHED",
  FETCH_ERROR: "FETCH_ERROR",
  SET_CITY: "SET_CITY",
  TOGGLE_FAVOURITE: "TOGGLE_FAVOURITE",
  RESET_STATUS: "RESET_STATUS",
};

export const initialState = {
  status: "",
  snackbar: false,
  snackbarMessage: "",
  snackbarSeverity: "",
  data: null,
  errorMessage: "",
  city: "",
  favourites: localStorage.getItem("favourite-banks")?.split(",") || [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: true,
        snackbarSeverity: action.payload.severity || "success",
        snackbarMessage: action.payload.message,
      };
    case actions.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: false,
      };
    case actions.FETCHING:
      return {
        ...state,
        status: "fetching",
      };
    case actions.FETCHED:
      return {
        ...state,
        status: "fetched",
        data: action.payload,
      };
    case actions.FETCH_ERROR:
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
      };
    case actions.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case actions.TOGGLE_FAVOURITE:
      const favourites = state.favourites.includes(action.payload)
        ? state.favourites.filter((each) => each !== action.payload)
        : [...state.favourites, action.payload];
      localStorage.setItem("favourite-banks", favourites);
      return {
        ...state,
        favourites,
      };
    case actions.RESET_STATUS:
      return {
        ...state,
        status: "",
      };
    default:
      return state;
  }
};
