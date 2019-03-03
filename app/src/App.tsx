import React, { ReactNode } from "react";
import {
  HashRouter as Router,
  Route
  // Route,
  // Switch,
  // Redirect
} from "react-router-dom";
import { Provider, observer } from "mobx-react";

import { Login } from "./views/login";
import { Home } from "./views/home";
import * as stores from "./stores";
import * as services from "./service-entrances";
import "./App.css";
import { computed, observable, runInAction } from "mobx";
import { Loading } from "./components/loading";

@observer
class App extends React.Component {
  @observable
  private loading = true;

  @computed
  private get isLogin(): boolean {
    let { userService } = services;

    return userService.isLogin;
  }

  componentDidMount(): void {
    setTimeout(() => runInAction(() => (this.loading = false)), 800);
  }

  public render() {
    return (
      <Provider {...stores} {...services}>
        <Router>
          <div className="App">
            {this.renderLoading()}
            {this.isLogin ? <Route path="/" component={Home} /> : <Login />}
          </div>
        </Router>
      </Provider>
    );
  }

  private renderLoading(): ReactNode {
    return this.loading ? <Loading percent={69} /> : undefined;
  }
}

export default App;
