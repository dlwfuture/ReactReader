import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'
import Category from './category'

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Category} />
            <Route exact path='/:categoryName' component={Category} />
            <Route exact path='/:categoryName/:postId' component={Category} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
