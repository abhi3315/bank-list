import { useEffect } from "react";
import { actions } from "../components/App.reducer";

const baseUrl = "https://vast-shore-74260.herokuapp.com/banks";

const useFetch = (query, dispatch, cache) => {
  useEffect(() => {
    let cancelRequest = false;
    if (!query) return;

    const fetchData = async () => {
      dispatch({ type: actions.FETCHING });
      if (cache.current[query]) {
        const data = cache.current[query];
        dispatch({ type: actions.FETCHED, payload: data });
      } else {
        try {
          const response = await fetch(`${baseUrl}?city=${query}`);
          const data = await response.json();
          cache.current[query] = data;
          if (cancelRequest) return;
          dispatch({ type: actions.FETCHED, payload: data });
          dispatch({
            type: actions.OPEN_SNACKBAR,
            payload: {
              message: "Bank details fetched successfully",
              severity: "success",
            },
          });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: actions.FETCH_ERROR, payload: error.message });
          dispatch({
            type: actions.OPEN_SNACKBAR,
            payload: {
              message: "Unable to fetch bank details",
              severity: "error",
            },
          });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [cache, dispatch, query]);
};

export default useFetch;
