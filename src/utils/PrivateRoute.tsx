import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom'

interface PrivateRouteParams extends RouteProps {
    roles: any
    component:
      | React.ComponentType<RouteComponentProps<any>>
      | React.ComponentType<any>
  }

export function PrivateRoute({ component: Component, roles, ...rest }: PrivateRouteParams) {
    const { keycloak } = useKeycloak()

    const isAutherized = (roles: any) => {
        if (keycloak && roles) {
            return roles.some((r: any) => {
                const realm =  keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                return realm || resource;
            });
        }
        return false;
       }
    
   

   return (
      <Route 
        {...rest}
        render={props => {
            return isAutherized(roles)
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', }} />
        }}
      />
    )
}