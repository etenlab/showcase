/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useCallback } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { styles } from '../common/styles'

const LoginPage = () => {
  const location = useLocation<{ [key: string]: unknown }>()
  console.log("location.state start");
  console.log(location);
  console.log("location.state end");
  const currentLocationState = location.state || {
    from: { pathname: '/protected' },
  }

  const { keycloak } = useKeycloak()

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  console.log(keycloak);

  if (keycloak?.authenticated)
    return <Redirect to={currentLocationState?.from as string} />

  return (
    <div css={styles.formWrapper}>
      <button css={styles.formButton} type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default LoginPage
