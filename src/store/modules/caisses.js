import axios from 'axios'
import constants from '../../plugins/constants'


const state = {
    clients:[],
    client:{id:1,uid:0,name:"",prenom:"",phone:""},
    status:false,
    session_caisse_id:1,
    objethold:{},
    statusrequete:0,
    holdlist:[],
    selecthold:{},
    listproducts:{},
    productshold:{},
    montantopen:0,
    boxopens:false,
    caisseopen:true,
    resource_url: constants.resource_url,
    removeallproducts:1,
    checksession:false,
    bilan:{},
    userinfos:{},
    country:{},
    infomsg:{}

};

const actions = {

     FetchCustomers({commit}){

        axios.get(state.resource_url+'caisse/clients')
            .then(products => {
                console.log('clients',products.data.data);
                commit("SETCUSTOMERS",products.data.data)
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

     userinfo({commit}){

        axios.get(constants.resource_url + 'userconnected')
            .then(products => {
                console.log('clients',products);
                commit("SETUSERINFO", products)
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

    removeCatProducts({commit}, data) {
        commit("REMOVE_CAT_PRODUCTS", data);
    },

     registerCustom({commit},data){

        var userinfo = JSON.parse(localStorage.getItem('userinfo'))

        data.idorganisation = userinfo.organisationId
         axios.post(state.resource_url+data.variant,data)

            .then(customers => {

                console.log('variant',customers)

                if(customers.data.success) {

                    //objet client qui vient detre ajoute
                    commit("SETCUSTOMER", customers.data.data)
                    commit("SETSTATUS", true)
                }
            })
            .catch(function(error) {
                commit("SETSTATUS", false)
                console.log('customer_create_error',error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);
                //commit("setError", error);
                // ...

            });

    },

     addhold({commit}){

         axios.get(state.resource_url+"caisse/newhold/"+localStorage.getItem("sessioncaisse"))

            .then(holds => {
                if(holds.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETOBJETHOLD", holds.data.data)
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
     getcountry({commit}){

        axios.get(state.resource_url+"organisation")
            .then(holds => {

                if(holds.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETCOUNTRY", holds.data.data)
                    console.log('country',holds.data.data)
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

     removehold({commit},data){

        data.sessionCaisseId  = localStorage.getItem("sessioncaisse")
        axios.post(state.resource_url+"caisse/deletehold",data)

            .then(holds => {

                console.log('sucess',holds)

                if(holds.data.success) {

                    //objet client qui vient detre ajoute
                    this.statusrequete = holds.data.status
                    commit("SETSTATUSHOLD", this.statusrequete)
                    if(data.close){
                        commit("REMOVEALLPRODUCTSHOLD", 0)
                    }

                }
            })

            .catch(function(error) {
                console.log('customer_create_error',error);
            `${this.$toasted.show('error','error')}`
                //commit("setmakeToast", )

                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });
    },

     FetchSalesProducts({commit},data){

        console.log('variant',data)
        console.log('variant',data.number)

        axios.post(state.resource_url+"caisse/posales",data)

            .then(holds => {
                if(holds.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETSTATUSHOLD", holds.data.success)
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

     holdliste({commit}){

        axios.get(state.resource_url+"caisse/holdlist/"+localStorage.getItem("sessioncaisse"))
            .then(holds => {

                if(holds.data.success) {
                    //objet client qui vient detre ajoute
                    commit("SETHOLDLIST", holds.data.data)
                    console.log('holdliste',holds.data.data)
                }

                /*if(data.id==1){

                    console.log('idlistproduct',data)
                    //this.dispatch('getProductsHold',{number:(holds.data.data)[0]})

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

     SelectHolds({commit},data){


        axios.post(state.resource_url+"caisse/selecthold",
            {number:data.number,
                sessionCaisseId:localStorage.getItem("sessioncaisse")})


            .then(holds => {
                if(holds.data.success) {

                    //objet client qui vient detre ajoute
                    commit("SETSELECTHOLD", holds.data)

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

     getProductsHold({commit},data){

         console.log('log',data)
        axios.post(state.resource_url+"caisse/posaleslist",
            {number:data.holdId,
            sessionCaisseId:localStorage.getItem("sessioncaisse")})

            .then(holds => {

                if(holds.data.success) {

                    console.log('log',holds.data)
                    //objet client qui vient detre ajoute
                    commit("SETPRODUCTSHOLD", holds.data)

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

     addProductsHold({commit},data){

        axios.post(state.resource_url+"caisse/posales",

              {
                holdId:data.selecthold.holdId,
                sessionCaisseId:localStorage.getItem("sessioncaisse"),
                produitId:data.produit.produitId,
                status:1,
                reference:data.reference})

            .then(holds => {
                let test={}
                if(holds.data.success) {

                    test = holds.data.data
                    test.message = holds.data.message
                    test.statut = 0
                    test.success=true
                    console.log('est',holds.data.message)
                    //objet client qui vient detre ajoute


                }else{
                    test.message = holds.data.message
                    test.statut = 0
                    test.success=false
                    console.log('estE',holds.data.message)
                    //objet client qui vient detre ajoute

                }
                commit("SETADDPRODUCTSHOLD", test)

            })

            .catch(function(error) {
                console.log('customer_create_error',error.data);


                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(error);

                //commit("setError", error);
                // ...
            });
    },

     removeAllProductsHold({commit},data){

        //data.sessionCaisseId  = localStorage.getItem("sessioncaisse")
        axios.post(state.resource_url+"caisse/hold/refresh",data)

            .then(holds => {
                if(holds.data.success) {

                    commit("REMOVEALLPRODUCTSHOLD", 0)
                    //objet client qui vient detre ajoute

                }

            })

            .catch(function(error) {
                commit("REMOVEALLPRODUCTSHOLD", 1)
                console.log('customer_create_error',error.data);

            });
    },

     removeProductsHold({commit},data){

        axios.post(state.resource_url+"caisse/deleteposale",
              {
                sessionCaisseId:localStorage.getItem("sessioncaisse"),
                reference:data.reference})

            .then(holds => {
                if(holds.data.success) {
                    let test = {}
                    console.log('sstatus',data)
                    test = holds.data
                    test.statut = 1
                    test.reference = data.reference
                    //holds.data.status = 1
                    //objet client qui vient detre ajoute
                    commit("SETADDPRODUCTSHOLD", test)

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

     closebox({commit},data){

        axios.post(state.resource_url+"caisse/fermerSessionCaisse",
            {"sessionCaisseId":localStorage.getItem("sessioncaisse"),
                "montantFermeture":data.ouvertureAmount})

            .then(holds => {
                console.log('statusc',holds)

                if(holds.data.success) {

                    //holds.data.status = 1
                    //objet client qui vient detre ajoute
                    commit("CLOSEBOX", true)
                    //commit("CLOSEBILAN", holds.data)

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

     bilancaisse({commit},data){

         var userinfo = JSON.parse(localStorage.getItem('userinfo'))

        axios.post(state.resource_url+"operationcaisse/recap",
            {
                caissierId:userinfo.sub,
                dateDebut:"2020-10-10 09:09",
                dateFin:"2021-01-20 09:09"})

            .then(holds => {
                if(holds.data.success) {
                    let test = {}
                    console.log('sstatus',data)
                    test = holds.data
                    test.statut = 1
                    test.reference = data.reference
                    //holds.data.status = 1
                    //objet client qui vient detre ajoute
                    commit("SETADDPRODUCTSHOLD", test)

                }
            })

            .catch(function(error) {
                console.log('customer_create_error',error);
                // Handle Errors here.

            });

    },

     checksessione({commit}){

        var userinfo = JSON.parse(localStorage.getItem('userinfo'))

        axios.get(state.resource_url+"caisse/sessioncaisseexist/"+userinfo.sub)

            .then(holds => {

                if(holds.data.success) {

                    commit("CHECKSESSION", holds.data.success)

                    console.log('sel',holds.data.data.sessionCaisseId)

                    localStorage.setItem("boxopen",false)
                    localStorage.setItem("boxshow",false)


                    if(holds.data.data!=null){
                        localStorage.setItem("sessioncaisse",holds.data.data.sessionCaisseId)
                        this.dispatch('holdliste',{id:0})
                        //this.holdliste()
                    }

                    //this.holdliste({id:1})
                    //this.dispatch('holdliste',{id:1})


                }else{
                    //this.holdliste({id:0})

                    commit("CHECKSESSION", holds.data.success)

                    localStorage.setItem("boxopen",true)
                    localStorage.setItem("boxshow",true)
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

     openboxs({commit},data){

        var userinfo = JSON.parse(localStorage.getItem('userinfo'))

        axios.post(state.resource_url+"caisse/ouverturecaisse",{
            "montantOuverture":data.ouvertureAmount,
            "userId":userinfo.sub,
        })

            .then(holds => {

                if(holds.data.success) {


                    //stocker le hold id
                    state.session_caisse_id = holds.data.data.sessionCaisseId
                    //console.log('sessioncaisseid', state.session_caisse_id)
                    state.montantopen = holds.data.data.montantOuverture
                    console.log('sel1', holds.data.data.sessionCaisseId);

                    localStorage.setItem("montantopen",holds.data.data.montantOuverture)
                    localStorage.setItem("sessioncaisse",holds.data.data.sessionCaisseId)
                    localStorage.setItem("boxopen",false)
                    this.dispatch('holdliste',{id:0})

                    commit("OPENBOX", false)


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

    }

};

const getters = {

    getCustomers: state => state.clients,
    getCustomer: state => state.client,
    getStatus: state => state.status,
    getObjetHold : state=>state.objethold,
    getStatusHold : state=>state.statusrequete,
    getHoldList : state => state.holdlist,
    getSelectHold : state => state.selecthold,
    GetProductsHold : state => state.listproducts,
    MoveProductsHold : state => state.productshold,
    GetBoxOpen : state => state.boxopens,
    GetCaisseOpen : state => state.caisseopen,
    GetRemoveAllProducts : state => state.removeallproducts,
    GetCHECKSESSION : state => state.checksession,
    GETBILAN : state => state.bilan,
    GETUSERINFO : state => state.userinfos,
    GETCOUNTRY : state => state.country


}

const mutations = {
    SETCUSTOMERS: (state,clients)=>state.clients=clients,
    SETCUSTOMER: (state,client)=>state.client=client,
    SETSTATUS: (state,status)=>state.status=status,
    SETNAMECLIENT : (state,client)=>state.clientName=client,
    SETOBJETHOLD : (state,objethold)=>state.objethold=objethold,
    SETSTATUSHOLD : (state,statusrequete)=>state.statusrequete=statusrequete,
    SETHOLDLIST : (state,holdlist)=>state.holdlist=holdlist,
    SETSELECTHOLD : (state,selecthold)=>state.selecthold=selecthold,
    SETPRODUCTSHOLD : (state,productshold)=>state.listproducts=productshold,
    SETADDPRODUCTSHOLD : (state,productshold)=>state.productshold=productshold,
    CLOSEBOX : (state,val)=>state.boxopens=val,
    CLOSEBILAN : (state,val)=>state.bilan=val,
    OPENBOX : (state,val)=>state.caisseopen=val,
    REMOVEALLPRODUCTSHOLD : (state,val)=>state.removeallproducts=val,
    CHECKSESSION : (state,val)=>state.checksession=val,
    SETUSERINFO : (state,val)=>state.userinfos=val,
    SETCOUNTRY : (state,val)=>state.country=val

};


export default {
    state,getters,actions,mutations
}