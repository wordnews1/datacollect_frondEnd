<template>

  <div class="main-content">

    <b-overlay :show="openb" rounded="sm" >

      <b-modal id="openassociate" :title="$t('open_box')" hide-footer>

        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t("Associer le dossier patient d'un accidenté")}} </h5>
        </template>

        <template #default="{  }">

          <b-form-input

              v-model="valeur"
              @input="suggestionon(valeur)"
              type="text"
              :placeholder="$t('valeur')"
          ></b-form-input>

          <b-list-group v-if="filteredSuggestions.length" style="width:90%;float:inherit;position:absolute;z-index:1">

            <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                               @click="selected({item:s})">

              Cni: {{s["cni"]}}<br/>
              {{s[optionsKey]}} {{s["prenom"]}}<br/>
              Née le: {{s["dateNaiss"]}}

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

    <b-row>

      <div style="background: white;" >
        <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
          <b-col md="12">

            <div>
              <div  class="card mb-20">
                <a href="#"  @click="addaccident()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Add icon"></i> <span class="icons">{{$t('add')}}</span>
                </a>
              </div>
            </div>
            <div v-if="rowe.length<=1">
              <div class="card mb-20">
                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                <a href="#"  @click="consult()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Folder-Open icon"></i>
                  <span class="icons">{{$t('consultfolder')}}</span>
                </a>
              </div>
            </div>
            <div v-if="rowe.length<=1">
              <!--<div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
              <div class="card mb-20">
                <a href="#" @click="edit()"  class="item item-text-wrap item-button-left  taille">
                  <i class="i-File-Edit icon"></i>
                  <span class="icons">{{$t('updatepatient')}}</span>
                </a>
              </div>
            </div>

<!--            <div v-if=" rowe.length<=1 ">
              <div class="card mb-20">
                <a href="#"  @click="rowClick()" class="item item-text-wrap item-button-left  taille">
                  <i class="i-Receipt-3 icon"></i>
                  <span class="icons" >{{$t('consulter')}}</span>
                </a>
              </div>
            </div>-->


          </b-col>
        </b-row>
      </div>

      <b-col md="12" class="mb-30" style="margin-top: 3px;max-width: 89%!important">

        <b-card
            class="card   mb-30"
            header=""
            header-bg-variant="transparent">
          <b-tabs pills >
            <b-tab title="" >
              <template slot="title">
                <i class="i-Bar-Chart text-15"> </i>
              </template>
              <!--<ListGraph :name_graph="percent_visit" :datae="list_camembert" :listhisto="list_hist"></ListGraph>-->

            </b-tab>

            <b-tab title="">

              <template slot="title">
                <i class="i-Split-Four-Square-Window text-15"> </i>
              </template>
              <!-- <ListKanban :rows_kanban="list_kanban" ></ListKanban>-->

            </b-tab>


            <b-tab title="" active>

              <template slot="title">
                <i class="i-Align-Justify-All text-15"> </i>
              </template>

              <b-overlay :show="loadanotherpage" rounded="sm" >

                <ListTable :rows="list" :columns="columns" :isCLoseMenu="true" @onRowclick="rowClick"
                           :totalPage="totalPages_" :totalElement="totalElement" :links="links"
                           @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


              </b-overlay>

            </b-tab>

          </b-tabs>
        </b-card>
      </b-col>
    </b-row>

  </div>

</template>

<script>

import constants from '../../../plugins/constants'
import axios from 'axios'
import ListTable from '../components/list-table'/*
    import ListKanban from '../components/list-kanban'
    import ListGraph from '../components/list-graph'*/
import { mapGetters,mapActions } from "vuex";
// import { getRequestParams  } from '../../../plugins/functions'
export default {

  display: "Liste des Patients",
  order: 0,
  props:{
    id:String
  },

  components: {
    ListTable
  },
  mounted(){

    console.log('fetchvuelistpatient','patient')

    this.FetchVueListaccidents()

  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Patients"
  },

  computed: {
    ...mapGetters(["GetVueKanban","GetVueGraph","GETLISTACCIDENTS"]),
  },
  methods: {
    ...mapActions(["FetchVueKanban", "FetchVueGraph", "FetchVueListaccidents"]),
    makeToast(variant = null,type) {

      switch (type) {
        case 0: type="error"; break;
        case 1: type="success" ; break;
        case 2: type="info"; break;
        case 3: type="warning"; break;

      }

      this.$toasted.show((variant),{type:type})

    },
    addelement(value) {
      console.log('selected2', value)
      console.log('selected2', this.valeur)
      this.openb = true

      let soin = {
        careId: this.valeur1.item.id,
        personAccidentId: this.rowe[0].id
      };



      axios.post(constants.resource_url+'cares/join-person-accident', soin)
          .then(response =>{

            if(response.data.success){

            this.valeur=''
            this.makeToast(this.$t('added'),1)
            console.log('products_error',response);
              this.$bvModal.hide('openassociate')
            }else{
              this.makeToast(this.$t('error'),0)
            }
            this.openb = false

            //this.containerClass = 'container';
            //this.trauma={}
          }).catch(function(error) {
        console.log('products_error',error);
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(error);

        //commit("setError", error);

      });

      /*let soin = {
        care: this.folder_id,
        item: this.valeur1.item.id
      };*/
    },
    suggestionon(value) {
      this.openb = true

      console.log('suggestionon', value)
      //this.openb = true
      let params = {};
      params["name"] = value

      axios.get(constants.resource_url+'cares/search', {params})
          .then(response =>{

            this.openb = false
            this.filteredSuggestions = response.data.data

            // this.$bvModal.hide('openassociate')

            //this.containerClass = 'container';
            //this.trauma={}
          }).catch(function(error) {
        console.log('products_error',error);
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(error);

        //commit("setError", error);

      });

    },
      selected(value){

        this.filteredSuggestions = []
        this.valeur = value.item.nom + " "+value.item.prenom
        this.valeur1 = value

        console.log('selected',value)

      },
    addaccident(){

      this.$router.push({name: 'addaccident',params: { rowes:this.rowe }})

    },
    edit(){

      console.log('parames1', this.rowe);
      if(Object.keys(this.rowe).length === 0){
        this.makeToast(this.$t('Select_patient'),'error')
        return ;
      }

      this.$router.push({name: 'editaccident',params: { rowes:this.rowe[0] }})
    },
    consult(){
      console.log('parames2', this.rowe);
      if(Object.keys(this.rowe).length === 0){
        this.makeToast(this.$t('Select_patient'),'error')
        return ;
      }

      this.$router.push({name: 'detailsaccident',params: { rowes:this.rowe[0] }})

    },
    clickRow(params) {

      if(params.length>0){
        this.rowe = params
        this.rowe1 = params;
        console.log('parames', params);
      }else{
        this.rowe={}
        this.rowe1=[]
      }
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
    rowClick(params){
      this.$router.push({name: 'detailsaccident',params: { rowes:params }})
      console.log('loadpage',params)
    },

    loadpage(params){

      console.log('loadpage',params)
      this.currentpage = params
      this.loadanotherpage = true

      // this.visiteenattente(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))


    },
    associer(){

      this.$bvModal.show('openassociate')
    }
  },
  /**/
  data() {

    return {
      openb:false,
      optionsKey:"nom",
      valeur:'',
      filteredSuggestions:[],
      totalPages_:0,
      loadanotherpage:false,
      totalElement:0,
      links:[],
      list:[],
      rowe:{},
      columns:[
        {
          label: "Id ",
          field: "id",
          hidden: false,
        },
        {
          label: "Officier responsable ",
          field: "officerName",
          hidden: false,
        },
        {
          label: "Gravite des traumatismes ",
          field: "severity",
          hidden: false,
        },
        {
          label: "Place",
          field: "place",
          hidden: false,
        },
        {
          label: "Date Accident",
          field: "crashDate",
          hidden: false,
        },
        {
          label: "Status",
          field: "status",
          hidden: false,
        }




      ]
    }
  },

  watch:{

    GETLISTACCIDENTS(value){

      console.log('link',value)

      this.list = value.content;
      this.links = value.links;
      this.totalElement = value.totalElements;

      this.totalPages_ = value.totalPages;
      this.loadanotherpage = false

      console.log('typelist',this.list)


    },
  }


}
</script>
<style scoped>

.mb-30{
  margin-bottom: 10px !important;
}
tr:hover{
  cursor: pointer;
}

.taille{
  border-radius: 25px;
  width: 95px;
  height: 80px;
  font-weight: bold;
  font-family: Calibri, "Helvetica Neue", Helvetica, sans-serif;
  background: #e8eaed;
  cursor: pointer;

}
.taille:hover{
  border-radius: 25px;
  width: 95px;
  height: 80px;
  font-weight: bold;
  font-family: Calibri, "Helvetica Neue", Helvetica, sans-serif;
  background: #9fc0e7;
  cursor: pointer;

}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-70%, -100%);
  width: 10px;
  height: 10px;
  display: block;
}

.icons {
  position: relative;
  top: 50%;
  left: 50%;
  height: 50%;
  text-align: center;
  width: 50px;
  font-size: 11px;
  transform: translate(-45%, 10%);
  display: block;
}

.mb-20{
  margin-bottom:5px;
  border-radius: 25px;
}

</style>