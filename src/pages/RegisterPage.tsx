/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// import { useState } from "react";
import { styles } from 'src/common/styles';
import axios from 'axios';
import { useState } from 'react';

const querystring = require('query-string');

const RegisterPage = () => {
  const [loginMessage, setLoginMessage] = useState('');
  const [messageBox, setMessageBox] = useState<any>(styles.successMessage);

  let userName: string;
  let password: string;
  let firstName: string;
  let lastName: string;

  const setFitstName = (e: any) => {
    firstName = e.target.value;
  };

  const setLastNmae = (e: any) => {
    lastName = e.target.value;
  };

  const setUsername = (e: any) => {
    userName = e.target.value;
  };

  const setPassword = (e: any) => {
    password = e.target.value;
  };

  const handleRegister = async () => {
    // console.log(userName)
    // console.log(password)
    const url = `${process.env.REACT_APP_ADMIN_API_URL}/register`;
    var params = {
      email: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    await axios
      .post(url, querystring.stringify(params))
      .then((resp) => {
        if (resp.statusText === 'Created') {
          // const resObj = JSON.parse(resp);
          setMessageBox(styles.successMessage);
          // console.log(resp);
          setLoginMessage('User registration completed successfully');
        }
      })
      .catch((err) => {
        console.log('errror');
        setMessageBox(styles.errorMessage);
        console.log(err.response.data.errorMessage);
        setLoginMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div css={styles.loginFormWrapper}>
      <div css={{ marginBottom: '10px' }}>
        <h4>Register</h4>
      </div>
      <div>
        <span css={messageBox}>{loginMessage}</span>
      </div>
      <div
        css={{
          marginBottom: '10px',
        }}
      >
        <div css={{ textAlign: 'left' }}>
          <label>First Name</label>
        </div>
        <div>
          <input onInput={setFitstName} type="text" />
        </div>
      </div>
      <div
        css={{
          marginBottom: '10px',
        }}
      >
        <div css={{ textAlign: 'left' }}>
          <label>Last Name</label>
        </div>
        <div>
          <input onInput={setLastNmae} type="text" />
        </div>
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
          <input onInput={setUsername} type="text" />
        </div>
      </div>

      <div css={{ marginBottom: '10px' }}>
        <div css={{ textAlign: 'left' }}>
          <label>Password</label>
        </div>
        <div>
          <input onInput={setPassword} type="password" />
        </div>
      </div>

      <button css={styles.formButton} type="button" onClick={handleRegister}>
        Login
      </button>
    </div>
  );
};

export default RegisterPage;
