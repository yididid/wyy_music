import './topsStyle.less'
import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'
function Top () {
  // const count = useSelector((userslice) => userslice);从redux里面获得数据
  // console.log("count")
  // console.log(count)
  return (
    <div className='m-top'>
      <div className='wrap f-cb'>
        <NavLink to=""><h1 className='logo'></h1></NavLink>
        <ul className='m-nav'>
          <NavLink to="/find"><li><span>发现音乐</span></li></NavLink>
          <NavLink to="/my"><li><span>我的音乐</span></li></NavLink>
          <NavLink to="/follow"><li><span>关注</span></li></NavLink>
          <NavLink to="/sc"><li><span>商城</span></li></NavLink>
          <NavLink to="/yy"><li><span>音乐人</span></li></NavLink>
          <NavLink to="/yt"><li><span>云推歌</span></li></NavLink>
          <NavLink to="/x"><li><span>下载客户端</span></li></NavLink>
        </ul>
        <div className='s_box'>
          <input type="text" placeholder='音乐/视频/电台/用户' />
        </div>
        <div className='create'>
          创作者中心
        </div>
        <a hidefocus="true" href="#" className="link s-fc3" data-action="login">登录</a>
      </div>
    </div>
  )
}

export default Top