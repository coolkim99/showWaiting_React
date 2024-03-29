import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { findStores } from '../../modules/stores';
import { findDone, findOrdering } from '../../modules/orders';

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError} = useSelector(({ auth }) => ({
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError
    }));

    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
          changeField({
            form: 'login',
            key: name,
            value,
          }),
        );
      };

      // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {email, password} = form;
        dispatch(login({ email, password }));
    };

      // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
          console.log('오류 발생');
          console.log(authError);
          setError('로그인 실패');
          return;
        }
        if (auth) {
          console.log('로그인 성공');
          console.log(auth.result.id);
        }
      }, [auth, authError, dispatch]);

      const handleOrders = async (dispatch, userId, history) => {
        try {
          await dispatch(findOrdering(userId));
          await dispatch(findDone(userId));
          history.push('/orders');
        } catch (error) {
          console.error(error);
        }
      };

      const fetchData = async () => {
        try {
          if (auth) {
            if (auth.result.type === "CONSUMER") {
              history.push('/main');
            } else if (auth.result.type === "STORE") {
              await handleOrders(dispatch, auth.result.id, history);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {        
        fetchData();
      }, [history, auth, dispatch]);


    return (
      <AuthForm
        type="login"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    );
  };
  
  export default withRouter(LoginForm);