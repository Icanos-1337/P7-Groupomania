import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const createPost = createAsyncThunk("post/createPost", async({ updatedPostData, navigate, toast }, {rejectWithValue}) => {
    try {
        const response = await api.createPost(updatedPostData);
        toast.success("Poste ajoutée avec succès !");
        navigate("/");
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getPosts = createAsyncThunk("post/getPosts", async (_, {rejectWithValue}) => {
    try {
        const response = await api.getPosts();
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getPost = createAsyncThunk("post/getPost", async (id, {rejectWithValue}) => {
    try {
        const response = await api.getPost(id);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getPostsByUser = createAsyncThunk("post/getPostsByUser", async (userId, {rejectWithValue}) => {
    try {
        const response = await api.getPostsByUser(userId);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const deletePost = createAsyncThunk("post/deletePost", async ({id, toast}, {rejectWithValue}) => {
    try {
        const response = await api.deletePost(id);
        toast.success("Poste supprimé avec succès")
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updatePost = createAsyncThunk("post/updatePost", async ({id, updatedPostData, toast, navigate}, {rejectWithValue}) => {
    try {
        const response = await api.updatePost(updatedPostData, id);
        toast.success("Poste modifié avec succès");
        navigate("/");
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const likePost = createAsyncThunk("post/likePost", async ({_id}, {rejectWithValue}) => {
    try {
        const response = await api.likePost(_id);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});




const postSlice = createSlice({
    name: "post",
    initialState: {
        post: {},
        posts: [],
        userPosts: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = [action.payload];
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPostsByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getPostsByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userPosts = action.payload;
        },
        [getPostsByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {

                state.userPosts = state.userPosts.filter((item) => item._id !== id);
                state.posts = state.posts.filter((item) => item._id !== id);
            }
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.userPosts = state.userPosts.map((item) => item._id === id ? action.payload : item);
                state.posts = state.posts.map((item) => item._id === id ? action.payload : item);
            }
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [likePost.pending]: (state, action) => {},
        [likePost.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: {_id}, 
            } = action.meta;
            if(_id) {
                state.posts = state.posts.map((item) => item._id === _id ? action.payload : item);
            }
        },
        [likePost.rejected]: (state, action) => {
            state.error = action.payload.message;
        },
    }
});

export default postSlice.reducer;