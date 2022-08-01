<template>
  <div>
    <!-- <keep-alive> -->
    <component :is="getThemeMode.layout"></component>
    <!-- </keep-alive> -->

  </div>

</template>

<script>

import { mapGetters,mapActions } from "vuex";
import Vue from 'vue'


export default {


  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getThemeMode","GETCOUNTRY"]),
  },

    methods:{
        ...mapActions(["getcountry"])
    },

  mounted(){

      this.getcountry()
      try{

          if(Vue.prototype.$keycloak.authenticated){

              this.loggedInUser = true
              this.$store.state.authData.username = Vue.prototype.$keycloak.tokenParsed.preferred_username
              this.$store.state.authData.role = Vue.prototype.$keycloak.tokenParsed.realm_access.roles
              localStorage.setItem('userinfo', JSON.stringify(Vue.prototype.$keycloak.tokenParsed));
				console.log('userinfo',Vue.prototype.$keycloak)
              if(this.$store.state.authData.role.indexOf('cg') !== -1){
                  this.$router.push({ name: 'cg', params: { id: '0' }})
                  return;
              }
            if(this.$store.state.authData.role.indexOf('hopital') !== -1){
              this.$router.push({ name: 'hospital', params: { id: '0' }})
              return;
            }
            if(this.$store.state.authData.role.indexOf('policier') !== -1){
              this.$router.push({ name: 'accidents', params: { id: '0' }})
              return;
            }
              if(this.$store.state.authData.role.indexOf('controleur') !== -1){
                  this.$router.push({name: 'visit_start'})
                  return;
              }
              if(this.$store.state.authData.role.indexOf('caissier') !== -1){
                  this.$router.push({ name: 'box'})
                  return ;
              }

              //console.log('roles',Vue.prototype.$keycloak.tokenParsed.organisationId)

          }else{
              console.log('not logged')
          }
      }catch(e){
          console.log('error')
      }
  },
    watch: {
        GETCOUNTRY:function(value){

            this.$store.state.authData.country ='<b>' +value.nom+'</b> '   + value.adress + " "+value.tel1

            console.log('standard',this.$store.state.authData.country)
            localStorage.setItem('region', (value.region));
            localStorage.setItem('devise', (value.devise));

        },

    }

};


</script>


