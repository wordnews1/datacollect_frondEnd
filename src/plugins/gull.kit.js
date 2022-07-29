import BootstrapVue from "bootstrap-vue";
import VueFormWizard from "vue-form-wizard";
import FlagIcon from "vue-flag-icon";
import VueLazyload from "vue-lazyload";
import Meta from "vue-meta";
import Toasted from 'vue-toasted';
import Vuelidate from "vuelidate";
import VueGoodTablePlugin from "vue-good-table";
import "../plugins/echarts";
// locale.use(lang);
import "../assets/styles/sass/themes/lite-blue.scss"
import "../assets/styles/css/themes/lite-blue.css"

import "../assets/styles/sass/globals/components/_vue-good-table.scss"
import "../assets/styles/sass/globals/views/_contactListTable.scss"
import {Datepicker, Timepicker, DatetimePicker} from '@livelybone/vue-datepicker';
export default {

  install(Vue) {

    Vue.use(BootstrapVue);

      Vue.directive("uppercase", {
          update: function (el) {
              el.value = el.value.toUpperCase()
          }
      })


      Vue.component(
          "large-sidebar",
          // The `import` function returns a Promise.
          () => import("../containers/layouts/largeSidebar")
      );


      // Global register
      Vue.component('datepricker', Datepicker);
      Vue.component('timepicker', Timepicker);
      Vue.component('datetime-picker', DatetimePicker);

      Vue.directive('uppercase', {
          update(el) {
              const sourceValue = el.value;
              const newValue = sourceValue.toUpperCase();

              if (sourceValue !== newValue) {
                  el.value = newValue;
                  el.dispatchEvent(new Event('input', { bubbles: true }));
              }
          },
      });

      Vue.use(Toasted,{duration:5000,keepOnHover:true})
      //vuelidate
      Vue.use(Vuelidate);

      Vue.component(
          "compact-sidebar",
          // The `import` function returns a Promise.
          () => import("../containers/layouts/compactSidebar")
      );
      Vue.component(
          "languagedrop",
          // The `import` function returns a Promise.
          () => import("../views/app/components/language-drop")
      );


      Vue.component(
          "customizer",
          // The `import` function returns a Promise.
          () => import("../components/common/customizer.vue")
      );
      Vue.component("vue-perfect-scrollbar", () =>
          import("vue-perfect-scrollbar")
      );
      Vue.use(VueFormWizard);
      Vue.use(FlagIcon);


      Vue.use(Meta, {
          keyName: "metaInfo",
          attribute: "data-vue-meta",
          ssrAttribute: "data-vue-meta-server-rendered",
          tagIDKeyName: "vmid",
          refreshOnceOnNavigation: true
      });


      Vue.use(VueLazyload, {
          observer: true,
          // optional
          observerOptions: {
              rootMargin: "0px",
              threshold: 0.1
          }
      });

      Vue.use(VueGoodTablePlugin);

  }
};
