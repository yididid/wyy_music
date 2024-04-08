
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
    audioRef.current.src = currentSong.al.src;
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
    console.log('音频播放完成');
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
            <img src={currentSong.al?.picUrl}></img>
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
            <span className="add f-pr">
              <span className="tip">已添加到播放列表</span>
              <a href="#" title="播放列表" hidefocus="true" data-action="panel" className="icn icn-list s-fc3">{playSongList.length}</a>
            </span>
            <div className="tip tip-1">循环</div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => handleAudioEnded('next')}></audio>
    </div>
  )
}
export default FootPlay