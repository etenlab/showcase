/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { styles } from '../common/styles';
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
    IonButton,
    IonIcon
} from '@ionic/react';
import { moonSharp, moonOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { decodeToken, isAutherized } from '../utils/LoginUtils'

export function AccountMenu() {

    const history = useHistory();
    const [ darkTheme,setDarkTheme]=useState<boolean>(false); 
    var darkMode = localStorage.getItem('dark-mode');
    // setDarkTheme(!darkMode);
    let authToken = localStorage.getItem("authToken");
    var tokenObj: any
    if(authToken){
        tokenObj  = decodeToken(authToken);
    }

    const logout = () => {
        localStorage.clear();
        history.push('/login');
    };

    const login = () => {
        history.push('/login');
    };

    const register = () => {

    }

    const toggleTheme = useCallback(() => {
        setDarkTheme(!darkTheme);
        document.body.classList.toggle('dark');
        localStorage.setItem('dark-mode', String(darkTheme));
    }, [darkTheme])



    useEffect(() => {
        return setDarkTheme(Boolean(darkMode));
    }, [darkMode]);


    if(isAutherized(tokenObj)){
        return (
            <div css={styles.accountMenuWrapper}>

                <button css={styles.accountButton} type="button" onClick={logout}>Logout</button>
            </div>
        );
    }
    else{
        return (
            
            <div css={styles.accountMenuWrapper}>
                <IonButton onClick={toggleTheme}>
                    <IonIcon icon={!darkTheme?moonOutline:moonSharp} />
                </IonButton>
                <button css={styles.accountButton} type="button" onClick={register} >
                  Register
                </button>
                <button css={styles.accountButton} type="button" onClick={login} >
                  Login
                </button>
            </div>
        );
    }
}