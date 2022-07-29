import { toRefs , reactive} from "@vue/composition-api"
import axios from "axios";
import constants from '../../plugins/constants'

import { getRequestParams } from '../../plugins/functions';

//import store from '../../store/index'
const useAutocomplete = (options,key,key1) => {

    let state = reactive(
        {
        userInput: "",
        filteredSuggestions:[],
        suggestions:options,
        resource_url: constants.resource_url
        //selectedItem:{},

    })

    let deleteText = function (_item){

        console.log('eventws',_item);
        state.userInput = "";
        state.filteredSuggestions = [];
        state.selectedItem = {}

        switch(_item){
            case 'clients':
                //state.categorieproducts.clientsId = 0

                this.$store.state.categorieproducts.clientsId = ""

                break;
            case 'vendeurs':
                this.$store.state.categorieproducts.vendeursId = ""

                //state.categorieproducts.vendeursId = 0
                break;
            case 'contacts':
                this.$store.state.categorieproducts.contactsId = ""

                //state.categorieproducts.contactsId = 0
                break;

        }

    }

    let searchPartners = function (data){

        let s = data.val
        console.log('userinput',data.msg)
        console.log('userinput',state.userInput)
        switch(s){

            case 'clients':
                this.$store.state.categorieproducts.clientsId = ""
                this.$store.state.categorieproducts.nomclient = state.userInput
                console.log('userinput',state.userInput)
                break;

            case 'vendeurs':
                this.$store.state.categorieproducts.vendeursId = ""

                break;

            case 'vehicules':
                this.$store.state.cg.chassis =  state.userInput
                console.log('this.vehicules', state.userInput)
                break;

            case 'contacts':
                this.$store.state.categorieproducts.nomcontacts = state.userInput
                this.$store.state.categorieproducts.contactsId = ""
                console.log('userinput',state.userInput)
                break;

        }

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if(data.type===''){
            data.type= 'caisse'
        }

        if(data.type === 'searchcg'){

            let params={}
            params =  getRequestParams(state.userInput,1,15,this.$i18n.locale)

            this.timer = setTimeout(() => {

                axios.get(constants.resource_url+"all/visites",{params})

                    .then(customer => {

                        state.suggestions = customer.data.data.content;
                        console.log('result', state.suggestions);
                        onChange('yes')

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

                /*axios.get(state.resource_url + data.type + '/all/visites/'
                )
                    .then(customer => {

                        //
                        //commit("SETRESULTSEARCH",customer.data.data)
                        state.suggestions = customer.data.data;
                        console.log('result', state.suggestions);
                        onChange('yes')
                    })

                    .catch(function (error) {
                        console.log('products_error', error);
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // console.log(error);

                        //commit("setError", error);
                        // ...
                    });*/

            }, 1000);
        }else {

            this.timer = setTimeout(() => {
                axios.get(state.resource_url + data.type + '/search/' + data.val + '/' + state.userInput)
                    .then(customer => {

                        //commit("SETRESULTSEARCH",customer.data.data)
                        state.suggestions = customer.data.data;
                        console.log('result', state.suggestions);
                        onChange('yes')
                    })

                    .catch(function (error) {
                        console.log('products_error', error);
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // console.log(error);

                        //commit("setError", error);
                    });

            }, 1000);
        }
    }

    let onChange = function(_event){  /*_event => {*/

            console.log('event', _event);
            console.log('event', key);


            let i = state.userInput;
            //state.selectedItem = {userInput: state.userInput, item: null};

            if (i.length === 0) {
                state.filteredSuggestions = [];
                return;
            }

          var r=[]

        console.log('state', state.suggestions);
        console.log('state', key1);

            if(key1==="reference"){

                r = state.suggestions.filter(
                    suggestion => suggestion[key1].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );

            }else
            if(key1==="chassis"){

                /*console.log("setErrors", state.suggestions);
                console.log("setErrors", state.suggestions[0]);

                var vehicule = []
                vehicule[0] = state.suggestions[0].vehicule
                state.suggestions = vehicule

                console.log("setError", vehicule);*/

                r = state.suggestions.filter(
                    suggestion => suggestion[key1].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );

            }else if(key1==="proprietaire"){

               // var partenaires = []
                /*state.suggestions.forEach((entry,index) => {

                    partenaires[index] = entry.partenaire
                });


                state.suggestions = partenaires*/


                r = state.suggestions.filter(
                    suggestion => suggestion[key].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );

        }else{

                r = state.suggestions.filter(
                    suggestion => suggestion[key].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );
            }
            console.log("setError", r);



            state.filteredSuggestions = r

    }

    let selected = function (data){

        let s = data.msg

        let _item = data.item
        console.log('click',data.item);

        state.userInput = _item[key] + "  " +_item[key1] ;
        state.filteredSuggestions = [];
        state.filteredSuggestions = [];
        //state.selectedItem = {userInput:state.userInput,item:s}
        this.$emit("save-change",data);


        switch(s){
            case 'clients':
                this.$store.state.categorieproducts.clientsId = _item["clientId"]
                this.$store.state.categorieproducts.contacclt = _item["nom"]+" "+_item["prenom"]
                //dispatch('updateClientsId', {'clientid':_item["clientId"]})
                console.log('clientsId', _item["clientId"]);
                break;
            case 'reference':
                state.suggestions.msg = key1
                this.$emit("save-change",data);
                console.log('clientsId', state.suggestions.msg);

                break;
            case 'vendeurs':
                this.$store.state.categorieproducts.vendeursId = _item["vendeurId"]
                console.log('vendeursId', state.vendeursId);
                break;
            case 'contacts':
                this.$store.state.categorieproducts.contactsId = _item["contactId"]
                //state.contactsId = _item["clientId"]
                console.log('contactsId', _item["contactId"]);

                console.log('contactsId', this.$store.state.categorieproducts.contactsId);
                break;
            case 'vehicules':
                state.userInput = _item["chassis"]  ;
                this.$store.state.categorieproducts.vehicules = _item["chassis"]
                this.$emit('register',_item)
                break;
            case 'proprietaires':
                state.userInput = _item["nom"] +  " "+ _item["prenom"] ;
                //state.categorieproducts.vehicules = _item["chassis"]
                this.$emit('register',_item)
                break;

        }


    }

    let selects = function(data){

        state.userInput = data
        console.log('hellohello', data);



    }



    return {
        ...toRefs(state),
        selected,
        selects,
        searchPartners,
        deleteText,
        state
    };

}

export default  useAutocomplete;