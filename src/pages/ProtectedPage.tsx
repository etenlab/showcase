import { useHistory } from 'react-router-dom';

const ProtectedPage = () => {
  const history = useHistory();
  // const logout = useCallback(() => {
  //     keycloak?.logout()
  //   }, [keycloak])
  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div className="form-wrapper">
      <h1>Logged in</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProtectedPage;
