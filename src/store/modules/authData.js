//import firebase from "firebase/app";
//import "firebase/auth";
import Vue from 'vue'

export default {

  state: {
    loggedInUser:
      localStorage.getItem("userInfo") != null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
      username:'',
      role:'',
    loading: false,
    error: null,
      country: ""
  },

  getters: {
    loggedInUser: state => state.loggedInUser,
    loading: state => state.loading,
    error: state => state.error
  },
  mutations: {

    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {

      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      //localStorage.removeItem("userInfo")
      //this.$router.go("/");
      //this.$router.push("/app/sessions/signIn");

    },

    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    }
  },

  actions: {

    login({commit}, data) {

      commit("clearError");
      commit("setLoading", true);

      Vue.prototype.$keycloak.loginFn()

        console.log(data.login);


        const newUser = {uid: 1};
        localStorage.setItem("userInfo", JSON.stringify(newUser));
        commit("setUser", {uid: 1});


      /*firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(user => {
          const newUser = {uid: user.user.uid};
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          commit("setUser", {uid: user.user.uid});
          console.log("user");
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(error);
          localStorage.removeItem("userInfo");
          commit("setError", error);
          // ...
        });*/

    },
    signUserUp({commit}, data) {
      commit("setLoading", true);
      commit("clearError");
        console.log(data.email);
      /*firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(user => {
          commit("setLoading", false);

          const newUser = {
            uid: user.user.uid
          };
          console.log(newUser);
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          localStorage.removeItem("userInfo");
          console.log(error);
        });*/
    },
    signOut() {
        //commit("setLogout");

        Vue.prototype.$keycloak.logoutFn()
        localStorage.removeItem("userinfo");
      /*firebase
        .auth()
        .signOut()
        .then(
          () => {
            localStorage.removeItem("userInfo");
            commit("setLogout");
          },
          _error => {}
        );
    */}

  }
};
