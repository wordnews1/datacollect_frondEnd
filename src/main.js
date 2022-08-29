import Vue from 'vue'
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

delete L.Icon.Default.prototype._getIconUrl
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
import VueCompositionAPI from '@vue/composition-api'

import App from './App.vue'
Vue.use(VueCompositionAPI)
Vue.use(vueMultiSelect)


Vue.use(VueLazyload)

import router from './router'
import VueHtmlToPaper from 'vue-html-to-paper';
import store from './store'
import GullKit from "./plugins/gull.kit";

import Breadcumb from "./components/breadcumb";
import i18n from "./lang/lang";
import axios from 'axios'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import VueMask from 'v-mask'
import constants from "./plugins/constants";
import wysiwyg from "vue-wysiwyg";
// Main JS (in UMD format)
import VueTimepicker from 'vue2-timepicker'
import 'vue-wysiwyg/dist/vueWysiwyg.css';
import VueSignaturePad from 'vue-signature-pad';
/*import VueAuthImage from 'vue-auth-image';
Vue.use(VueAuthImage);*/


import VueSSE from 'vue-sse';
Vue.use(VueMask);
Vue.use(VueSignaturePad);
Vue.component("breadcumb", Breadcumb);
import 'vue-search-select/dist/VueSearchSelect.css'
Vue.use(wysiwyg, {});
Vue.config.productionTip = false
Vue.use(VueSSE)
Vue.use(VueTimepicker)

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// set Authorization header used by axios
/*var authHeader = 'Bearer ' + Vue.prototype.$keycloak.token;
axios.defaults.headers.common['Authorization'] = authHeader;*/


Vue.use(GullKit);
//Vue.use(VueCompositionAPI);

import VueAutosuggest from "vue-autosuggest";
Vue.use(VueAutosuggest);




// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'leaflet/dist/leaflet.css';
//Vue.prototype.$keycloak.token
import {vueImgPreview} from 'vue-img-preview'

Vue.component('vue-img-preview', vueImgPreview)

function tokenInterceptor () {

    axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
        config.headers.lang = `${i18n.locale}`
        return config

    }, error => {
        return Promise.reject(error)
    })


}


const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}

Vue.use(VueHtmlToPaper, options);

Vue.use(VueKeyCloak, {

    config:{
        authRealm: "mtckeycloak",
        authUrl: constants.resource_url_auth ,//"http://192.168.0.100:8180/auth/",
        authClientId: "dataCollectFront",
        logoutRedirectUri: constants.resource_urs
    },

    init:{
        onLoad: 'login-required',
        checkLoginIframe : false,

    },

    onReady() {

        let just = `Bearer ${Vue.prototype.$keycloak.token}`
        localStorage.setItem("token",just)

        if(Vue.prototype.$keycloak.authenticated){
            tokenInterceptor()
        }

        //console.log(`I wonder what Keycloak returns: ${keycloak}`)
        new Vue({
            router,
            store,
            i18n,
            render: h => h(App)
        }).$mount('#app')


    }


})

/*new Vue({
    router,
    store,
    i18n,/
    render: h => h(App)
}).$mount('#app')*/





