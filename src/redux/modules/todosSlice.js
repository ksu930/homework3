// src/redux/modules/todosSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "DELETE_TODO",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "ADD_TODO",
  async(arg, thunkAPI) => {
    try{
      await axios.post("http://localhost:3001/todos", arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch(e){
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const __updateTodo = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    // 게시글 불러오기
    [__getTodos.pending]: (state, action) => {
        //console.log("pending 상태", action);
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      // console.log("fulfilled 상태", state, action)
    },
    [__getTodos.rejected]: (state, action) => {
        //console.log("reject 상태", action);
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = {message : "데이터를 불러오지 못했습니다."}; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 게시글 삭제
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
        state.isLoading = false;
        const target = state.todos.findIndex(
        (todo) => todo.id === action.payload
        );
        state.todos.splice(target, 1);
        console.log("타켓", target)
    },
    [__deleteTodo.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    //게시글 추가
    [__addTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodo.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
    },
    [__addTodo.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    //게시글 수정
    [__updateTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodo.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        (todo) => todo.id === action.payload
        );
        state.todos.splice(target, 1, action.payload);
    },
    [__updateTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// eslint-disable-next-line
export const {} = todosSlice.actions;
export default todosSlice.reducer;
