//1.导入createSlice //7.导入createAsyncThun创建异步方法
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//8.导入mock的network
import { userInfoFetchData } from "./mockUserInfoFetchData";

//2.创建reducer
const userInfoSlice = createSlice({
  //3.此name会被拼接到Action的type中的第二个位置
  name: "userInfo",
  //4.初始化数据
  initialState: {
    userInfo: {},
    count: 0,
    status: "pending",
  },
 //5.声明Action方法
  reducers: {
    addCount: (state, actions) => {
      state.count += 1;
      console.log("count+1:",state.count);
    },
    subCount: (state) => {
      state.count -= 1;
      console.log("count-1:",state.count);
    },
  },
  //10.声明刚才创建的异步methods
  extraReducers: (build) => {
    build.addCase(fetchData.pending, (state) => {
      state.status = "pending";
      console.log(state.status);
    });
    build.addCase(fetchData.fulfilled, (state, actions) => {
      state.status = "fulfilled";
      state.userInfo = actions.payload;
      console.log('network数据如下：',actions.payload);
    });
  },
});
//9.createAsyncThunk创建异步Thunk
export const fetchData = createAsyncThunk("userInfo", async () => {
  return await userInfoFetchData();
});

//6.导出Store对应的Action方法（在组件中调用）和reducer（在store中注册）
export const { addCount, subCount } = userInfoSlice.actions;
export default userInfoSlice.reducer;

