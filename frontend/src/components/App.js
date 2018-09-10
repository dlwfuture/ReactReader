import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'
import 'font-awesome/css/font-awesome.min.css'
import Categories from './categories'

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Categories} />
            <Route exact path='/:categoryName' component={Categories} />
            <Route exact path='/:categoryName/:postId' component={Categories} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
