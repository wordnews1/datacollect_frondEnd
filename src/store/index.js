import Vue from 'vue'
import Vuex from 'vuex'

import config from "./modules/config";
import authData from "./modules/authData";
import compactSidebar from "./modules/compactSidebar";
import largeSidebar from "./modules/largeSidebar";
import categorieproducts from "./modules/categoriesProducts";
import caisses from "./modules/caisses";
import visits from "./modules/visit";
import cg from "./modules/cg";
import hospital from "./modules/hopital";
import constantes from "./modules/constantes";


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      config,
      authData,
      compactSidebar,
      largeSidebar,
      categorieproducts,
      caisses,
      visits,
      cg,
      hospital,
      constantes
  }
})
