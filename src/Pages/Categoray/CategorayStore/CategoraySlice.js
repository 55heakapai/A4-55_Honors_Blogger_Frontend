import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCategoray = createAsyncThunk("createCategoray", async (data) => {
  const response = await axios.post("http://localhost:3001/category/addcat", data);
  console.log('------ response ------', response.data);
  return response.data;
});

export const showCategoray = createAsyncThunk("showCategoray", async () => {
  const response = await axios.get("http://localhost:3001/category/showcat");
  return response.data;
});

export const deleteCategoray = createAsyncThunk("deleteCategoray", async (catId) => {
  await axios.delete(`http://localhost:3001/category/deletecat/${catId}`);
  return catId;
});

export const updateCategoray = createAsyncThunk("updateCategoray", async ({ id, data }) => {
  const response = await axios.put(`http://localhost:3001/category/updatecat/${id}`, data);
  return response.data;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    catData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE CATEGORY
      .addCase(createCategoray.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoray.fulfilled, (state, action) => {
        state.loading = false;
        state.catData.push(action.payload);
      })
      .addCase(createCategoray.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SHOW CATEGORY
      .addCase(showCategoray.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCategoray.fulfilled, (state, action) => {
        state.loading = false;
        state.catData = action.payload;
      })
      .addCase(showCategoray.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE CATEGORY
      .addCase(deleteCategoray.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoray.fulfilled, (state, action) => {
        state.loading = false;
        state.catData = state.catData.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteCategoray.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE CATEGORY
      .addCase(updateCategoray.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoray.fulfilled, (state, action) => {
        state.loading = false;
        state.catData = state.catData.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(updateCategoray.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
