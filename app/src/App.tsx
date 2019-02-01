import { Button } from "antd";
import * as React from "react";
import styled from "styled-components";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, observer } from "mobx-react";

import { Login } from "./views/login";
import { Home } from "./views/home";
import * as stores from "./stores";
import "./App.css";

const AppTitle = styled.h1``;

@observer
class App extends React.Component {
  public render() {
    console.log(1);

    return (
      <Provider {...stores}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/home" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const NoMatch = () => (
  <>
    <AppTitle>Welcome to Uicab Mail</AppTitle>
    <Button type="primary">
      React/ TypeScript / Mobx / Antd / StyledComponents
    </Button>
  </>
);

export default App;
