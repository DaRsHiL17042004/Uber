// src/redux/actions/authActions.js
import { signupStart, signupSuccess, signupFail } from '../../slices/authSlice/authSlice';

export const signupUser = (formData) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // this includes HttpOnly cookie
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || 'Signup failed');
    dispatch(signupSuccess(data.user));
  } catch (err) {
    dispatch(signupFail(err.message));
  }
};
