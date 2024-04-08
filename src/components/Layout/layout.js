
import { Outlet } from "react-router-dom"

import Foot from './Foot'
import PlayerBar from './FootPlay/PlayerBar/PlayerBar'
import Top from './Top'
function Layout () {
  return (
    <div>
      <Top></Top>
      <Outlet>
      </Outlet>
      <Foot></Foot>
      <PlayerBar></PlayerBar>
    </div>
  )
}
export default Layout