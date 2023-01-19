import React, { useEffect, createContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Formbuilder from "./Formbuilder";
import Editor from "./Editor";
import { pageLoad } from "./redux/actions/pageAction";

import Signup from "./SkeletonComponents/Signup/Signup";
import Login from "./SkeletonComponents/Login/Login";
import Profile from "./SkeletonComponents/Profile/Profile";
import Home from "./SkeletonComponents/Home/Home";
import Navbar from "./SkeletonComponents/Navbar/Navbar";

import {initialState, reducer } from "../src/reducer/UseReducer";

export const UserContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [state, sdispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    pageLoad()(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Switch>
      <Route exact path="/editor/:pageId" component={Editor}></Route>
      <UserContext.Provider value = {{state, sdispatch}}>
      <Navbar />
          <Route exact path="/formbuilder" component={Formbuilder}></Route>
          <Route exact path="/editor/:pageId" component={Editor}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/" component={Home}></Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
