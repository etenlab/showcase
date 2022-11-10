/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
// import { useState } from "react";
import { styles } from "src/common/styles";



const RegisterPage = () => {

    // const [loginMessage, setLoginMessage] = useState("");

    // let userName: string;
    // let password: string;

    // const setUsername = (e: any) => {
    //     userName = e.target.value;
    // }

    // const setPassword = (e: any) => {
    //     password = e.target.value;
    // } 
    
    // const handleRegister = () => {
    //     console.log(userName)
    //     console.log(password)
    // }

    return (
        <div css={styles.loginFormWrapper}>
            <div css={{marginBottom: "10px"}}>
                <h4>Register</h4>
            </div>
            {/* <div>
                <span className="error">{loginMessage}</span>
            </div> */}
            {/* <div css={{
                marginBottom: '10px'
            }}>
                <div css={{textAlign: "left"}}><label>Username</label></div>
                <div><input onInput={setUsername} type="text" /></div>
            </div>
            
            <div css={{marginBottom: "10px"}}>
                <div css={{textAlign: "left"}}><label>Password</label></div>
                <div><input onInput={setPassword} type="password" /></div>
            </div> */}

            {/* <button css={styles.formButton} type="button" onClick={handleRegister}>
                Login
            </button> */}
        </div>
    );
}

export default RegisterPage;