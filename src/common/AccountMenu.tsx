/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { styles } from '../common/styles';
import { useCallback } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import {
    IonButton,
    IonIcon
} from '@ionic/react';
import { moonSharp, moonOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';


export function AccountMenu() {

    const { keycloak } = useKeycloak()
    const [ darkTheme,setDarkTheme]=useState<boolean>(false); 
    var darkMode = localStorage.getItem('dark-mode');
    // setDarkTheme(!darkMode);

    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])

    const register = useCallback(() => {
        keycloak?.register()
    }, [keycloak])

    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])

    const toggleTheme = useCallback(() => {
        setDarkTheme(!darkTheme);
        document.body.classList.toggle('dark');
        localStorage.setItem('dark-mode', String(darkTheme));
    }, [darkTheme])

    // const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    // const avatar = keycloak?.

    // console.log(keycloak);

    useEffect(() => {
        return setDarkTheme(Boolean(darkMode));
    }, [darkMode]);


    if(keycloak?.authenticated){
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