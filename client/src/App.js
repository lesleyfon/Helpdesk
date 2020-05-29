import React from "react";

//Router
import { Route } from "react-router-dom";
//Components
import Registration from "./Page/Registration/Registration";
// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Help Desk</header>
      <Route
        path="/register"
        exact
        component={(props) => <Registration {...props} />}
      />
    </div>
  );
}

export default App;
