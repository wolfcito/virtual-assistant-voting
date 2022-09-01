import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Home from './views/home'
import Web3 from 'web3'

function App() {
  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      web3.eth.requestAccounts().then(console.log)
    }
  }, [])

  return (
    <>
      <Route path="/" exact component={Home} />
    </>
  )
}

export default App
