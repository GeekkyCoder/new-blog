import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  AuthError,
  AuthLoading,
  RegisterUser,
  User,
  UserState,
} from "../../../types/user-types";

type ErrorResponse = {
  msg: string;
};

// Initial state
const initialState: UserState = {
  user: {
    email: "",
    firstName: "",
    lastName: "",
    isVerified: false,
    isLoggedIn: false,
    role: "",
    token: "",
    bio: "",
  },
  loading: {
    registerLoading: false,
    loginLoading: false,
  },
  error: {
    registerError: null,
    loginError: null,
  },
};

// Thunk for registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (registerData: RegisterUser, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      if (!response.ok) {
        const errorResponse: ErrorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse.msg);
      }
      return response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginUser: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      });
      if (!response.ok) {
        const errorResponse: ErrorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse.msg);
      }
      return response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading.registerLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.user = action.payload.user;
          state.loading.registerLoading = false;
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading.registerLoading = false;
        state.error.registerError = action.payload || "Registration failed";
        console.error("Registration failed:", action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.user;
        state.loading.loginLoading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.error.loginError = action.payload;
        state.loading.loginLoading = false;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState): User => state.userReducer.user;
export const selectLoading = (state: RootState): AuthLoading =>
  state.userReducer.loading;
export const selectError = (state: RootState): AuthError =>
  state.userReducer.error;

export default userSlice.reducer;
