import {Button} from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { Login } from './views/login';

const AppTitle = styled.h1 ``

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const NoMatch = () => <>
  <AppTitle>Welcome to Uicab Mail</AppTitle>
  <Button type="primary"> React/ TypeScript / Mobx / Antd / StyledComponents</Button>
</>

export default App;
