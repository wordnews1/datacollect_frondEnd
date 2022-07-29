import axios from 'axios'
import constants from '../../plugins/constants'

const state = {
    resource_url: constants.resource_url,
    list_kanban:[],
    list_graph:[],
    list_hist:[],
    list:[],
    statuscat:false,
    colors:["#003473","#EB9F07"],
    catproducts:[],
    products:[],
    statuspost:false,
    statusapprove:false,
    signature:false,
    link:"",
    links:""
}


const actions = {

     FetchVueKanban({commit},value){

        axios.get(state.resource_url+value+'/kanbanview')
            .then(list => {
                if(list.data.success){
                    commit("SETVUEKANBAN",list.data.data)
                }

            })
            .catch(function(error) {
                console.log('products_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);

            });

    },

     FetchVueGraph({commit},value){

        axios.get(state.resource_url+value+'/graphview')
            .then(list => {
                if(list.data.success){
                    commit("SETVUEGRAPH",list.data.data)
                    commit("SETVUEHIST",list.data.datas)
                }

            })
            .catch(function(error) {
                console.log('products_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);

            });

    },

     FetchVueList({commit},value){

        axios.get(state.resource_url+value+'/listview')

            .then(list => {

                if(list.data.success){

                    commit("SETVUELIST",list.data.data)

                }

            })
            .catch(function(error) {
                console.log('products_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);

            });

    },

     FetchVueVisitList({commit},params){

        console.log('params02',params)
        axios.get(state.resource_url+'all/visite/listview/'+1,{params})

            .then(list => {

                if(list.data.success){

                    commit("SETVUELIST",list.data.data)

                }

            })
            .catch(function(error) {
                console.log('products_error',error);
                commit("SETVUELIST",false)
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);

            });

    },


     registercatProduct({commit},data){

        axios.post(state.resource_url+data.variant,data)

            .then(customers => {

                if(customers.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETCATPRODUCTS", customers.data.data)
                    commit("SETSTATUS", true)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;

            });

    },

     approve({commit},data){

        axios.post(state.resource_url+'visites/approuver',data)

            .then(approve => {

                if(approve.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETSTATUSAPPROVE", true)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;

            });

    },

    printps({commit},data){
        // printp({commit},data){

        //axios.get(state.resource_url+'download-pdf/'+data)
        axios.get(state.resource_url+'visites/imprimer/pv/'+data)

            .then(approve => {

                //if(approve.data.success) {
                //objet client qui vient detre ajoute
                commit('SETLINKS',Math.random())
                window.open(constants.resource_urls+approve.data.data, '_blank')
                //}
            })

            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;

            });

    },

     printp({commit},data){
    // printp({commit},data){

        //axios.get(state.resource_url+'download-pdf/'+data)
        axios.get(state.resource_url+'visites/imprimer/pv/'+data)

            .then(approve => {

                //if(approve.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETLINK", Math.random())
                window.open(constants.resource_urls+approve.data, '_blank')
                //}
            })

            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;

            });

    },

     registerproduct({commit},data){


        axios.post(state.resource_url+data.get('variant'),data)

            .then(customers => {

                if(customers.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETPRODUCTS", customers.data.data)
                }
            })
            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;

            });

    },

     startinspection({commit},data){

        var userinfo = JSON.parse(localStorage.getItem('userinfo'))

        data.controleurId = userinfo.sub
            console.log('data',data)
        axios.post(state.resource_url+"controleur/inspections",data)
            .then(inspection => {
                console.log('customer_create_error',inspection.data.success);

               // if(inspection.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETSTATUSPOST", inspection)

                //}
            })

            .catch(function(error) {
                console.log('customer',error);
                commit("SETSTATUSPOST", false)
                // Handle Errors here.
                // var errorCode = error.code;

            });

    },

     savesignature({commit},data){

        axios.post(state.resource_url+"controleur/upload/signature",data)

            .then(inspection => {
                // if(inspection.data.success) {
                //objet client qui vient detre ajoute
                commit("SETSTATUSSIGNATURE", inspection.data.success)

            })

            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;

            });

    }

}

const getters = {

    GetVueKanban: state => state.list_kanban,
    GetVueGraph: state => state.list_graph,
    GetVueList: state => state.list,
    GetVueHist: state => state.list_hist,
    GetStatus: state => state.statuscat,
    GetStatusPost: state => state.statuspost,
    GetCatProducts: state => state.catproducts,
    GetProducts: state => state.products,
    getStatusApprove: state => state.statusapprove,
    getStatusSignature: state => state.signature,
    getLink: state => state.links,
    getLinks: state => state.links

}

const mutations = {

    SETVUEKANBAN: (state,list_kanban)=>state.list_kanban=list_kanban,
    SETVUEGRAPH: (state,list_graph)=>state.list_graph=list_graph,
    SETVUEHIST: (state,list_hist)=>state.list_hist=list_hist,
    SETVUELIST: (state,list)=>state.list=list,
    SETSTATUS: (state,status)=>state.statuscat=status,
    SETCATPRODUCTS: (state,status)=>state.catproducts=status,
    SETPRODUCTS: (state,status)=>state.products=status,
    SETSTATUSPOST: (state,status)=>state.statuspost=status,
    SETSTATUSAPPROVE: (state,status)=>state.statusapprove=status,
    SETSTATUSSIGNATURE: (state,status)=>state.signature=status,
    SETLINK: (state,links)=>state.link=links,
    SETLINKS: (state,links)=>state.links=links

}

export default {
    state,getters,actions,mutations
}
