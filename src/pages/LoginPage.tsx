/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useCallback, useState } from 'react';
import { styles } from '../common/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const history = useHistory();
  const apiUrl = `${process.env.REACT_APP_DATABASE_API_URL}/users/login?client-id=${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`;
  const [loginMessage, setLoginMessage] = useState('');

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    await axios
      .post(apiUrl, {
        login: userName,
        password: password,
      })
      .then(async (response) => {
        localStorage.setItem(
          'authToken',
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem('userId', response.data.user_id);
        history.push('/protected');
      })
      .catch((er) => {
        if (er.message) {
          setLoginMessage(er.message);
        }
      });
  }, [apiUrl, userName, password, history]);

  return (
    <div css={styles.loginFormWrapper}>
      <div css={{ marginBottom: '10px' }}>
        <h4>Login</h4>
      </div>
      <div>
        <span className="error">{loginMessage}</span>
      </div>
      <div
        css={{
          marginBottom: '10px',
        }}
      >
        <div css={{ textAlign: 'left' }}>
          <label>Username</label>
        </div>
        <div>
          <input
            defaultValue={userName}
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
            type="text"
          />
        </div>
      </div>

      <div css={{ marginBottom: '10px' }}>
        <div css={{ textAlign: 'left' }}>
          <label>Password</label>
        </div>
        <div>
          <input
            defaultValue={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
        </div>
      </div>

      <button
        css={styles.formButton}
        type="button"
        onClick={() => handleLogin()}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
