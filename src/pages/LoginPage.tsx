import * as React from 'react'
import { useCallback } from 'react'
import { Redirect, useLocation } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

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

  if (keycloak?.authenticated)
    return <Redirect to={currentLocationState?.from as string} />

  return (
    <div className="form-wrapper">
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default LoginPage
