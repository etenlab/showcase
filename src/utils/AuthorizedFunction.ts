// import { useKeycloak } from "@react-keycloak/web";

export default function AuthorizedFunction(roles: any) {
//   const { keycloak, initialized } = useKeycloak();

//   console.log(initialized);

  const isAutherized = () => {
    // if (keycloak && roles) {
    //   return roles.some((r: any) => {
    //     const realm = keycloak.hasRealmRole(r);
    //     const resource = keycloak.hasResourceRole(r);
    //     return realm || resource;
    //   });
    // }
    return false;
  };

  return isAutherized();
}
