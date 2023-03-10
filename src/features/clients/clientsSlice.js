import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientsService from "./clientsService";

const initialState = {
  clients: [],
  client: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new client
export const createClient = createAsyncThunk(
  "clients/create",
  async (clientData, thunkAPI) => {
    try {
      return await clientsService.createClient(clientData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all clients of advisor
export const getClients = createAsyncThunk(
  "clients/getAll",
  async (advisorID, thunkAPI) => {
    try {
      return await clientsService.getClients(advisorID);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete client
export const deleteClient = createAsyncThunk(
  "client/delete",
  async (id, thunkAPI) => {
    try {
      return await clientsService.deleteClient(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Client Info
export const getClientInfo = createAsyncThunk(
  "client/get",
  async (id, thunkAPI) => {
    try {
      return await clientsService.getClientInfo(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = state.clients.filter(
          (client) => client.clientID !== action.meta.arg
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClientInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(getClientInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = clientsSlice.actions;
export default clientsSlice.reducer;
