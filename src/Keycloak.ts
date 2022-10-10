import Keycloak from "keycloak-js";

console.log('process.env')
console.log(process.env)

const keycloak = new Keycloak({
 url: process.env.REACT_APP_KEYCLOAK_URL, //"http://localhost:8080",
 realm: process.env.REACT_APP_KEYCLOAK_REALM!,
 clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID!
});

// keycloak.init({
//     onLoad: 'login-required'
// })

// keycloak.init({  checkLoginIframe: false }).then(authenticated => {
//     console.log(authenticated);
//     //this.setState({ keycloak: keycloak, authenticated: authenticated })
// })



export default keycloak;