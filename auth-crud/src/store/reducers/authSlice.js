import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../../firebase";
export const loginEmailAndPassword = createAsyncThunk(
  "auth/loginEmailAndPassword",
  async ({ user, navigate, toast }, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user.providerData[0];
      if (user) {
        toast.success("Login successfully!");
        navigate("/");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logOut", async (_, {rejectWithValue}) => {
  try {
    await signOut(auth);
    return;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const registerEmailAndPassword = createAsyncThunk('auth/registerEmailAndPassword', async ({user, navigate, toast}, {rejectWithValue}) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, user.email, user.password)
    await updateProfile(response.user, {
      displayName: user.name
    })
    const user = response.user.providerData[0];
    if (user) {
      navigate('/login')
    }
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
const initialState = {
  user: null,
  loading: false,
  errors: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: {
    [loginEmailAndPassword.pending]: (state) => {
      state.errors = [];
      state.loading = true;
    },
    [loginEmailAndPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [loginEmailAndPassword.rejected]: (state, action) => {
      state.loading = false;
      state.errors = [...state.errors, action.payload];
    },
    [logOut.pending]: (state) => {
      state.errors = [];
      state.loading = true;
    },
    [logOut.fulfilled]: (state) => {
      state.loading = false;
      state.user = null;
    },
    [logOut.rejected]: (state, action) => {
      state.loading = false;
      state.errors = [...state.errors, action.payload];
    },
  },
});
export const {  } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
