import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getCommentsThunk = createAsyncThunk(
    "GET_COMMENTS",
    async (payload, thunkAPI) => {
      try {
        const { data } = await axios.get("http://localhost:3001/comments");
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.code);
      }
    }
);

export const __addComment = createAsyncThunk(
    "ADD_COMMENT",
    async (arg, thunkAPI) => {
        try {
        const { data } = await axios.post("http://localhost:3001/comments", arg);
        return thunkAPI.fulfillWithValue(data);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
        }
    }
);  

export const __deleteComment = createAsyncThunk(
    "DELETE_COMMENT",
    async (arg, thunkAPI) => {
      try {
        await axios.delete(`http://localhost:3001/comments/${arg}`);
        return thunkAPI.fulfillWithValue(arg);
      } catch (e) {
        return thunkAPI.rejectWithValue(e.code);
      }
    }
);

export const __updateComment = createAsyncThunk(
    "UPDATE_COMMENT",
    async (arg, thunkAPI) => {
    try {
        await axios.patch(`http://localhost:3001/comments/${arg.id}`, arg);
        return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.code);
    }
    }
);  

const initialState = {
    comments:[],
    isLoading: false,
    error: null,
};

export const commentsSlice = createSlice({
    name : "comments",
    initialState,
    reducers:{},
    extraReducers: {
        // 댓글 전체 조회
        [__getCommentsThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [__getCommentsThunk.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [__getCommentsThunk.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 댓글 추가
        [__addComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__addComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments.push(action.payload);
        },
        [__addComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 댓글 삭제
        [__deleteComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            console.log(action)
            state.isLoading = false;
            const target = state.comments.findIndex(
            (comment) => comment.id === action.payload
            );
            state.comments.splice(target, 1);
        },
        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //댓글 수정
        [__updateComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__updateComment.fulfilled]: (state, action) => {
            const target = state.comments.findIndex(
            (comment) => comment.id === action.payload
            );
            state.comments.splice(target, 1, action.payload);
        },
        [__updateComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});
// eslint-disable-next-line
export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
