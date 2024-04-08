import './mainsStyle.less'
import MusicLibrary from '../../Layout/FootPlay/store/MusicLibrary'
import { changeCurrentSongAction, changePlaySongIndexAction, changePlaySongListAction, changePlaySongRuleAction } from '../../Layout/FootPlay/store/player'
import { connect, useSelector, useDispatch } from 'react-redux'
function Main () {
  var MusicLibrary_new = MusicLibrary
  const dispatch = useDispatch();//调用react-redux的reducers里面方法
  function handleaddBtnClick (type = '', id) {
    if (type == 'once') {//单曲
      var DataSongfindIndex = MusicLibrary.findIndex((item) => item.id === id)
      dispatch(changePlaySongListAction([MusicLibrary[DataSongfindIndex]]))
      dispatch(changeCurrentSongAction(MusicLibrary[DataSongfindIndex]))
      dispatch(changePlaySongIndexAction(DataSongfindIndex))
    }
    if (type == 'all') {//所有歌曲
      dispatch(changePlaySongListAction(MusicLibrary))
      dispatch(changePlaySongIndexAction(0))
      dispatch(changeCurrentSongAction(MusicLibrary[0]))
    }
  }

  function handleScreenBtnClick () {//点击筛选

  }




  return (
    <div className="main">
      <div className='main_left'>
        <div className='floor_hot'>
          <div className='n-rcmd'>
            <div className='v-hd2'>
              <div className="tit f-ff2 f-tdn" id="recommend_title" onClick={() => handleaddBtnClick('all')}>所有音乐</div>
              <div className="tab">
                <a className="s-fc3">许嵩</a>
                <span className="line">|</span>
                <a className="s-fc3">周杰伦</a>
                <span className="line">|</span>
                <a className="s-fc3">Beyond</a>
                <span className="line">|</span>
                <a className="s-fc3">Beyond</a>
                <span className="line">|</span>
                <a className="s-fc3">Beyond</a>
              </div>
              <span className="more"><div className="s-fc3">更多</div><i className="cor s-bg s-bg-6">&nbsp;</i></span>
            </div>
            <ul className="m-cvrlst f-cb">
              {
                MusicLibrary_new.map((item, index) => {
                  return (
                    <li key={'MusicLibrary_new' + index}>
                      <div className="u-cover u-cover-1" onClick={() => handleaddBtnClick('once', item.id)}>
                        <img src={item.al.picUrl}></img>
                        <a title={'[精选]' + item.name} href="/playlist?id=123243715" className="msk" data-res-id="123243715" data-res-type="13" data-res-action="log" data-res-data="recommendclick|0|alg_high_quality|user-playlist"></a>
                        <div className="bottom">
                          <a className="icon-play f-fr" title="播放" href="#" data-res-type="13" data-res-id="123243715" data-res-action="play"></a>
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
              <a href="/discover/artist/signed/" className="more s-fc3">查看全部 &gt;</a>
            </h3>
            <ul className="n-enter f-cb" id="singer-list">
              <li>
                <a href="/user/home?id=29879272" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="http://p1.music.126.net/cSAmmAvsKhm3N-zxWg7QcQ==/109951168490195225.jpg?param=62y62"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">张惠妹aMEI</span></h4>
                    <p className="f-thide s-fc3">台湾歌手张惠妹</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="/user/home?id=650120" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="http://p1.music.126.net/TQZGbxp-xnJla-q7ii9z0A==/1364493985498917.jpg?param=62y62"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">吴莫愁Momo</span></h4>
                    <p className="f-thide s-fc3">《中国好声音》选手吴莫愁</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="/user/home?id=198554" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="http://p1.music.126.net/whG7pbsbd1akKtOE7V3R_Q==/109951168299161319.jpg?param=62y62"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">孙楠</span></h4>
                    <p className="f-thide s-fc3">歌手孙楠 代表作《你快回来》《燃烧》</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="/user/home?id=2000268" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="http://p1.music.126.net/1GIlkxKmvKu66ufU83FyvA==/31885837222663.jpg?param=62y62"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">麦田老狼</span></h4>
                    <p className="f-thide s-fc3">歌手，音乐人。代表作《同桌的你》等。</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="/user/home?id=39002" className="itm f-tdn">
                  <div className="head"><img className="j-img" src="http://p1.music.126.net/MXMZYksJmsa0gcGkuk2mDQ==/109951167712155407.jpg?param=62y62"></img></div>
                  <div className="ifo">
                    <h4><span className="nm f-fs1 f-ib f-thide">陈楚生</span></h4>
                    <p className="f-thide s-fc3">唱作歌手</p>
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