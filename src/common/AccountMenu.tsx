/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { styles } from '../common/styles';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonIcon } from '@ionic/react';
import { moonSharp, moonOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { decodeToken, isAutherized } from '../utils/LoginUtils';

export function AccountMenu() {
  const history = useHistory();
  var test = localStorage.getItem('dark-mode');
  var darkMode = JSON.parse(test!);
  const [darkTheme, setDarkTheme] = useState<boolean>(darkMode);

  let authToken = localStorage.getItem('authToken');
  var tokenObj: any;
  if (authToken) {
    tokenObj = decodeToken(authToken);
  }

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const toggleTheme = useCallback(() => {
    setDarkTheme(darkTheme === true ? false : true);
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkTheme));
    if (darkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkTheme]);

  if (isAutherized(tokenObj)) {
    return (
      <div css={styles.accountMenuWrapper}>
        <IonButton onClick={toggleTheme}>
          <IonIcon icon={!darkTheme ? moonOutline : moonSharp} />
        </IonButton>
        <button css={styles.accountButton} type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div css={styles.accountMenuWrapper}>
        <IonButton onClick={toggleTheme}>
          <IonIcon icon={!darkTheme ? moonOutline : moonSharp} />
        </IonButton>
        <a css={styles.accountButton} href="/register">
          Register
        </a>
        <a css={styles.accountButton} href="/login">
          Login
        </a>
      </div>
    );
  }
}
