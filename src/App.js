import React from 'react'
import { Route } from 'react-router-dom'
import MainLayout from './layouts/main'

import Home from './views/home'
import About from './views/about'

function App() {
  return (
    <MainLayout>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
    </MainLayout>
  )
}

export default App
