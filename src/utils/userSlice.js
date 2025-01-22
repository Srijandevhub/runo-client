import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiVersion, baseUrl } from "../data/url";

export const verfiedUser = createAsyncThunk("user/verfiedUser", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${baseUrl}/${apiVersion}/user/protected`, { withCredentials: true });
        if (res.status === 200) {
            return res.data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
    try {
        const res = await axios.post(`${baseUrl}/${apiVersion}/user/logout`, {}, { withCredentials: true });
        if (res.status === 200) {
            return null;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateUserInfo = createAsyncThunk("user/updateUserInfo", async ({ firstname, lastname, email, phonecode, phonenumber, bio, shortdescription }, thunkAPI) => {
    try {
        const res = await axios.post(`${baseUrl}/${apiVersion}/user/update-info`, {
            firstname,
            lastname,
            email,
            phonecode,
            phonenumber,
            bio,
            shortdescription
        }, { withCredentials: true });
        if (res.status === 200) {
            return res.data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateProfileImage = createAsyncThunk("user/updateProfileImage", async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${baseUrl}/${apiVersion}/user/update-profileimage`, formData, { withCredentials: true });
        if (res.status === 200) {
            return res.data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateCoverImage = createAsyncThunk("user/updateCoverImage", async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${baseUrl}/${apiVersion}/user/update-coverimage`, formData, { withCredentials: true });
        if (res.status === 200) {
            return res.data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const removeProfileImage = createAsyncThunk("user/removeProfileImage", async (_, thunkAPI) => {
    try {
        const res = await axios.delete(`${baseUrl}/${apiVersion}/user/remove-profileimage`, { withCredentials: true });
        if (res.status === 200) {
            return res.data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const removeCoverImage = createAsyncThunk("user/removeCoverImage", async (_, thunkAPI) => {
    try {
        const res = await axios.delete(`${baseUrl}/${apiVersion}/user/remove-coverimage`, { withCredentials: true });
        if (res.status === 200) {
            return res.data.user;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        loading: true
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(verfiedUser.pending, (state) => {
            state.loading = true;
        }).addCase(verfiedUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(verfiedUser.rejected, (state) => {
            state.loading = false;
            state.data = null;
        }).addCase(logoutUser.pending, (state) => {
            state.loading = true;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(logoutUser.rejected, (state) => {
            state.loading = false;
            state.data = null;
        }).addCase(updateUserInfo.pending, (state) => {
            state.loading = true;
        }).addCase(updateUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(updateUserInfo.rejected, (state) => {
            state.loading = false;
            state.data = null;
        }).addCase(updateProfileImage.pending, (state) => {
            state.loading = true;
        }).addCase(updateProfileImage.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(updateProfileImage.rejected, (state) => {
            state.loading = false;
            state.data = null;
        }).addCase(updateCoverImage.pending, (state) => {
            state.loading = true;
        }).addCase(updateCoverImage.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(updateCoverImage.rejected, (state) => {
            state.loading = false;
            state.data = null;
        }).addCase(removeProfileImage.pending, (status) => {
            status.loading = true;
        }).addCase(removeProfileImage.fulfilled, (status, action) => {
            status.loading = false;
            status.data = action.payload;
        }).addCase(removeProfileImage.rejected, (state) => {
            state.loading = false;
            state.data = null;
        }).addCase(removeCoverImage.pending, (status) => {
            status.loading = true;
        }).addCase(removeCoverImage.fulfilled, (status, action) => {
            status.loading = false;
            status.data = action.payload;
        }).addCase(removeCoverImage.rejected, (state) => {
            state.loading = false;
            state.data = null;
        })
    }
})

export default userSlice.reducer