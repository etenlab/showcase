import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8080",
 realm: "showcase",
 clientId: "showcase-auth",
});

// keycloak.init({
//     onLoad: 'login-required'
// })

// keycloak.init({  checkLoginIframe: false }).then(authenticated => {
//     console.log(authenticated);
//     //this.setState({ keycloak: keycloak, authenticated: authenticated })
// })



export default keycloak;