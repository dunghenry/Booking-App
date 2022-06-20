import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider, githubProvider } from "../../firebase";
export const loginEmailAndPassword = createAsyncThunk(
  "auth/loginEmailAndPassword",
  async ({ user, navigate, toast }, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
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
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const register = async ({ user, toast, navigate }) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    await updateProfile(response.user, {
      displayName: user.name,
    });
    if (response.user) {
      toast.success("Register success!");
      navigate('/login')
    }
    return response.user;
  } catch (err) {
    return toast.error(err.message);
  }
};
export const registerEmailAndPassword = createAsyncThunk(
  "auth/registerEmailAndPassword",
  async ({ user, toast, navigate }) => {
    return await register({ user, toast, navigate });
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async (navigate) => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    if (response.user) {
      navigate('/')
    }
    return response.user;
  } catch (error) {
    return toast.error(error.message);
  }
});

export const facebookLogin = createAsyncThunk(
  "auth/facebookLogin",
  async (navigate) => {
    try {
      const response = await signInWithPopup(auth, facebookProvider);
      if (response.user) {
        navigate('/')
      }
      return response.user;
    } catch (error) {
      return toast.error(error.message);
    }
  }
);
export const githubLogin = createAsyncThunk("auth/githubLogin", async (navigate) => {
  try {
    const response = await signInWithPopup(auth, githubProvider)
    if (response.user) {
      navigate('/')
    }
    return response.user
  } catch (error) {
    return toast.error(error.message);
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
  reducers: {},
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
    [registerEmailAndPassword.pending]: (state) => {
      state.errors = [];
      state.loading = true;
    },
    [registerEmailAndPassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [registerEmailAndPassword.rejected]: (state, action) => {
      state.loading = false;
      state.errors = [...state.errors, action.payload];
    },
    [googleLogin.pending]: (state) => {
      state.errors = [];
      state.loading = true;
    },
    [googleLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [googleLogin.rejected]: (state, action) => {
      state.loading = false;
      state.errors = [...state.errors, action.payload];
    },
    [facebookLogin.pending]: (state) => {
      state.errors = [];
      state.loading = true;
    },
    [facebookLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [facebookLogin.rejected]: (state, action) => {
      state.loading = false;
      state.errors = [...state.errors, action.payload];
    },
    [githubLogin.pending]: (state) => {
      state.errors = [];
      state.loading = true;
    },
    [githubLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [githubLogin.rejected]: (state, action) => {
      state.loading = false;
      state.errors = [...state.errors, action.payload];
    },
  },
});
export const {} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
