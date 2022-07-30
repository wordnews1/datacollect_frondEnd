<template>

  <b-overlay :show="show" rounded="sm">

    <b-overlay :show="openb" rounded="sm" >

      <b-modal id="confirmopenAccount" :title="$t('open_box')" hide-footer>

        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t('Ajouter')}} </h5>
        </template>

        <template #default="{  }">

          <b-form-input

              v-model="valeur"
              @input="suggestionon(valeur)"
              type="text"
              :placeholder="$t('valeur')"
          ></b-form-input>

          <b-list-group v-if="filteredSuggestions.length" style="float:inherit;position:absolute;z-index:1">

            <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                               @click="selected({item:s})">
              {{s[optionsKey]}}

            </b-list-group-item>

          </b-list-group>

          <p></p>
          <div style="text-align: right">
            <b-button @click="addelement()" variant="outline-success" style="margin-right: 15px">
              {{$t('ajouter')}}</b-button>
          </div>

        </template>

      </b-modal>

    </b-overlay>

    <b-form :aria-hidden="show ? 'true' : null" >

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('route')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col md="6">
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('cnis')"
                      label-for="input-1"
                  >

                    <b-form-input disabled

                                  v-model.trim="$v.cni.$model"
                                  type="number"
                                  :placeholder="$t('cni')"
                    ></b-form-input>

                    <b-alert
                        show
                        variant="danger"
                        class="error col-md-12 mt-1"
                        v-if="!$v.cni.minLength"
                    >{{$t('validator_cni')}}
                      {{ $v.cni.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                    >

                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('prenom_label')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="prenom"
                        type="text"
                        :placeholder="$t('prenom')"
                    ></b-form-input>

                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('birthday')"
                      label-for="input-1"
                  >
                    <b-form-datepicker id="example-datepicker"  v-model="birthday" class="mb-2"></b-form-datepicker>

                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('permi')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="permi_de_conduire"
                        type="number"
                        :placeholder="$t('permis')"
                    ></b-form-input>

                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('nom_label')"
                      label-for="input-1"
                  >

                    <b-form-input
                        disabled

                        v-model.trim="$v.nom.$model"
                        type="text"
                        :placeholder="$t('prooftag')"
                    ></b-form-input>
                    <b-alert
                        show
                        variant="danger"
                        class="error col-md-12 mt-1"
                        v-if="!$v.nom.minLength"
                    >{{$t('validator_nom')}}
                      {{ $v.nom.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                    >


                  </b-form-group>
                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('tel')"
                      label-for="input-1"
                  >
                    <b-form-input

                        v-model="phone"
                        disabled
                        type="number"
                        :placeholder="$t('tels')"
                    ></b-form-input>

                    <b-alert
                        show
                        variant="danger"
                        class="error col-md-12 mt-1"
                        v-if="!$v.phone.minLength"
                    >{{$t('validator_phone')}}
                      {{ $v.phone.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                    >
                    <b-alert
                        show
                        variant="danger"
                        class="error col-md-12 mt-1"
                        v-if="!$v.phone.maxLength"
                    >{{$t('validator_phone_max')}}
                      {{ $v.phone.$params.maxLength.max }} {{$t('letters')}}  .</b-alert
                    >

                  </b-form-group>





                  <b-form-group
                      class="col-md-12 mb-30"
                      :label="$t('passports')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="passport"
                        type="number"
                        :placeholder="$t('passport')"
                    ></b-form-input>

                  </b-form-group>
                  <label>Sexe: </label>
                  <b-form-select
                      :label="$t('sexe')"
                      id="sexe"
                      name="personGender"
                      v-model="personGender"
                  >

                    <option value="0">
                      Homme
                    </option>

                    <option value="1">
                      Femme
                    </option>

                  </b-form-select>
                </b-col>
              </b-row>



            </b-card-body>
          </b-collapse>

        </b-card>
      </div>
      <p></p>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
              {{$t('accidentés')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'soins'" :rows="listsoin" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
                               :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                               @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                  </b-overlay>
                </b-col>
              </b-row>
              <br/>

            </b-card-body>
          </b-collapse>


        </b-card>
        <p></p>

      </div>

      <p></p>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-7 variant="transparent">
              {{$t('véhicules')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-7" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>


                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'examen'" @onRowclick="onRowclick" :rows="listexamen" :columns="columnexamen" :isCLoseMenu="true"
                               :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                               @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                  </b-overlay>
                </b-col>
              </b-row>
              <br/>

            </b-card-body>
          </b-collapse>


        </b-card>
        <p></p>

      </div>
      <p></p>


    </b-form>
  </b-overlay>

</template>

<script>

import constants from '../../../plugins/constants'
import ListTable from '../components/List-table2'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
// import partnersVue from "../partners/list"
import axios from 'axios'
import { mapGetters,mapActions } from "vuex";
export default {

  name:"dossierpatient",
  props:{
    rowes:Array
  },

  components: {
    ListTable
  },
  mounted(){
    console.log('rowe',this.rowes)
    //this.ListDossierPatient(this.rowes[0].id)
    this.ListDossierPatient(9)
    this.folder_id = 9

  },
  data() {
    return {
      valeur:'',
      valeur1:{},
      filteredSuggestions:[],
      type:"",
      optionsKey:"name",
      optionsKey1:"prenom",
      folder_id:0,
      checkEx2Options : [
        {item: 'oui', name: 'Oui'},
        {item: 'non', name: 'Non'}
      ],
      crashacc:'',
      listsoin:[],
      listexamen:[],
      listrauma:[],
      totalPagesoin_:0,
      loadanotherpage:false,
      totalElementsoin:0,
      linksoin:[],
      columnexamen:[
        {
          label: "Id",
          field: "id",
          hidden: false,
        },
        {
          label: "Name",
          field: "name",
          hidden: false,
        }
        ,{
          label: "actions",
          field: "actions",
          hidden: false,
          html: true,
        }

      ],
      columnoins:[

        {
          label: "Id",
          field: "id",
          hidden: false,
        },
        {
          label: "Name",
          field: "name",
          hidden: false,
        },
        {
          label: "Price",
          field: "price",
          hidden: false,
        },                    {

          label: "Number",
          field: "number",
          hidden: false,
        },
        {
          label: "actions",
          field: "actions",
          hidden: false,
          html: true,
        }
      ],
      consumalcohol:'',
      consumdrugs:'',
      personGender:'',
      checkedNames:[],
      poids:'',
      temperature:'',
      tension:'',
      pouls:'',

      rout:false,
      content:"",
      submitStatus: null,
      cni:'',
      nom: '',
      prenom: '',
      phone: '',
      status: false,
      birthday:null,
      passport:'',
      permi_de_conduire:'',
      show: false,
      countrys:["Afghanistan","Cameroun"],
      towns:["Douala","Yaounde"]
    }
  },
  openb:false,
  validations: {
    cni: {
      required,
      minLength: minLength(9)
    },
    nom: {
      required,
      minLength: minLength(4)
    },
    phone: {
      required,
      minLength: minLength(9),
      maxLength: maxLength(9)
    },
  },
  computed: {
    ...mapGetters(["GetListDossier"]),
  },
  methods:{

    ...mapActions(["ListDossierPatient"]),
    selected(value){
      this.filteredSuggestions = []
      this.valeur = value.item.name
      this.valeur1 = value

      console.log('selected',value)
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
    addelement(value){
      console.log('selected2',value)
      console.log('selected2',this.valeur)
      this.openb=true
      let soin = {
        care: this.folder_id,
        item: this.valeur1.item.id
      };
      switch(this.type){

        case 'examen':

          axios.post(constants.resource_url+'cares/add-exam', soin)
              .then(response =>{

                this.openb = false
                this.valeur=''
                this.makeToast(this.$t('added'),1)
                console.log('products_error',response);
                this.listexamen.push(response.data.data.exams)
                //this.containerClass = 'container';
                //this.trauma={}
              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          }); break;
        case 'soins':

          axios.post(constants.resource_url+'cares/add-treatment', soin)
              .then(response =>{
                this.valeur=''
                this.makeToast(this.$t('added'),1)
                console.log('products_error',response);
                //this.trauma={}
                this.openb = false
              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          });break;
        case 'traumatisme':
          axios.post(constants.resource_url+'cares/add-injury', soin)
              .then(response =>{
                this.makeToast(this.$t('added'),1)
                console.log('products_error',response);
                this.openb = false
                this.valeur=''
                this.listrauma.push(response.data.data.injuries)

              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          });break;
      }
    },
    suggestionon(value){
      console.log('suggestionon',value)
      //this.openb = true
      let params = {};
      params["name"] = value
      switch(this.type){

        case 'examen':

          axios.get(constants.resource_url+'examinations/search', {params})
              .then(response =>{

                this.loadanotherpage = false
                this.filteredSuggestions = response.data.data
                //this.containerClass = 'container';
                //this.trauma={}
              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          }); break;
        case 'soins':

          axios.get(constants.resource_url+'treatments/search', {params})
              .then(response =>{
                this.filteredSuggestions = response.data.data
                //this.containerClass = 'container';
                //this.trauma={}
                this.openb = false
              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          });break;
        case 'traumatisme':
          axios.get(constants.resource_url+'injuries/search', {params})
              .then(response =>{
                this.filteredSuggestions = response.data.data
                this.openb = false

              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          });break;
      }

    },
    savechange(data) {

      console.log('savechange', data);
    },
    openmodalbox(value){

      this.type=value
      console.log('savechange', value);
      this.$bvModal.show('confirmopenAccount')
    },
    onRowclick(params){
      this.loadanotherpage = true
      let soin = {
        care: this.folder_id,
        item: params.id
      };
      switch(params.type){
        case 'examen':

          axios.post(constants.resource_url+'cares/remove-exam', soin)
              .then(response =>{
                this.listexamen = response.data.data.exams;
                this.loadanotherpage = false
                //this.containerClass = 'container';
                //this.trauma={}
              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          }); break;
        case 'soins':

          axios.post(constants.resource_url+'cares/remove-treatment', soin)
              .then(response =>{
                this.listsoin = response.data.data.treatments;
                //this.containerClass = 'container';
                //this.trauma={}
                this.loadanotherpage = false
              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          });break;
        case 'trauma':
          axios.post(constants.resource_url+'cares/remove-injury', soin)
              .then(response =>{
                this.listrauma = response.data.data.injuries;
                this.containerClass = 'container';
                this.trauma={}
                this.loadanotherpage = false

              }).catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error);

            //commit("setError", error);

          });break;

      }
      console.log('paramis',params)

    },
    editProps(params){

      console.log('params',params)
    },
    deleteProps(params){

      /* this.$bvModal.show('confirmdelete')
       this.idd = params.formattedRow.id*/

      console.log('params', params+'params.formattedRow.id');
    },
    deleteprop(){

      //   this.$bvModal.hide('confirmdelete')
      console.log('params','this.idd')

    },

    loadpage(params){

      console.log('loadpage',params)


    },
    clickRow(){
      console.log('loadpage','')
    },
    selectionChanged(){
      console.log('loadpage','')
    },



    makeToastTwo(variant = null) {
      console.log('Successfully Submitted')

      this.$bvToast.toast("Successfully Submitted", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
  },
  watch:{
    GetListDossier(data){
      console.log('data',data)
      this.cni = data.cni!=null?data.cni:'pas renseigne'
      this.nom = data.nom!=null?data.nom:'pas renseigne'
      this.prenom = data.prenom!=null?data.prenom:'pas renseigne'
      this.telephone = data.telephone!=null?data.telephone:'pas renseigne'
      this.birthday = data.dateNaiss!=null?data.dateNaiss:'pas renseigne'
      this.passport = data.passport!=null?data.passport:'pas renseigne'
      this.permis = data.permis!=null?data.permis:'pas renseigne'
      this.personGender = data.gender!=null?data.gender:'pas renseigne'

      this.poids = data.poids!=null?data.poids:'pas renseigne'
      this.tension = data.tension!=null?data.tension:'pas renseigne'
      this.pouls = data.pouls!=null?data.pouls:'pas renseigne'
      this.temperature = data.temperature!=null?data.temperature:'pas renseigne'
      this.crashacc = data.crashDate!=null?data.crashDate:'pas renseigne'
      this.listsoin = data.treatments
      this.listexamen = data.exams
      this.listrauma = data.injuries
    }

  }
  ,
}

</script>
<style scoped >
.cursor-pointer {
  cursor: pointer;
}

.form-control{
  font-size: 0.8rem!important;
}
.custom-select{
  height: calc(2rem )!important;
}
select.form-control{
  height: calc(2rem )!important;
}
.form-group{
  margin-bottom:0.1rem
}
</style>