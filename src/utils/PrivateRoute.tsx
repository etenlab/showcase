// import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { decodeToken, isAutherized } from './LoginUtils';
// import keycloak  from '../Keycloak'

interface PrivateRouteParams extends RouteProps {
  roles?: any;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export function PrivateRoute({
  component: Component,
  roles,
  ...rest
}: PrivateRouteParams) {
  // const { keycloak } = useKeycloak()
  let authToken = localStorage.getItem('authToken');
  var tokenObj: any;
  if (authToken) {
    tokenObj = decodeToken(authToken);
  }
  console.log(tokenObj);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAutherized(tokenObj, roles) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        );
      }}
    />
  );
}
