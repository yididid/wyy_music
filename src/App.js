import React from "react"
import router from './reouter/index';
import { useRoutes } from "react-router-dom"
import './App.less'

function App () {
  const outlet = useRoutes(router)
  return (
    <>
      {outlet}
    </>
  )

}

export default App
