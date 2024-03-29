import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
  } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER'
  );

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN'
  );

  const LOGOUT = 'auth/LOGOUT';
  

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
      form, // register , login
      key, // username, password, passwordConfirm
      value, // 실제 바꾸려는값
    })
  );

  export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
  export const register = createAction(REGISTER, ({ email, password, type, name }) => ({
    email,
    password,
    type,
    name
  }));
  export const login = createAction(LOGIN, ({ email, password }) => ({
    email,
    password
  }));
  export const logout = createAction(LOGOUT);
  
  const registerSaga = createRequestSaga(REGISTER, authAPI.join);
  const loginSaga = createRequestSaga(LOGIN, authAPI.login);

  export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
 };

  const initialState = {
    register: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      type: "CONSUMER",
    },
    login: {
      email: '',
      password: ''
    },
    auth: null,
    authError: null
  };

  const auth = handleActions(
    {
      [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
        produce(state, draft => {
          draft[form][key] = value; // 예: state.register.username을 바꾼다
        }),
      [INITIALIZE_FORM]: (state, { payload: form }) => ({
        ...state,
        [form]: initialState[form],
        auth: null,
        authError: null // 폼 전환 시 회원 인증 에러 초기화
      }),
      // 회원가입 성공
      [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
      }),
      // 회원가입 실패
      [REGISTER_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      }),
      // 로그인 성공
      [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
      }),
      // 로그인 실패
      [LOGIN_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      }),
      [LOGOUT]: state => ({
        ...state,
        auth: null,
      }),
    },
    initialState
  );

export default auth;