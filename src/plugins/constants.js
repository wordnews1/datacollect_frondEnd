const server_url = process.env.VUE_APP_BACK_SERVER_URL;
const client_url = process.env.VUE_APP_FRONT_SERVER_URL;
const keycloak_url = process.env.VUE_APP_KEYCLOAK_SERVER_URL;
//const reporting_url =  process.env.VUE_APP_REPORTING_URL;


const visit_port = process.env.VUE_APP_VISITE_PORT;
const mtc_port = process.env.VUE_APP_BACK_PORT;
const art_port = process.env.VUE_APP_ART_PORT;
const home_port =  process.env.VUE_APP_FRONT_PORT;
const keycloak_port =  process.env.VUE_APP_KEYCLOAK_PORT;
//const reporting_port =  process.env.VUE_APP_REPORTING_PORT;


const resource_url_visit = "http://"+server_url+":"+ visit_port + "/";
const resource_url = "http://"+server_url+":"+ mtc_port +"/api/v1/";

const resource_urls = "http://"+server_url+":"+ mtc_port;
const art_urls = "https://"+server_url+":"+ art_port+"/art";

const resource_urs = "http://"+client_url+":"+ home_port;
const resource_home = "http://"+server_url+":"+ home_port;


const resource_redirect = "http://"+keycloak_url+":"+ keycloak_port;
const resource_url_auth = "http://"+keycloak_url+":"+ keycloak_port +"/auth/";
const resource_url_users = "http://"+keycloak_url+":"+ keycloak_port +"/auth/admin/master/console/#/realms/mtckeycloak/users";
//const reporting_link = "http://"+reporting_url+":"+ reporting_port +"/art";



export default {
    resource_url_users,
    resource_home,
    resource_url,
    resource_urls,
    art_urls,
    resource_url_visit,
    resource_url_auth,
    resource_redirect,
    resource_urs,
}

