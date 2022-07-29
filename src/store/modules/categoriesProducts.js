import axios from 'axios'
import constants from '../../plugins/constants'

//const resource_url = "http://36fd800a6734.ngrok.io/api/v1/";

//vendeurs
//contacts
//filtre
    const state = {
        catproducts:[],
        products: [],
        sellers: [],
        contacts: [],
        selectCat:1,
        resultsearch:[],
        box:false,
        encaissements:{},
        vehicules:{},
        vehicule:[],
        clientsId:"",
        nomcontacts:"",
        nomclient:"",
        vendeursId:"",
        contactsId:"",
        contacclt:"",
        resource_url: constants.resource_url
    };

    const actions = {
        updateClientsId({commit},data){
            commit("SETCLIENTID",data.clientid)
        },
          FetchCatProducts({commit}){

             axios.get(state.resource_url+'caisse/catproducts')
                .then(products => {
                    commit("SETCATPRODUCTS",products.data.data)

                })
                .catch(function(error) {
                    console.log('catproducts_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);
                    // ...
                });
            // response = response.data
            //console.log('response',response.data.data);

        },

         FetchProducts({commit},data){

            this.selectCat = data.categorieProduitId;
             axios.get(state.resource_url+'caisse/categorieproduits/'+data.categorieProduitId+'/listesproduits')

                .then(products => {
                    console.log('products',products.data);
                    commit("SETPRODUCTS",products.data.data)
                })

                .catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);
                    // commit("setError", error);
                    // ...

                });

            //console.log('response',response.data.data);

        },

         searchReference({commit},data){

            console.log('commit',data)
            axios.get(state.resource_url+'caisse/produits/reference/'+data)

                .then(products => {

                    console.log('products',products.data);
                    commit("SETPRODUCTS",products.data)

                })

                .catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);
                    // commit("setError", error);
                    // ...

                });

            //console.log('response',response.data.data);

        },

         FetchSellers({commit}){

            axios.get(state.resource_url+'vendeurs')
                .then(sellers => {
                    console.log('vendeurs',sellers.data.data);
                    commit("SETVENDEURS",sellers.data.data)
                })
                .catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);

                });
            //commit("SETPRODUCTS",[{id: 1,image:"",libelle:"Categorie A",categorie:"1",reference:"LTPOLART",prix:11500},{id: 2,image:"",libelle:"Categorie C",categorie:"1",reference:"LTJJHHUGI",prix:9500}])
            //console.log('response',response.data.data);

        },

         FetchContacts({commit}){

            axios.get(state.resource_url+'caisse/contacts')
                .then(contacts => {
                    console.log('contacts',contacts.data.data);
                    commit("SETCONTACTS",contacts.data.data)
                })
                .catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);

                });
            //commit("SETPRODUCTS",[{id: 1,image:"",libelle:"Categorie A",categorie:"1",reference:"LTPOLART",prix:11500},{id: 2,image:"",libelle:"Categorie C",categorie:"1",reference:"LTJJHHUGI",prix:9500}])
            //console.log('response',response.data.data);

        },

        inAccounts({commit},data){

            axios.post(state.resource_url + 'caisse/encaissements', data)
                .then(encaissements => {
                    if (encaissements.data.success) {
                        //objet client qui vient detre ajoute
                        //commit("SETCUSTOMER", customers.data.data)
                            commit("SETBOX", true)
                            commit("SETENCAISSEMENTS", encaissements.data)


                    }else{
                        commit("SETBOX", false)
                        commit("SETENCAISSEMENTS", encaissements.data)
                    }
                })
                .catch(function (error) {
                    console.log('customer_create_error', error);
                    //commit("SETBOX", true)
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);
                    //commit("setError", error);
                    // ...
                });

        },

         inBoxs({commit},data) {

            axios.post(state.resource_url + 'caisse/encaissements', data)
                .then(encaissements => {
                    if (encaissements.data.success) {
                        //objet client qui vient detre ajoute
                        //commit("SETCUSTOMER", customers.data.data)
                        commit("SETBOX", true)
                        commit("SETENCAISSEMENTS", encaissements.data)

                    }
                })

                .catch(function (error) {

                    commit("SETBOX", false)
                    console.log('customer_create_error', error);
                    //commit("SETBOX", true)
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);
                    //commit("setError", error);
                    // ...
                });
        },
         getvehicules({commit}){

            axios.get(constants.resource_url+"cg/vehicules")

                .then(holds => {

                    console.log('holds',holds);
                    if(holds.data.success) {
                        commit("SETVEHICULES", holds.data.data)
                    }
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
    }

    const getters = {
        getProducts: state => state.products,
        getCatProducts: state => state.catproducts,
        //GetResultSearch: state => state.resultsearch,
        GetBox:state => state.box,
        GetEncaissements:state => state.encaissements,
        GetClientId:state => state.clientsId,
        GetVehicules:state => state.vehicule
    }

    const mutations = {

        SETCATPRODUCTS: (state,catproduct)=>state.catproducts=catproduct,
        SETPRODUCTS: (state,products)=>state.products=products,
        SETVENDEURS: (state,vendeurs)=>state.vendeurs=vendeurs,
        SETCONTACTS: (state,contacts)=>state.contacts=contacts,
        //SETRESULTSEARCH: (state,result)=>state.resultsearch=result
        SETBOX: (state,result)=>state.box=result,
        SETENCAISSEMENTS: (state,result)=>state.encaissements=result,
        SETCLIENTID: (state,result)=>state.clientsId=result,
        SETVEHICULES: (state,result)=>state.vehicule=result

    };


export default {
    state,getters,actions,mutations
}