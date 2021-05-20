import React from "react";
import { Switch, Route } from "react-router-dom";
import Snackbar from "./Snackbar";
import BankList from "./BankList";
import Header from "./Header";
import BankDetails from "./BankDetails";
import { initialState, reducer } from "./App.reducer";
import useFetch from "../utils/hooks";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cache = React.useRef({});
  useFetch(state.city, dispatch, cache);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <BankList state={state} dispatch={dispatch} />
          <Snackbar state={state} dispatch={dispatch} />
        </Route>
        <Route exact path="/banks/:ifsc">
          <BankDetails />
        </Route>
        <Route exact path="*">
          <code className="not-found">404 | Page not found</code>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
