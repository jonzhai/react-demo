import React, { Component } from 'react';
import {BrowserRouter, HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css'
// import  'src/style/common.css';
import  HomePage  from "src/pages/home/home.jsx";
import  Invesment  from "src/pages/invesment/invesment.jsx";

const appStyle = {
  backgroundColor: "#fff"
}

class App extends Component {
  render() {
    return (
      <div className="app" style={appStyle}>
          <HashRouter>
            <Switch>
                {/* <Route path="/" exact component={HomePage} /> */}
                <Route path="/" exact render={()=><Redirect to="/home"/>}/>
                <Route path="/home" component={HomePage} />
                <Route path="/invesment" component={Invesment} />
                {/* <Route path="/cars" component={Cars} />
                <Route path="/me" component={Me} /> */}
            </Switch>
          </HashRouter>
      </div>
    );
  }
}

export default App;
