<template>
<!--  <b-overlay :show="show" rounded="xl">-->
<div>

  <b-modal scrollable no-close-on-backdrop   id="visualise" size="lg" hide-footer>

    <vue-html2pdf
        :show-layout="true"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="297"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="793px"
        ref="html2Pdf"
    >

      <section slot="pdf-content">

    <b-card no-body style="size: A4">


      <b-card-body >
        <b-row>
          <b-col md="5" style="justify-content: center">
            REPUBLIQUE DU CAMEROUN <br>
            PRESIDENCE DE LA REPUBLIQUE <br>
            DELEGATION GENERALE A LA SURETE NATIONALE <br>
            SECRETARIAT GENERAL <br>
            DIRECTION DE LA SECURITE <br>
            SOUS DIRECTION DE LA VOIE PUBLIQUE ET DE LA CIRCULATION<br>
          </b-col>
          <b-col md="2">
            <img src="src/assets/logo.png" alt="logopolice"/>
          </b-col>
          <b-col md="5">
            REPUBLIC OF CAMEROUN<br>
            PRESIDENCY OF THE REPUBLIC<br>
            GENERAL DELEGATION FOR NATIONAL SECURITY<br>
            GENERAL SECRETARY<br>
            DEPARTMENT OF PUBLIC SECURITY<br>
            SUB DEPARTMENT OF THE PUBLIC HIGHWAY AND CIRCULATION<br>
          </b-col>
        </b-row>
        <br/>
        <br/>
        <b-row>

          <b-form-group
              class="col-md-4 mb-30"
              :label="$t('Id Accident')"
              label-for="input-1"
          >
            <b-form-input
                class="noborder"
                v-model="idacc"
                type="text"

            ></b-form-input>

          </b-form-group>

          <b-form-group
              class="col-md-4 mb-30"
              :label="$t('crashacc')"
              label-for="input-1"

          >

            <b-form-input
                class="noborder"
                v-model="crashacc"
                type="text"

            ></b-form-input>

            <!--
            <date-picker  v-model="crashacc" format="YYYY-MM-DD"
            valueType="YYYY-MM-DD" ></date-picker>
            -->

          </b-form-group>
          <b-form-group
              class="col-md-4 mb-30"
              :label="$t('crashouracc')"
              label-for="input-1"
          >
            <b-form-input
                class="noborder"
                v-model="crashouracc"
                type="text"
                required

            ></b-form-input>

          </b-form-group>

          <br/>
          <br/>

          <div  class="col-md-12" style="margin-left: 15px">
            <label style="font-size: 18px">Nous,</label> {{nous}}
          </div><br/>
          <div  class="col-md-12" style="margin-left: 15px">
            <label style="font-size: 18px">Assiste De:</label> {{assiste}}
          </div><br/>
          <div class="col-md-12" style="margin-left: 15px">
            <label style="font-size: 18px">Avons constate accident:</label> {{constate}}
          </div><br/>
          <div  class="col-md-12" style="margin-left: 15px">
            <label style="font-size: 18px">De la circulation survenu: </label> {{circulation}}
          </div><br/>

        </b-row>


      </b-card-body>
      <b-row style="display: block;margin: 0 auto">
        <img v-bind:src="image" />
      </b-row>


    </b-card>

      </section>

    </vue-html2pdf>

    <b-button style="float: right;margin-right: 10px" @click="generateReport">Enregistrer</b-button>

  </b-modal>

  <b-modal scrollable no-close-on-backdrop   id="opencroquis" size="lg" hide-footer>

    <template >

      <div class="container" >
        <VueSignaturePad width="1000px" id="signature" height="346px" ref="signaturePad"
                         :options="{penColor: pencolor,
              onBegin: () => {$refs.signaturePad.resizeCanvas()},
                                      }" />

        <div class="buttons">
          <b-button style="float: left;margin-left: 10px" @click="hideModal"><i class="i-Pen-2"/>Annuler</b-button>
          <b-button @click="undo">Undo</b-button>
          <b-button @click="save">Save</b-button>
          <b-button @click="change"><i class="i-Eraser-2"></i></b-button>
          <b-button @click="resume"><i class="i-Pen-2"/></b-button>
          <b-button style="float: right;margin-right: 10px" @click="saveimage">Enregistrer</b-button>
        </div>

      </div>
    </template>
  </b-modal>

    <b-modal   scrollable :title="$t('croquis')"  id="opencroquis1" size="xl" hide-footer>

      <b-overlay :show="openb" >
        <div>


            <VueSignaturePad id="signature"  ref="signaturePad"
                             :options="{penColor: pencolor,
              onBegin: () => {$refs.signaturePad.resizeCanvas()},
                                      }" />
          <div class="buttons">
            <b-button style="float: left;margin-left: 10px" @click="hideModal">Annuler</b-button>

            <b-button @click="undo">Undo</b-button>
            <b-button @click="save">Save</b-button>
            <b-button @click="change"><i class="i-Eraser-2"></i></b-button>
            <b-button @click="resume"><i class="i-Pen-2"/></b-button>

            <b-button style="float: right;margin-right: 10px" @click="saveimage">Enregistrer</b-button>
          </div>

        <b-row>

           <b-form-group
               class="col-md-3 mb-30"
               :label="$t('Profil de la Route')"
               label-for="input-1"
           >

<!--             <b-form-select v-model="person.roadType">
               <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
               <option v-for="option in respdata.personRoadTypeResp" :value="option.id" :key="option.id">
                 {{ option.value }}
               </option>
             </b-form-select>-->

           </b-form-group>
           <b-form-group
               class="col-md-3 mb-30"
               :label="$t('Etat de la chaussée')"
               label-for="input-1"
           >

<!--             <b-form-select v-model="data.roadState">
               <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
               <option v-for="option in respdata.roadStateResp" :value="option.id" :key="option.id">
                 {{ option.value }}
               </option>
             </b-form-select>-->


           </b-form-group>
           <b-form-group
               class="col-md-3 mb-30"
               :label="$t('Visibilité')"
               label-for="input-1"
           >

<!--             <b-form-select v-model="data.brightnessCondition">
               <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
               <option v-for="option in respdata.brightnessConditionResp" :value="option.id" :key="option.id">
                 {{ option.value }}
               </option>
             </b-form-select>-->

           </b-form-group>

          <b-form-group
              class="col-md-3 mb-30"
              :label="$t('Météo')"
              label-for="input-1"
          >

<!--            <b-form-select v-model="data.climaticCondition">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.climaticConditionResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>-->

          </b-form-group>





         </b-row>

        </div>
      </b-overlay>
    </b-modal>

    <b-form :aria-hidden="show ? 'true' : null" @submit.prevent="submitedit">


        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('Procès verbal')}}</b-button>
          </b-card-header>

            <b-card-body>
              <b-row>

                <b-form-group
                    class="col-md-4 mb-30"
                    :label="$t('Id Accident')"
                    label-for="input-1"
                >
                  <b-form-input

                      v-model="idacc"
                      type="text"
                      disabled
                  ></b-form-input>

                </b-form-group>

                <b-form-group
                    class="col-md-4 mb-30"
                    :label="$t('crashacc')"
                    label-for="input-1"

                >

                  <b-form-input

                      v-model="crashacc"
                      type="text"
                      disabled
                  ></b-form-input>

<!--
                  <date-picker disabled v-model="crashacc" format="YYYY-MM-DD"  valueType="YYYY-MM-DD" ></date-picker>
-->

                </b-form-group>
                <b-form-group
                    class="col-md-4 mb-30"
                    :label="$t('crashouracc')"
                    label-for="input-1"
                >
                  <b-form-input

                      v-model="crashouracc"
                      type="text"
                      disabled
                  ></b-form-input>

                </b-form-group>

                <b-form-group
                    class="col-md-12 mb-30"
                    :label="$t('Patrouille')"
                    label-for="input-1"
                >
                  <b-form-input


                      v-model="patrouille"
                      type="text"
                      required
                      :placeholder="$t('Patrouille')"
                  ></b-form-input>

                </b-form-group>

                <b-form-group
                    class="col-md-12 mb-30"
                    :label="$t('Nous :')"
                    label-for="input-1"
                >
                  <b-form-textarea
                      id="textarea"
                      v-model="nous"
                      placeholder="ecrivez ici..."
                      rows="3"
                      required
                      max-rows="6"
                  ></b-form-textarea>


                </b-form-group>


                <b-form-group
                    class="col-md-12 mb-30"
                    :label="$t('Assiste De: ')"
                    label-for="input-1"
                >
                  <b-form-textarea
                      id="textarea"
                      v-model="assiste"
                      placeholder="ecrivez ici..."
                      rows="3"
                      required
                      max-rows="6"
                  ></b-form-textarea>
                </b-form-group>

                <b-form-group
                    class="col-md-12 mb-30"
                    :label="$t('Avons constate Accident: ')"
                    label-for="input-1"
                >
                  <b-form-textarea
                      id="textarea"
                      v-model="constate"
                      required
                      placeholder="ecrivez ici..."
                      rows="3"
                      max-rows="6"
                  ></b-form-textarea>

                </b-form-group>

                <b-form-group
                    class="col-md-12 mb-30"
                    :label="$t('De la circulation survenu: ')"
                    label-for="input-1"
                >

                  <b-form-textarea
                      required
                      id="textarea"
                      v-model="circulation"
                      placeholder="ecrivez ici..."
                      rows="3"
                      max-rows="6"

                  ></b-form-textarea>


                </b-form-group>


              </b-row>

            </b-card-body>


        </b-card>

      <p></p>

      <b-col md="12">
        <b-button class="mt-3" type="submit" style="float:right" variant="primary">Enregistrer</b-button>

      </b-col>

    </b-form>

<!--  </b-overlay>-->
</div>

</template>

<script>

import constants from '../../../plugins/constants'
import VueHtml2pdf from 'vue-html2pdf'
//import ListTable from '../components/List-table2'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
// import partnersVue from "../partners/list"
import axios from 'axios'
//import Croquis from '../accident/croquis'
import { mapGetters,mapActions } from "vuex";
export default {

  name:"dossierpatient",
  props:{
    rowes:Array
  },

  components: {
    VueHtml2pdf
  },
  mounted(){



    console.log('rowe',this.rowes)
    console.log('rowe1',typeof this.rowes)
    console.log('rowe1',typeof this.rowes=='undefined')
    //this.ListDossierPatient(9)

    if(typeof this.rowes === "undefined"){

      console.log('rowe1',JSON.parse(localStorage.getItem('infospv')))

      this.data = JSON.parse(localStorage.getItem('infospv'))
      console.log('rowe1',this.data.id)

      this.idacc = this.data.idacc
      this.crashacc = this.data.crashacc
      this.crashouracc = this.data.crashouracc
      this.patrouille = this.data.patrouille
      this.nous = this.data.nous
      this.assiste = this.data.assiste
      this.avons = this.data.avons
      this.constate = this.data.constate
      this.circulation = this.data.circulation

    }else{
      console.log('rowe2',this.idacc)

      this.idacc = this.rowes[0].id
      this.crashacc = this.rowes[0].crashDate
      this.crashouracc = this.rowes[0].crashTime
    }




  },
  data() {
    return {
      data:{},
      options: {
        penColor: "#000000",
      },
      pencolor:"#000000",
      idacc:0,
      crashacc:'',
      crashouracc:'',
      patrouille:'',
      nous:'',
      assiste:'',
      constate:'',
      circulation:'',
      valeur:'',
      valeur1:{},
      filteredSuggestions:[],
      type:"",
      optionsKey:"name",
      optionsKey1:"prenom",
      totalPagesoin_:0,
      loadanotherpage:false,
      totalElementsoin:0,
      linksoin:[],
      contacts:[],
      contact:{},
      image:"",

      tst:true,
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
    ...mapGetters(["GetListDossier","GETUPDATEPATIENTS"]),
  },
  methods:{

    ...mapActions(["ListDossierPatient","UpdatePatients"]),
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    hideModal() {
      this.$bvmodal.hide('opencroquis')
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      alert("Open DevTools see the save data.");
      console.log(isEmpty);
      console.log(data);
    },
    change() {
      /* this.options = {
         penColor: "#ffffff",
       };*/
      console.log('change','change')
      this.pencolor = "#ffffff"
    },
    resume() {
      /*this.options = {
        penColor: "#000000",
      };*/
      this.pencolor = "#000000"
    },
    saveimage(){
      console.log('image')
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      this.image = data
      console.log('image',data);

    },
    addcroquis(){
      console.log('click','click')
      //this.$bvModal.show('opencroquis')

      this.data.idacc = this.idacc
      this.data.crashacc = this.crashacc
      this.data.crashouracc = this.crashouracc

      this.data.patrouille = this.patrouille
      this.data.nous = this.nous
      this.data.assiste = this.assiste
      this.data.avons = this.avons
      this.data.constate = this.constate
      this.data.circulation = this.circulation

      localStorage.setItem('infospv',JSON.stringify(this.data))

      this.$router.push({ name: 'croquis',params: { rowes:this.data }})

    },
    onEditClick(params){

      switch(params.types) {
        case 'contact':
          this.contact = params
          this.$bvModal.show('opencontacts1')

          break;

      }
    },
    checkId(obj, id) {

      return obj.map(function(item) { return item.id; }).indexOf(id);

    },
    removelist(contact,indexIds){
      contact.splice(indexIds, 1);
      contact.sort();
    },
    submitcontact(){

      this.$bvModal.hide('opencontacts')
      this.contacts.push(this.contact)
      this.contact={}
      this.makeToast(this.$t('added'),1)
    },

    addcontact(){
      this.$bvModal.show('opencontacts')
    },
    submitedit(){


      this.data.idaccident = this.idacc
      this.data.patrouille = this.patrouille
      this.data.nous = this.nous
      this.data.assiste = this.assiste
      this.data.constate = this.constate
      this.data.circulation = this.circulation
      this.data.reportId = 0

      axios.post(constants.resource_url+'accidents/send-report',this.data,
          {
            headers: {
              'Content-Type': 'application/json'
            }}
      )
          .then(list => {

            if(list.data.success){

             // this.$bvModal.show('visualise')
              this.makeToast(this.$t('les Informations du Proces Verbal ajoutés avec succèss'),1)
              this.$router.push({name: 'accidents'})

            }else{
              this.makeToast(this.$t('erreur lors de l\'ajout de l\'image'),0)
            }

          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });



    },
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

                if(response.data.success){
                  this.openb = false
                  this.valeur=''
                  this.makeToast(this.$t('added'),1)
                  console.log('products_error',response);
                  //this.listexamen.push(response.data.data.exams[response.data.data.exams.length-1])
                  //this.listexamen=response.data.data.exams
                  this.listexamen.push(this.valeur1.item)
                 // this.$bvModal.hide('confirmopenAccount')
                }else{
                  this.makeToast(this.$t('error'),0)
                }

                //this.listexamen.push(response.data.data.exams)
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
                if(response.data.success){
                  this.valeur=''
                  this.makeToast(this.$t('added'),1)
                  // console.log('products_error1',response.data.data.treatments[response.data.data.treatments.length-1]);

                  //this.listsoin.push(response.data.data.treatments[response.data.data.treatments.length-1])
                  //this.listsoin=response.data.data.treatments
                  console.log('products_error1',this.valeur1.item);
                  this.valeur.item.date = this.getdate()
                  this.listsoin.push(this.valeur1.item)


                  //this.$bvModal.hide('confirmopenAccount')
                  this.openb = false
                }else{
                  this.makeToast(this.$t('error'),0)
                }

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
                if(response.data.success){

                  this.makeToast(this.$t('added'),1)
                  console.log('products_error',response);
                  this.openb = false
                  this.valeur=''

                  //this.listrauma.push(response.data.data.injuries[response.data.data.injuries.length-1])
                  //this.listrauma=response.data.data.injuries
                  this.listrauma.push(this.valeur1.item)
                  //this.$bvModal.hide('confirmopenAccount')

                }else{
                  this.makeToast(this.$t('error'),0)
                }



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
    getdate(){
      let date = new Date().toLocaleString()
      let date1 = date.split(",")
      let date2 = date1.split(" ")
      console.log('date',date1[0] + date2[0])

      return date1[0] + date2[0]
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
      switch(params.types){
        case 'contact':
          console.log('checkid',this.checkId(this.contacts,params.id))

          this.removelist(this.contacts,this.checkId(this.contacts,params.id))
          this.loadanotherpage = false
          break;
        case 'examen':

          axios.post(constants.resource_url+'cares/remove-exam', soin)
              .then(response =>{
                console.log('products_error',response);
                // this.listexamen = response.data.data.exams;
                this.removelist(this.listexamen,this.checkId(this.listexamen,soin.item))
                this.loadanotherpage = false

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
                console.log('checkid',response+ ' '+this.checkId(this.listsoin,params.id))
                this.removelist(this.listsoin,this.checkId(this.listsoin,soin.item))
                //this.listsoin = response.data.data.treatments;
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

                console.log('products_error',response);
                this.removelist(this.listrauma,this.checkId(this.listrauma,soin.item))

                //this.listrauma = response.data.data.injuries;
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
      this.phone = data.telephone!=null?data.telephone:'pas renseigne'
      this.birthday = data.dateNaiss!=null?data.dateNaiss:'pas renseigne'
      this.passport = data.passport!=null?data.passport:'pas renseigne'
      this.permi_de_conduire = data.permis!=null?data.permis:'pas renseigne'
      this.personGender = data.gender!=null?data.gender:'pas renseigne'

      this.poids = data.parametre.poids!=null?data.parametre.poids:'pas renseigne'
      this.tension = data.parametre.tension!=null?data.parametre.tension:'pas renseigne'
      this.pouls = data.parametre.pouls!=null?data.parametre.pouls:'pas renseigne'
      this.temperature = data.parametre.temperature!=null?data.parametre.temperature:'pas renseigne'
      this.crashacc = data.crashDate!=null?data.crashDate:'pas renseigne'
      this.listsoin = data.treatments
      this.listexamen = data.exams
      this.listrauma = data.injuries
      this.contacts = data.contacts

      this.checkedNames = data.parametre.params

      this.ashtme = this.checkedNames.some(data => data === 'ashtme')
      this.cardiaque = this.checkedNames.some(data => data === 'cardiaque')
      this.hypertension = this.checkedNames.some(data => data === 'hypertension')
      this.epilepsie = this.checkedNames.some(data => data === 'epilepsie')
      this.diabete = this.checkedNames.some(data => data === 'diabete')
      this.cancer = this.checkedNames.some(data => data === 'cancer')


      this.consumalcohol  = data.accparams.consumalcohol=='oui'?true:false;
      this.consumalcohols  = data.accparams.consumalcohol=='non'?true:false;

      this.consumdrugs  = data.accparams.consumdrugs=='oui'?true:false;

      this.persontrauma  = data.accparams.persontrauma;

      this.consumdrugse  = data.accparams.consumdrugs=='non'?true:false;

    },
    GETUPDATEPATIENTS(data){
      this.show = !this.show
      console.log('GETUPDATEPATIENTS',data)

      this.$router.push({name: 'hospital',params: { rowes:0 }})
    }

  }
  ,
}

</script>
<style >
.right_header {
  color: #fff;
  margin-left: 30%;
}
.noborder {
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
}

.modal-fullscreen .modal-dialog {
  max-width: 100%;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 100000;
}
.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
/*#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
  radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}*/

</style>
 