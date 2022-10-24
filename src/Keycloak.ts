import Keycloak from "keycloak-js";

console.log('process.env')
console.log(process.env)

var keycloak = new Keycloak({
 url: process.env.REACT_APP_KEYCLOAK_URL, //"http://localhost:8080",
 realm: process.env.REACT_APP_KEYCLOAK_REALM!,
 clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID!
});

if(process.env.NODE_ENV === "production"){
    keycloak = new Keycloak({
        url: "https://sso.dev.lab.eten.bible:8443", //"http://localhost:8080",
        realm: "showcase",
        clientId: "showcase-auth", 
    });
}

// keycloak.init({}).success(function(authenticated) {
//     alert(authenticated ? 'authenticated' : 'not authenticated');
// }).error(function() {
//     alert('failed to initialize');
// });
// keycloak.init({
//     onLoad: 'login-required'
// })

// keycloak.init({  checkLoginIframe: false }).then(authenticated => {
//     console.log(authenticated);
//     //this.setState({ keycloak: keycloak, authenticated: authenticated })
// })



export default keycloak;