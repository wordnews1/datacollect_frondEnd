<template>
  <div class="main-header" style="background-color: #f9f9f9">

    <div class="logo">
      <img src="../../../assets/images/logo-text.png" alt />
    </div>

    <div @click="sideBarToggle" class="menu-toggle">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="d-flex align-items-center">

      <!-- Mega menu -->

      <!-- / Mega menu -->
      <!--div class="search-bar">
        <input type="text" placeholder="Search" />
        <i class="search-icon text-muted i-Magnifi-Glass1"></i>
      </div-->

    </div>


    <div style="margin: auto"></div>

    <div class="header-part-right">
      <!-- Full screen toggle -->
      <i
        class="i-Full-Screen header-icon d-none d-sm-inline-block"
        @click="handleFullScreen"
      ></i>
      <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i> -->
      <!-- Grid menu Dropdown -->

      <div class="topbar-item" > <!--class="topbar-item"-->
        <b-dropdown
                size="sm"
                variant="link"
                toggle-class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
                no-caret
                right
                no-flip
        >
          <template v-slot:button-content>
            <img
                    class="h-20px w-20px rounded-sm"
                    :src="languageFlag || getLanguageFlag"
                    alt=""
            />
          </template>
          <b-dropdown-text tag="div" class="min-w-md-175px">
            <KTDropdownLanguage
                    v-on:language-changed="onLanguageChanged"
            ></KTDropdownLanguage>
          </b-dropdown-text>
        </b-dropdown>
      </div>

      <languagedrop @lang="lang" @changeLocal="changeLocale"></languagedrop>


      <span style="margin-right: 5px" :class="roleBadge">{{role}}</span>
      <span style="margin-right: 5px;background-color: green!important" :class="roleBadge"><i class="i-Checked-User mr-1"></i>{{nom}}</span>



      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown
          id="dropdown-1"
          text="Dropdown Button"
          class="m-md-2 user col align-self-end"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content">
            <img
              src="../../../assets/images/faces/1.png"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </template>


          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
              <i class="i-Lock-User mr-1"></i> {{this.$store.state.authData.username}}
            </div>
            <a class="dropdown-item"> <i class="i-Find-User mr-1"></i>{{ $t("Compte") }}</a>
            <a class="dropdown-item" target="_blank" href="http://135.125.216.79:8080/art"><i class="i-Big-Data mr-1"></i>{{ $t("Historique") }}</a>
            <a class="dropdown-item" href="#" @click.prevent="logoutUser"><i class="i-Power-2 mr-1"></i>{{ $t("Deconnexion") }}</a>
          </div>
        </b-dropdown>
      </div>
    </div>
    <search-component
      :isSearchOpen.sync="isSearchOpen"
      @closeSearch="toggleSearch"
    ></search-component>
  </div>

  <!-- header top menu end -->
</template>
<script>
import Util from "../../../utils";
import languagedrop from '../../../views/app/components/language-drop'
//import Sidebar from "./Sidebar";
import KTDropdownLanguage from "../../../views/app/components/DropdownLanguage.vue";
import searchComponent from "../common/search";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
import i18nService from "../../../store/modules/i18nService";

export default {
  mixins: [clickaway],
  components: {
    //Sidebar,
    searchComponent, languagedrop, KTDropdownLanguage
  },

  data() {
    return {
        languageFlag: "",
        languages: i18nService.languages,
        role:"",
        nom:"",
        roleBadge:"",
      isDisplay: true,
      lang:(!localStorage.getItem('lang')===null)?localStorage.getItem('lang'):'fr',
      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false
    };
  },

  computed: {
    ...mapGetters(["getSideBarToggleProperties"]),
      getLanguageFlag() {
          return this.onLanguageChanged();
      }
  },
    beforeMount(){
        this.$i18n.locale =  (!(localStorage.getItem('lang')===null))?localStorage.getItem('lang'):'fr'
        //this.lang = this.$i18n.locale
        console.log('forc',this.$i18n.locale)
        console.log('forc',!(localStorage.getItem('lang')===null)?localStorage.getItem('lang'):'fr')
        this.nom = this.$store.state.authData.username
        this.findRole();

        //console.log('forc',localStorage.getItem('lang'))
        //console.log('forc',localStorage.getItem('lang')===null)
    },
  methods: {

    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSidebarProperties",
      "changeThemeMode",
      "signOut"
    ]),
      onLanguageChanged() {
          this.languageFlag = this.languages.find(val => {
              return val.lang === i18nService.getActiveLanguage();
          }).flag;
      },
      changeLocale : function (data) {

        console.log('test',data)
          localStorage.setItem('lang',data)
          this.$i18n.locale = data;
         // this.$router.go()

      },
    // megaMenuToggle() {
    //   this.isMegaMenuOpen = false;
    //   console.log("work");
    // },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    logoutUser() {
        localStorage.removeItem("selecthold")
      this.signOut();

      //this.$router.push("/app/sessions/signIn");
    },
    findRole(){

      console.log('username',this.$store.state.authData)

        if(this.$store.state.authData.role.indexOf("chef") > -1){
            this.role="Chef";
            this.roleBadge = "badge badge-warning"
        }
        else if(this.$store.state.authData.role.indexOf("controleur") > -1){
            this.role="Contrôleur";
            this.roleBadge = "badge badge-danger"
        }
        else if(this.$store.state.authData.role.indexOf("caissier") > -1){
            this.role="Caissier";
            this.roleBadge = "badge badge-warning"
        }
        else if(this.$store.state.authData.role.indexOf("cg") > -1){
            this.role="Mis à jour";
            this.roleBadge = "badge badge-success"
        }
        else{
            this.role="Spécial";
            this.roleBadge = "badge badge-dark"
        }


    },

    closeMegaMenu() {
      this.isMegaMenuOpen = false;
      // console.log(this.isMouseOnMegaMenu);
      // if (!this.isMouseOnMegaMenu) {
      //   this.isMegaMenuOpen = !this.isMegaMenuOpen;
      // }
    },
    toggleMegaMenu() {
      this.isMegaMenuOpen = !this.isMegaMenuOpen;
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },

    sideBarToggle(el) {
        console.log(el);
      if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        isMobile
      ) {
        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
      } else if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        this.changeSecondarySidebarProperties();
      } else if (this.getSideBarToggleProperties.isSideNavOpen) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        !this.getSideBarToggleProperties.isActiveSecondarySideNav
      ) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        // console.log("4");

        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
        // console.log("4");
      }
    }
  }
};
</script>



