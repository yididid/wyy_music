import { createSlice } from '@reduxjs/toolkit'
import DataSong from './MusicLibrary'

const initialStatedata = {//初始化
  currentSong: DataSong[0],//当前默认播放音乐
  playSongList: [//播放列表
    ...DataSong
  ],
  playSongIndex: 0,//当前播放playSongList的index
  playSongRule: 'loop',//播放规则。默认循环loop  单曲one 随机shuffle
  playSongVolume: 0.2,//播放音量
}

const playerSlice = createSlice({
  name: 'player',
  initialState: initialStatedata,
  reducers: {
    changeCurrentSongAction (state, { payload }) {
      state.currentSong = payload
    },
    changePlaySongIndexAction (state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction (state, { payload }) {
      state.playSongList = payload
    },
    changePlaySongRuleAction (state, { payload }) {
      state.playSongRule = payload
    },
    changePlaySongVolumeAction (state, { payload }) {
      state.playSongVolume = payload
    }
  }
})
export const { changeCurrentSongAction, changePlaySongIndexAction, changePlaySongListAction, changePlaySongRuleAction, changePlaySongVolumeAction } = playerSlice.actions;
export default playerSlice.reducer