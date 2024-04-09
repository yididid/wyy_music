
import './PlayerBar.less'
import { formatTime } from '../../../../utils/format'
import { useEffect, useRef, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'
import { Slider } from 'antd';
import DataSong from '../store/MusicLibrary'
import { changeCurrentSongAction, changePlaySongIndexAction, changePlaySongListAction, changePlaySongRuleAction, changePlaySongVolumeAction } from '../store/player'
function FootPlay () {
  const [isPlaying, setIsPlaying] = useState(false);//是否播放状态
  const [progress, setProgress] = useState(0);//播放进度条
  const [duration, setDuration] = useState(0);//音乐总时长
  const [currentTime, setCurrentTime] = useState(0);//播放时间
  const [upvolume, setupVolume] = useState(false);//是否设置音乐
  const [songlistshow, setSongListShow] = useState(false);//在播列表

  const dispatch = useDispatch();//调用react-redux的reducers里面方法
  const audioRef = useRef(null);

  const { currentSong, playSongList, playSongIndex, playSongRule, playSongVolume } = useSelector((state) => ({/**从redux仓库里面获得数据 */
    currentSong: state.player.currentSong,
    playSongList: state.player.playSongList,
    playSongIndex: state.player.playSongIndex,
    playSongRule: state.player.playSongRule,
    playSongVolume: state.player.playSongVolume,
  }));

  useEffect(() => { //代替原有的类组件声明周期
    // audioRef.current.src = getSongPlayUrl(currentSong.id)
    audioRef.current.src = currentSong?.al?.src;
    audioRef.current.volume = playSongVolume;
    audioRef.current?.play().then(() => {
      setIsPlaying(true)
      console.log("播放歌曲成功！")
    }).catch((err) => {
      setIsPlaying(false)
      console.log("audioRef.current.src")
      console.log(audioRef.current.src)
      console.log('歌曲播放失败：', err)
    })
    setDuration(currentSong.dt)//将总时间赋值
  }, [currentSong])

  function handlePlayBtnClick () {//点击暂停|播放
    if (!audioRef.current.src) {
      audioRef.current.src = currentSong?.al?.src || '';
      setDuration(currentSong?.dt || 0)//将总时间赋值
    }
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play().catch(() => setIsPlaying(false))
    setIsPlaying(!isPlaying)
  }


  function handleTimeUpdate () {//进度条
    const currentTime = audioRef.current.currentTime * 1000
    const progress = ((currentTime) / duration) * 100
    // console.log(currentTime)
    setProgress(progress)
    setCurrentTime(currentTime)
  }

  function handleSliderChanged (value) {//点击进度条加载
    const currentTime = (value / 100) * duration
    audioRef.current.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
  }

  function handleAudioEnded (value) {//音乐播放完 上一首/下一首
    if (playSongRule == 'loop') {//循环播放
      var nextPlaySongIndex = playSongIndex;
      if (value == 'next') {
        nextPlaySongIndex >= playSongList.length - 1 ? nextPlaySongIndex = 0 : nextPlaySongIndex++
      } else {
        nextPlaySongIndex <= 0 ? nextPlaySongIndex = playSongList.length - 1 : nextPlaySongIndex--
      }
      var id = playSongList[nextPlaySongIndex].id
      playSongNow(id)
    }
    if (playSongRule == 'one') {//单曲播放
      playSongNow(currentSong.id)
    }
    if (playSongRule == 'shuffle') {//随机播放
      console.log("随机播放")
      var id = currentSong.id;
      if (playSongList.length != 1) {
        var randomNumIndex = Math.floor(Math.random() * (playSongList.length - 1))
        while (playSongIndex == randomNumIndex) {
          randomNumIndex = Math.floor(Math.random() * (playSongList.length - 1))
        }
        id = playSongList[randomNumIndex].id
      }
      playSongNow(id)
    }
  }

  function handleRuleBtnClick () {//播放规则
    if (playSongRule == 'loop') {
      dispatch(changePlaySongRuleAction('one'))
    }
    if (playSongRule == 'one') {
      dispatch(changePlaySongRuleAction('shuffle'))
    }
    if (playSongRule == 'shuffle') {
      dispatch(changePlaySongRuleAction('loop'))
    }
  }
  function playSongNow (id, type = '') {//切歌 type默认不传，添加列表，传‘clear’默认清空列表只有一首歌
    var playSongListfindIndex = playSongList.findIndex((item) => item.id === id)
    var DataSongfindIndex = DataSong.findIndex((item) => item.id === id)
    if (playSongListfindIndex === -1) {
      if (DataSongfindIndex !== -1) {
        var newplaySongList = playSongList;
        if (type == 'clear') {
          newplaySongList = [];
        }
        const newPlaySongList = newplaySongList.push(DataSong[DataSongfindIndex])
        dispatch(changePlaySongListAction(newPlaySongList))
        playSongListfindIndex = newPlaySongList.length
      }
    }
    var newCurrentSong = playSongList[playSongListfindIndex]
    dispatch(changeCurrentSongAction(newCurrentSong))
    dispatch(changePlaySongIndexAction(playSongListfindIndex))

    setDuration(newCurrentSong?.dt || 0)//将总时间赋值
    audioRef.current.src = newCurrentSong?.al?.src || '';
    isPlaying ? audioRef.current?.play().catch(() => setIsPlaying(false)) : audioRef.current?.pause()
  }

  function SliderVolumeChanged (value) {//音量拖动设置大小
    dispatch(changePlaySongVolumeAction(value / 100))
    audioRef.current.volume = value / 100;
  }

  function handleVolumeBtnClick () {//是否设置音乐
    setupVolume(!upvolume)
  }
  function handleSongListShowBtnClick () {//是否展开在播列表
    setSongListShow(!songlistshow)
  }

  function handleManagePlaySongList (e) {//管理播放列表，增删
    const type = e.target.getAttribute('data-type')
    if (type == 'deleteAll') {//清空
      dispatch(changePlaySongListAction([]))
      dispatch(changeCurrentSongAction({}))
      dispatch(changePlaySongIndexAction(-1))
    }

    if (type == 'deleteOne') {//删除一首歌
      const id = e.target.getAttribute('data-id')

      var playSongListdata = [...playSongList];

      const playSongListfindIndex = playSongListdata.findIndex((item) => item.id == id)
      playSongListdata.splice(playSongListfindIndex, 1);
      if (playSongIndex == playSongListfindIndex) {
        handleAudioEnded('next')
      }
      dispatch(changePlaySongListAction(playSongListdata))
    }
    return false
  }

  function nostop (e) {//防止冒泡
    e.stopPropagation();
  }

  return (
    <div className="g-btmbar">
      <div className="m-playbar m-playbar-lock" id="auto-id-MlgyMrpoPkCPw8Sy">
        <div className="updn">
          <div className="left f-fl"><a href="#" className="btn" hidefocus="true" data-action="lock"></a></div>
          <div className="right f-fl"></div>
        </div>
        <div className="bg"></div>
        <div className="hand" title="展开播放条"></div>
        <div className="wrap" id="g_player">
          <div className="btns">
            <a href="#" hidefocus="true" data-action="prev" className="prv" title="上一首(ctrl+←)" onClick={() => handleAudioEnded('Previous')}>上一首</a>
            <a href="#" hidefocus="true" data-action={isPlaying ? 'play' : 'pause'} data-dda={isPlaying} className={isPlaying ? 'ply j-flag pas' : 'ply j-flag'} title="播放/暂停(p)" onClick={handlePlayBtnClick}>播放/暂停</a>
            <a href="#" hidefocus="true" data-action="next" className="nxt" title="下一首(ctrl+→)" onClick={() => handleAudioEnded('next')}>下一首</a>
          </div>
          <div className="head j-flag">
            {currentSong.al ?
              <img src={currentSong.al?.picUrl}></img>
              : null
            }
            <a href="#" hidefocus="true" className="mask"></a>
          </div>
          <div className="play">
            <div className="j-flag words">
              <a hidefocus="true" href="/song?id=2007844922" className="f-thide name fc1 f-fl" title={currentSong?.al?.name}>{currentSong?.al?.name}</a>
              <span className="by f-thide f-fl">
                <span title={currentSong?.name}>
                  <a className="" href="/artist?id=37671780" hidefocus="true">{currentSong?.name}</a>
                </span>
              </span>
            </div>
            <div className="m-pbar" data-action="noop">
              <Slider
                value={progress}
                step={0.5}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanged}>
              </Slider>
              <span className="j-flag time"><em>{formatTime(currentTime)}</em> / {formatTime(duration)}</span>
            </div>
          </div>
          <div className="oper f-fl"><a href="#" hidefocus="true" className="icn icn-pip" title="画中画歌词">画中画歌词</a>
            <a href="#" hidefocus="true" data-action="like" className="icn icn-add j-flag" title="收藏">收藏</a>
            <a href="#" hidefocus="true" data-action="share" className="icn icn-share" title="分享">分享</a>
          </div>
          <div className="ctrl f-fl f-pr j-flag">
            {upvolume ?
              <div className="m-vol" id="auto-id-T14tuTJDkfHf9gKf">
                <div className="barbg"></div>
                <Slider vertical defaultValue={playSongVolume * 100}
                  styles={{
                    track: {
                      background: '#C10D0C',
                    },
                  }}
                  tooltip={{ formatter: null }}
                  onChange={SliderVolumeChanged}
                ></Slider>
              </div>
              : null
            }
            <a href="#" hidefocus="true" data-action="volume" className={playSongVolume === 0 ? 'icn icn-volno' : 'icn icn-vol'} onClick={handleVolumeBtnClick}></a>
            <a href="#" hidefocus="true" data-action="mode" className={"icn icn-" + playSongRule} title="循环" onClick={handleRuleBtnClick}></a>
            <span className="add f-pr" onClick={handleSongListShowBtnClick}>
              <span className="tip">已添加到播放列表</span>
              <a href="#" title="播放列表" hidefocus="true" data-action="panel" className="icn icn-list s-fc3">{playSongList.length}</a>
            </span>
            <div className="tip tip-1">循环</div>
          </div>
        </div>
        {songlistshow ?
          <div className="list" id="g_playlist">
            <div className="listhd">
              <div className="listhdc">
                <h4>播放列表(<span className="j-flag">{playSongList.length}</span>)</h4>
                <a href="#" className="addall" data-action="likeall">
                  <span className="ico ico-add"></span>
                  收藏全部
                </a>
                <span className="line"></span>
                <a href="#" className="clear" data-action="clear" data-type='deleteAll' onClick={handleManagePlaySongList}>
                  <span className="ico icn-del"></span>清除</a>
                <p className="lytit f-ff0 f-thide j-flag">被选择的那个</p>
                <span className="close" data-action="close">关闭</span>
              </div>
            </div>
            <div className="listbd">

              <div className="msk"></div>
              <div className="listbdc j-flag" id="auto-id-2zi49UtL3kXXoECv">
                <ul className="f-cb">
                  {
                    playSongList.map((item, index) => {
                      return (
                        <li className="z-sel" key={'playSongList' + index} onClick={() => playSongNow(item.id)}>
                          <div className="col col-1">
                            {playSongIndex == index ?
                              <div className="playicn"></div>
                              : null
                            }

                          </div><div className="col col-2">{item.al.name}</div>
                          <div className="col col-3" onClick={nostop}>
                            <div className="icns">
                              <i className="ico icn-del" title="删除" data-id={item.id} data-type="deleteOne" onClick={handleManagePlaySongList}>删除</i>
                              <i className="ico ico-dl" title="下载" data-id={item.id} data-action="download">下载</i>
                              <i className="ico ico-share" title="分享" data-id={item.id} data-action="share">分享</i>
                              <i className="j-t ico ico-add" title="收藏" data-id={item.id} data-action="like">收藏</i>
                            </div>
                          </div>
                          <div className="col col-4">
                            <span title="苏梦迪">
                              <a className="" href="#" hidefocus="true">{item.name}</a>
                            </span>
                          </div>
                          <div className="col col-5">03:56</div>
                          <div className="col col-6">
                            <a href="#" className="ico ico-src" title="来自歌单" data-action="link">
                              来源</a>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="bline j-flag" id="auto-id-wDk9zdTNDIL2vPNc"><span className="scrol" hidefocus="true"></span></div>
              <div className="ask j-flag" id="auto-id-cKPqkmVST1hTWiAk">
                <a className="ico ico-ask"></a>
              </div>
              <div className="msk2"></div>
              <div className="listlyric j-flag" id="auto-id-OUrsNApnQQ3XoT78"> <p className="j-flag" data-time="0">作词 : 区恒</p><p className="j-flag" data-time="1">作曲 : 邢树杰</p><p className="j-flag" data-time="16.77">从陌生到手牵着</p><p className="j-flag" data-time="23.37">我误认找到对的那个</p><p className="j-flag" data-time="28.62">可后来爱过也难避免错过</p><p className="j-flag" data-time="35.04">相遇难得却无可奈何</p><p className="j-flag" data-time="42.78">我不是无可替代的</p><p className="j-flag" data-time="49.2">只是你寂寞时的选择</p><p className="j-flag" data-time="54.54">经不起波折你提前下车</p><p className="j-flag" data-time="61.05">得到只是一句我们不适合</p></div>
              <div className="bline bline-1 j-flag" id="auto-id-koz6Ne58PM28BQJA">
                <span className="scrol scrol-1 j-flag" hidefocus="true" id="auto-id-qAFPorBllinc2DVw"></span>
              </div>
            </div>
          </div>
          : null
        }

      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => handleAudioEnded('next')}></audio>
    </div>
  )
}
export default FootPlay