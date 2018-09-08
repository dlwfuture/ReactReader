import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux"
import { createBrowserHistory } from 'history'
import '../App.css'

const browserHistory = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div className="app">
        <ConnectedRouter history={browserHistory} >
          <Switch>
            <Route exact path='/' component={category} />
            <Route exact path='/:category' component={category} />
            <Route exact path='/:category/:postId' component={category} />
          </Switch>
        </ConnectedRouter>
      </div>
    )
  }
}

export default App;
