/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useState } from 'react'
import { styles } from '../common/styles'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const querystring = require("query-string");

const LoginPage = () => {
  const history = useHistory();
  const keycloakUrl = `${process.env.REACT_APP_KEYCLOAK_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect`;
  const [loginMessage, setLoginMessage] = useState("");
  
  let userName: string;
  let password: string;

  const setUsername = (e: any) => {
    userName = e.target.value;
  }

  const setPassword = (e: any) => {
    password = e.target.value;
  }

  const handleLogin = async () => {
    console.log(userName);
    console.log(password);


    await axios.post(`${keycloakUrl}/token`, querystring.stringify({
        client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
        client_secret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
        username: userName,
        password: password,
        grant_type: 'password' //'client_credentials'
    }),{
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then( async (response) => {
        console.log("response.data.access_token");
        console.log(response.data.access_token)
        localStorage.setItem('authToken', JSON.stringify(response.data.access_token))
        history.push('/protected');
    }).catch(er => {
        if(er.message){
            setLoginMessage(er.response?.data.error_description)
        }
    });
  }

  return (
    <div css={styles.loginFormWrapper}>
      <div css={{marginBottom: "10px"}}>
        <h4>Login</h4>
      </div>
      <div>
      <span className="error">{loginMessage}</span>
      </div>
      <div css={{
        marginBottom: '10px'
      }}>
        <div css={{textAlign: "left"}}><label>Username</label></div>
        <div><input onInput={setUsername} type="text" /></div>
      </div>
      
      <div css={{marginBottom: "10px"}}>
        <div css={{textAlign: "left"}}><label>Password</label></div>
        <div><input onInput={setPassword} type="password" /></div>
      </div>

      <button css={styles.formButton} type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default LoginPage
