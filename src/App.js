import React, { Component } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import SelectView from "./containers/selectView";

class App extends Component {
  

  render() {
    return (
      <Provider store={store}>
        <div className="App"> 
          <SelectView />
        </div>
      </Provider>
    );
  }
}

export default App;
