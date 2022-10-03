import { useCallback } from 'react'
import { useKeycloak } from '@react-keycloak/web'

const ProtectedPage = () => {
 
    const { keycloak } = useKeycloak()

    const logout = useCallback(() => {
        keycloak?.logout()
      }, [keycloak])

    return (
      <div className="form-wrapper">
        <h1>Logged in</h1>
        <button type="button" onClick={logout}>Logout</button>
      </div>
    )
  }
  
  export default ProtectedPage
  