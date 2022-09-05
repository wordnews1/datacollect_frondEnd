import axios from 'axios'
import constants from '../../plugins/constants'

const state = {

    resource_url: constants.resource_url,
    list_kanban:[],
    list_graph:[],
    listpatients:[],
    listfinish:[],
    listraumatisme:[],
    listexamens:[],
    listpatient:[],
    listsoins:[],
    listdossier:[],
    listdetail:[],
    listdata:[],
    listpolice:[],
    list:[],
    listacc:[]

}


const actions = {

    FetchVueKanbanPatients({commit},value){

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

    FetchVueGraphPatients({commit},value){

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
    StorePatients({commit},data){

        axios.post(state.resource_url+'cares',data)

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETSTOREPATIENTS",list.data.data)

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
    UpdatePatients({commit},data){

        axios.post(state.resource_url+'cares',data)

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETUPDATEPATIENTS",list.data.data)

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
    makeToast(variant = null,type) {

        switch (type) {
            case 0: type="error"; break;
            case 1: type="success" ; break;
            case 2: type="info"; break;
            case 3: type="warning"; break;

        }

        this.$toasted.show((variant),{type:type})

    },
    addpolice({commit},data){

        axios.post(state.resource_url+'accidents',data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }}
                )

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETADDACCIDENT",list.data.data)

                }else{
                    this.makeToast(this.$t('erreur dans la modification'),0)
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
    DetailsAccident({commit},data){

        axios.get(state.resource_url+'accidents/'+data)

            .then(list => {


                console.log('accidentdetails',list.data.data)
                state.listdetail=[]

                if(list.data.success){

                    commit("SETDETAILACCIDENT",list.data.data)

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
    FetchVueListPatients({commit},params){

        axios.get(state.resource_url+'cares',{params})

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETVUELISTPATIENTS",list.data.data)

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
    FetchVueListaccidents({commit},params){

        axios.get(state.resource_url+'accidents',{params})

            .then(list => {

                console.log('care',list.data)


                if(list.data.success){

                    commit("SETVUELISTACCIDENTS",list.data.data)

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
    Finish({commit},data){

        axios.post(state.resource_url+'accidents/finish',data)

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETFINISHACCIDENTS",list.data.data)

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
    FetchListTraumatisme({commit}){

        axios.get(state.resource_url+'injuries')

            .then(list => {

                console.log('trauma',list.data)

                if(list.data.success){

                    commit("SETLISTTRAUMATISME",list.data.data)

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

    FetchListExamens({commit}){

        axios.get(state.resource_url+'examinations')

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETLISTEXAMENS",list.data.data)

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
    FetchListTreatments({commit}){

        axios.get(state.resource_url+'treatments')

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETLISTSOINS",list.data.data)

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
    ListDossierPatient({commit},data){

        axios.get(state.resource_url+'cares/folder/'+data)

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETLISTDOSSIER",list.data.data)

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
    ListData({commit}){

        axios.get(state.resource_url+'accidents/oms-data')

            .then(list => {

                console.log('care',list.data)

                if(list.data.success){

                    commit("SETLISTDATA",list.data.data)

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
    fermerdossier({commit},data){

        axios.get(state.resource_url+'cares/close/folder/'+data.id)

            .then(list => {

                //console.log('care',list.data)

                if(list.data.success){

                    commit("SETCLOSEFOLDER",list.data.data)

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

}


const getters = {

    GetVueKanban: state => state.list_kanban,
    GetVueGraph: state => state.list_graph,
    GetVueListPatients: state => state.list,
    GETLISTTRAUMATISME: state => state.listraumatisme,
    GETLISTEXAMENS: state => state.listexamens,
    GETLISTACCIDENTS: state => state.listacc,
    GETLISTSOINS: state => state.listsoins,
    GetStorePatients: state => state.listpatients,
    GETDETAILACCIDENT: state => state.listdetail,
    GETLISTDATA: state => state.listdata,
    GETADDACCIDENT: state => state.listpolice,
    GETUPDATEPATIENTS: state => state.listpatients,
    GETFINISHACCIDENTS: state => state.listfinish,
    GETCLOSEFOLDER: state => state.listpatient,
    GetListDossier: state => state.listdossier

}


const mutations = {

    SETVUEKANBAN: (state,list_kanban)=>state.list_kanban=list_kanban,
    SETVUEGRAPH: (state,list_graph)=>state.list_graph=list_graph,
    SETVUELISTPATIENTS: (state,list)=>state.list=list,
    SETLISTTRAUMATISME: (state,list_trauman)=>state.listraumatisme=list_trauman,
    SETLISTEXAMENS: (state,list_examen)=>state.listexamens=list_examen,
    SETVUELISTACCIDENTS: (state,list_acc)=>state.listacc=list_acc,
    SETLISTSOINS: (state,list_soins)=>state.listsoins=list_soins,
    SETSTOREPATIENTS: (state,list)=>state.listpatients=list,
    SETDETAILACCIDENT: (state,listdetail)=>state.listdetail=listdetail,
    SETLISTDATA: (state,listdata)=>state.listdata=listdata,
    SETADDACCIDENT: (state,listpolice)=>state.listpolice=listpolice,
    SETUPDATEPATIENTS: (state,listpatients)=>state.listpatients=listpatients,
    SETFINISHACCIDENTS: (state,listfinish)=>state.listfinish=listfinish,
    SETCLOSEFOLDER: (state,listpatient)=>state.listpatient=listpatient,
    SETLISTDOSSIER: (state,listdossier)=>state.listdossier=listdossier

}

export default {
    state,getters,actions,mutations
}

