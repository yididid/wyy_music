import './mainsStyle.less'
import MusicLibrary from '../../Layout/FootPlay/store/MusicLibrary'
import { message } from 'antd';
import React, { useState } from 'react';
import { changeCurrentSongAction, changePlaySongIndexAction, changePlaySongListAction, changePlaySongRuleAction } from '../../Layout/FootPlay/store/player'
import { connect, useSelector, useDispatch } from 'react-redux'
function Main () {

  const { playSongList } = useSelector((state) => ({/**从redux仓库里面获得数据 */
    playSongList: state.player.playSongList,
  }));

  const [filter, setFilter] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();//调用react-redux的reducers里面方法

  function handleaddBtnClick (e) {
    const type = e.target.getAttribute('data-type')
    const id = parseInt(e.target.getAttribute('data-id'))
    var DataSongfindIndex = 0;
    var newPlaySongList = {};
    var CurrentSong = {};
    var PlaySongIndex = 0;
    if (type == 'once') {//单曲
      DataSongfindIndex = MusicLibrary.findIndex((item) => item.id === id)
      newPlaySongList = [MusicLibrary[DataSongfindIndex]]
      CurrentSong = MusicLibrary[DataSongfindIndex]
      PlaySongIndex = DataSongfindIndex
      messageApi.open({
        type: 'success',
        content: '正在播放！',
        duration: 2,
      });
    }
    if (type == 'all') {//所有歌曲
      newPlaySongList = MusicLibrary
      PlaySongIndex = 0;
      CurrentSong = MusicLibrary[0]
    }
    if (type == 'filter') {//过滤
      PlaySongIndex = 0;
      newPlaySongList = filteredData
      CurrentSong = filteredData[0]
      messageApi.open({
        type: 'success',
        content: '播放成功！',
        duration: 2,
      });
    }
    if (type == 'add') {//添加
      if (playSongList.findIndex((item) => item.id === id) == -1) {
        DataSongfindIndex = MusicLibrary.findIndex((item) => item.id === id)
        newPlaySongList = [...playSongList].concat(MusicLibrary[DataSongfindIndex])
      } else {
        return false
      }
      messageApi.open({
        type: 'success',
        content: '已添加进列表！',
        duration: 2,
      });
    }
    dispatch(changePlaySongListAction(newPlaySongList))
    if (type != 'add') {
      dispatch(changeCurrentSongAction(CurrentSong))
      dispatch(changePlaySongIndexAction(PlaySongIndex))
    }
  }

  function handleScreenBtnClick (keyword) {//点击筛选
    setFilter(keyword);
  }

  function nostop (e) {//防止冒泡
    e.stopPropagation();
  }

  const filteredData = MusicLibrary.filter((item) => item.name.includes(filter));

  return (
    <div className="main">
      {contextHolder}
      <div className='main_left'>
        <div className='floor_hot'>
          <div className='n-rcmd'>
            <div className='v-hd2'>
              <div className="tit f-ff2 f-tdn" id="recommend_title" onClick={() => handleScreenBtnClick('')}>所有音乐</div>
              <div className="tab">
                <a className="s-fc3" onClick={() => handleScreenBtnClick('许嵩')}>许嵩</a>
                <span className="line">|</span>
                <a className="s-fc3" onClick={() => handleScreenBtnClick('周杰伦')}>周杰伦</a>
                <span className="line">|</span>
                <a className="s-fc3" onClick={() => handleScreenBtnClick('Beyond')}>Beyond</a>
                <span className="line">|</span>
                <a className="s-fc3" onClick={() => handleScreenBtnClick('Beyond')}>Beyond</a>
                <span className="line">|</span>
                <a className="s-fc3" onClick={() => handleScreenBtnClick('Beyond')}>Beyond</a>
              </div>
              <span className="more">
                <div className="s-fc3" data-type="filter" onClick={handleaddBtnClick}>播放</div>
                <i className="cor s-bg s-bg-6">&nbsp;</i>
              </span>
            </div>
            <ul className="m-cvrlst f-cb">
              {
                filteredData.map((item, index) => {
                  return (
                    <li key={'MusicLibrary_new' + index}>
                      <div className="u-cover u-cover-1">
                        <img src={item.al.picUrl} data-type="add" data-id={item.id} onClick={handleaddBtnClick}></img>
                        <a title={'[精选]' + item.name} href="/playlist?id=123243715" className="msk" data-res-id="123243715" data-res-type="13" data-res-action="log" data-res-data="recommendclick|0|alg_high_quality|user-playlist"></a>
                        <div className="bottom" onClick={nostop}>
                          <a className="icon-play f-fr" title="播放" href="#" data-res-type="13" data-res-id="123243715" data-res-action="play" data-type="once" data-id={item.id} onClick={handleaddBtnClick}></a>
                          <span className="icon-headset"></span>
                          <span className="nb">2592万</span>
                        </div>
                      </div>
                      <p className="dec">
                        <a title={'[精选]' + item.name} className="tit s-fc0" href="/playlist?id=123243715" data-res-id="123243715" data-res-type="13" data-res-action="log" data-res-data="recommendclick|0|alg_high_quality|user-playlist">
                          [精选] {item.name}-{item.al.name}
                        </a>
                      </p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <div className='main_right'>
        <div className="g-sd1">
          <div className="n-user-profile"> <div className="n-myinfo n-myinfo-1 s-bg s-bg-1"><p className="note s-fc3">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p><a id="index-enter-default" href="#" className="btn s-bg s-bg-2 f-tdn">用户登录</a></div></div>
          <div className="n-singer">
            <h3 className="v-hd3">
              <span className="f-fl">入驻歌手</span>
              <a href="#" className="more s-fc3">查看全部 &gt;</a>
            </h3>
            <ul className="n-enter f-cb" id="singer-list">
              <li onClick={() => handleScreenBtnClick('许嵩')}>
                <a href="#" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="https://img1.kuwo.cn/star/starheads/120/54/7/152082279.jpg"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">许嵩</span></h4>
                    <p className="f-thide s-fc3">90年代情歌</p>
                  </div>
                </a>
              </li>
              <li onClick={() => handleScreenBtnClick('周杰伦')}>
                <a href="#" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="https://img4.kuwo.cn/star/albumcover/700/72/44/3648126291.jpg"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">周杰伦</span></h4>
                    <p className="f-thide s-fc3">华语顶梁支柱</p>
                  </div>
                </a>
              </li>
              <li onClick={() => handleScreenBtnClick('Beyond')}>
                <a href="#" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="https://img3.kuwo.cn/star/starheads/120/47/68/3668920800.jpg"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">Beyond</span></h4>
                    <p className="f-thide s-fc3">摇滚乐队之父，获得无数奖</p>
                  </div>
                </a>
              </li>
            </ul>
            <div><a target="_blank" href="/recruit" hidefocus="true" className="u-btn2 u-btn2-1"><i>申请成为网易音乐人</i></a></div>
          </div>
          <div className="n-dj n-dj-1">
            <h3 className="v-hd3">热门主播</h3>
            <ul className="n-hotdj f-cb" id="hotdj-list">
              <li>
                <a href="/user/home?id=278438485" className="cver"><img className="j-img" src="http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40" data-src="http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40"></img></a>
                <div className="info">
                  <p><a href="/user/home?id=278438485" className="nm-icn f-thide s-fc0">陈立</a> </p>
                  <p className="f-thide s-fc3">心理学家、美食家陈立教授</p>
                </div>
              </li>
              <li>
                <a href="/user/home?id=559210341" className="cver"><img className="j-img" src="http://p1.music.126.net/GgXkjCzeH4rqPCsrkBV1kg==/109951164843970584.jpg?param=40y40" data-src="http://p1.music.126.net/GgXkjCzeH4rqPCsrkBV1kg==/109951164843970584.jpg?param=40y40"></img></a>
                <div className="info">
                  <p><a href="/user/home?id=559210341" className="nm-icn f-thide s-fc0">刘维-Julius</a> </p>
                  <p className="f-thide s-fc3">歌手、播客节目《维维道来》主理人</p>
                </div>
              </li>
              <li>
                <a href="/user/home?id=259292486" className="cver"><img className="j-img" src="http://p1.music.126.net/bYcck7EzVurzLWC_QY3Epw==/109951169215290550.jpg?param=40y40" data-src="http://p1.music.126.net/bYcck7EzVurzLWC_QY3Epw==/109951169215290550.jpg?param=40y40"></img></a>
                <div className="info">
                  <p><a href="/user/home?id=259292486" className="nm-icn f-thide s-fc0">莫非定律乐团</a> </p>
                  <p className="f-thide s-fc3">男女双人全创作独立乐团</p>
                </div>
              </li>
              <li>
                <a href="/user/home?id=1450418799" className="cver"><img className="j-img" src="http://p1.music.126.net/NHjNoFpLDEZ-3OR9h35z1w==/109951165825466770.jpg?param=40y40" data-src="http://p1.music.126.net/NHjNoFpLDEZ-3OR9h35z1w==/109951165825466770.jpg?param=40y40"></img></a>
                <div className="info">
                  <p><a href="/user/home?id=1450418799" className="nm-icn f-thide s-fc0">碎嘴许美达</a> </p>
                  <p className="f-thide s-fc3">脱口秀网络红人</p>
                </div>
              </li>
              <li>
                <a href="/user/home?id=2688170" className="cver"><img className="j-img" src="http://p1.music.126.net/mMZvNruOjEa4XNL6-lWjNg==/109951168919647064.jpg?param=40y40" data-src="http://p1.music.126.net/mMZvNruOjEa4XNL6-lWjNg==/109951168919647064.jpg?param=40y40"></img></a>
                <div className="info">
                  <p><a href="/user/home?id=2688170" className="nm-icn f-thide s-fc0">银临Rachel</a> </p>
                  <p className="f-thide s-fc3"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Main