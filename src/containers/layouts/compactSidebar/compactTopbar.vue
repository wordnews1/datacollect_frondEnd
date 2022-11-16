<template>
  <div class="main-header">
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt />
    </div>

    <div @click="compactSideBarToggle" class="menu-toggle">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="d-flex align-items-center">
      <!-- Mega menu -->
      <div
        :class="{ show: isMegaMenuOpen }"
        class="dropdown mega-menu d-none d-md-block"
        v-on-clickaway="closeMegaMenu"
        style="visibility: hidden;width: 50px!important"

      >
        <a
          href="#"
          class="btn text-muted dropdown-toggle mr-3"
          id="dropdownMegaMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          @click="toggleMegaMenu"
          >Mega Menu</a
        >
        <div
          class="dropdown-menu text-left"
          :class="{ show: isMegaMenuOpen }"
          aria-labelledby="dropdownMenuButton"
        >
          <div class="row m-0">
            <div class="col-md-4 p-4 text-left bg-img">
              <h2 class="title">
                Mega Menu
                <br />Sidebar
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Asperiores natus laboriosam fugit, consequatur.
              </p>
              <p class=" mb-30">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem odio amet eos dolore suscipit placeat.
              </p>
              <button class="btn btn-lg btn-rounded btn-outline-warning">
                Learn More
              </button>
            </div>
            <div class="col-md-4 p-4 text-left">
              <p
                class="text-primary text--cap border-bottom-primary d-inline-block"
              >
                Features
              </p>
              <div class="menu-icon-grid w-auto p-0">
                <a href="#"> <i class="i-Shop-4"></i> Home </a>
                <a href="#"> <i class="i-Library"></i> UI Kits </a>
                <a href="#"> <i class="i-Drop"></i> Apps </a>
                <a href="#">
                  <i class="i-File-Clipboard-File--Text"></i> Forms
                </a>
                <a href="#"> <i class="i-Checked-User"></i> Sessions </a>
                <a href="#"> <i class="i-Ambulance"></i> Support </a>
              </div>
            </div>
            <div class="col-md-4 p-4 text-left">
              <p
                class="text-primary text--cap border-bottom-primary d-inline-block"
              >
                Components
              </p>
              <ul class="links">
                <li>
                  <a href="accordion.html">Accordion</a>
                </li>
                <li>
                  <a href="alerts.html">Alerts</a>
                </li>
                <li>
                  <a href="buttons.html">Buttons</a>
                </li>
                <li>
                  <a href="badges.html">Badges</a>
                </li>
                <li>
                  <a href="carousel.html">Carousels</a>
                </li>
                <li>
                  <a href="lists.html">Lists</a>
                </li>
                <li>
                  <a href="popover.html">Popover</a>
                </li>
                <li>
                  <a href="tables.html">Tables</a>
                </li>
                <li>
                  <a href="datatables.html">Datatables</a>
                </li>
                <li>
                  <a href="modals.html">Modals</a>
                </li>
                <li>
                  <a href="nouislider.html">Sliders</a>
                </li>
                <li>
                  <a href="tabs.html">Tabs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- / Mega menu -->

        <img src="../../../assets/images/logo-text.png" style="width: 85px;height: 70px;" alt />
      <!--<div class="search-bar" @click="toggleSearch">-->

      <div class="search-bar" style="margin-left: 60px">
        <input type="text" placeholder="Search" />
        <i class="search-icon text-muted i-Magnifi-Glass1"></i>
      </div>


    </div>

    <div style="margin: auto"></div>

    <div class="header-part-right">
      <!-- Full screen toggle -->
      <i
        class="i-Full-Screen header-icon d-none d-sm-inline-block"
        @click="handleFullScreen"
      ></i>
      <!-- Grid menu Dropdown -->



      <!-- Notification -->


      <!-- Notificaiton End -->

       <!-- <languages-dropdown selected="fr"
                            btn-bg-color="#ced4da"
                            :selected-languages="selectedList"
                            @change="changeLocale">

         begin: Language bar -->

        <div style="display: flex;
		align-items: center;" > <!--class="topbar-item"-->
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
        <!--end: Language bar -->


        <languagedrop  @changeLocal="changeLocale" ></languagedrop>

      <!-- User avatar dropdown -->
        <div class="collapse navbar-collapse" id="navbar-i18-demo">
            <ul class="navbar-nav">
                <li class="nav-item dropdown language-switch">
                    <a class="navbar-nav-link dropdown-toggle" data-toggle="dropdown"></a>
                    <div class="dropdown-menu">
                        <a href="#" class="dropdown-item english">
                            <img src="../lang/gb.png" class="img-flag" alt="">
                            English
                        </a>
                        <a href="#" class="dropdown-item spanish">
                            <img src="../lang/es.png" class="img-flag" alt="">
                            Spanish
                        </a>
                        <a href="#" class="dropdown-item italian">
                            <img src="../lang/it.png" class="img-flag" alt="">
                            Italian
                        </a>
                    </div>
                </li>
            </ul>
        </div>

      <div class="dropdown">f
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
              src="../../../assets/images/logo-text.png"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
              <i class="i-Lock-User mr-1"></i> Timothy Carlson
            </div>
            <a class="dropdown-item">Account settings</a>
            <a class="dropdown-item">Billing history</a>
            <a class="dropdown-item" href="#" @click.prevent="logoutUser"
              >Deconnexion</a
            >
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
import Util from "@/utils";
import searchComponent from "../common/search";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
/*import LanguagesDropdown from 'vue-languages-dropdown'*/
import languagedrop from '../../../views/app/components/language-drop'
import i18nService from "../../../store/modules/i18nService";

import KTDropdownLanguage from "../../../views/app/components/DropdownLanguage.vue";

export default {
  mixins: [clickaway],
  components: {
    searchComponent, languagedrop,KTDropdownLanguage
  },

  data() {
    return {
      isDisplay: true,

        languageFlag: "",
        languages: i18nService.languages,

      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false,
        selectedList : ['fr','en'],

    };
  },

  mounted() {
    // document.addEventListener("click", this.closeMegaMenu);
  },
  computed: {
    ...mapGetters(["getCompactSideBarToggleProperties"]),
      getLanguageFlag() {
          return this.onLanguageChanged();
      }
  },

  methods: {
    ...mapActions([
      "changeCompactSidebarProperties",
      "changeThemeMode",
      "signOut"
    ]),
      onLanguageChanged() {
          this.languageFlag = this.languages.find(val => {
              return val.lang === i18nService.getActiveLanguage();
          }).flag;
      },
      changeLocale : function (data) {

          this.$i18n.locale = data.code;
          console.log('console',data)

      },
    logoutUser() {
      this.signOut();


        //this.$router.push("/");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    closeMegaMenu() {
      this.isMegaMenuOpen =false;
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

    compactSideBarToggle(el) {
      // console.log("test");
        console.log(el);
      if (this.getCompactSideBarToggleProperties.isSideNavOpen && isMobile) {
        this.changeCompactSidebarProperties();
        // console.log("1");
      } else if (this.getCompactSideBarToggleProperties.isSideNavOpen) {
        this.changeCompactSidebarProperties();
        // console.log("2");
      } else if (
        !this.getCompactSideBarToggleProperties.isSideNavOpen &&
        !this.getCompactSideBarToggleProperties.isActiveSecondarySideNav
      ) {
        this.changeCompactSidebarProperties();
        // console.log("3");
      } else if (!this.getCompactSideBarToggleProperties.isSideNavOpen) {
        // console.log("4");

        this.changeCompactSidebarProperties();

        console.log("4");
      }
    }
  }
};
</script>



