
import axios from 'axios'
import constants from '../../plugins/constants'

const state = {
    marques:[],
    energies:[],
    propriolist:[],
    statusregister:false,
    cg:{},
    visites:[],
    visitesended:[],
    cgs:[],
    lines:[],
    chassis:"",
};

const actions = {

     visiteenattente({commit},params){

        console.log('loadpages',params)
        axios.get(constants.resource_url+"all/visites",{params})

            .then(holds => {

                if(holds.data.success) {
                    commit("SETVISITEWAITING", holds.data.data)
                }

            })
            .catch(function(error) {
                console.log('customer_create_error',error);


                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },
     visitefinish({commit},params){
        console.log('visitesended',params)
        axios.get(constants.resource_url+"all/visitesended",{params})

            .then(holds => {

                if(holds.data.success) {
                    commit("SETVISITEENDED", holds.data.data)
                }

            })
            .catch(function(error) {
                console.log('customer_create_error',error);


                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },
    visitestatus({commit},params){

        console.log('loadpages',params)
        axios.get(constants.resource_url+"visite/codestatut/1",{params})

            .then(holds => {

                if(holds.data.success) {
                    commit("SETVISITEWAITING", holds.data)
                }

            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },
     lignes({commit}){

       // data.idorganisation= "1"

        axios.get(constants.resource_url+"controleur/lignes")

            .then(lines => {

                if(lines.data.success) {
                    commit("SETLIGNES", lines.data.data)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },

     gmarques({commit}){

        axios.get(constants.resource_url+"all/search/marques")

            .then(holds => {

                if(holds.data.success) {
                    commit("SETMARQUES", holds.data.data)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },

     genergies({commit}){

        axios.get(constants.resource_url+"cg/energies")

            .then(holds => {

                if(holds.data.success) {
                    commit("SETENERGIE", holds.data.data)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },
     gproprietaire({commit}){

        axios.get(constants.resource_url+"cg/proprietaires")

            .then(holds => {

                if(holds.data.success) {
                    commit("SETPROPRIETAIRE", holds.data.data)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },

     searchcartegrise({commit},data){

        axios.get(constants.resource_url+"cg/search/last/"+data)

            .then(cg => {

                if(cg.data.success) {

                    console.log('cgrise',cg.data.data)
                    commit("SETCG", cg.data.data)

                }

            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },


     registercge({commit},data){

        axios.post(constants.resource_url+"cg/cartegrise",data)

          .then(holds => {

                console.log('holds',holds);
                commit("SETREGISTERSTATUS", holds.data)

                /*if(holds.data.success) {

                }*/
            })

            .catch(function(error) {

                commit("SETREGISTERSTATUS", false)
                console.log('customer_create_error',error);

                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },
     getcge({commit}){

        axios.get(constants.resource_url+"cg/cartegrises")

            .then(holds => {

                console.log('holds',holds);
                commit("SETCGS", holds.data.data)
                /*if(holds.data.success) {

                }*/
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });

    },

};

const getters = {

    getVisiteWaiting : state => state.visites,
    getVisiteEnded : state => state.visitesended,
    getMarques : state => state.marques,
    getEnergie : state => state.energies,
    getRegisterStatus : state => state.statusregister,
    getProprioList : state => state.propriolist,
    getCg : state => state.cg,
    getCgs : state => state.cgs,
    getLines : state => state.lines,

}

const mutations = {

    SETVISITEWAITING: (state,visites)=>state.visites=visites,
    SETVISITEENDED: (state,visitesended)=>state.visitesended=visitesended,
    SETMARQUES: (state,marques)=>state.marques=marques,
    SETENERGIE: (state,energies)=>state.energies=energies,
    SETREGISTERSTATUS: (state,statusregister)=>state.statusregister=statusregister,
    SETPROPRIETAIRE: (state,propriolist)=>state.propriolist=propriolist,
    SETCG: (state,cg)=>state.cg=cg,
    SETCGS: (state,cgs)=>state.cgs=cgs,
    SETLIGNES: (state,lines)=>state.lines=lines

};


export default {
    state,getters,actions,mutations
}