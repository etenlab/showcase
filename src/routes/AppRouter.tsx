// import { useKeycloak } from '@react-keycloak/web';

// import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//import Menu from '../components/Menu';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { PrivateRoute } from '../utils/PrivateRoute';
import ProtectedPage from '../pages/ProtectedPage';

export const AppRouter = () => {
  // const { keycloak, initialized } = useKeycloak();
  // if (!initialized) {
  //     return <h3>Loading ... !!!</h3>;
  // }
  return (
    <>
      {/* <Menu /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute
            roles={['showcase-user']}
            path="/protected"
            component={ProtectedPage}
          />
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
