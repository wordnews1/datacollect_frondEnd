<template>

    <div class="main-content">

        <b-row>

            <div style="background: white;" >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div>
                            <div  class="card mb-20">
                                <a href="#"  @click="addpatient()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Add icon"></i> <span class="icons">{{$t('add')}}</span>
                                </a>
                            </div>
                        </div>

                       <!-- <div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
                        <div v-if="rowe.length<=1">
                            <div class="card mb-20">
                          <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                                <a href="#"  @click="consult()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Folder-Open icon"></i>
                                    <span class="icons">{{$t('consultfolder')}}</span>
                                </a>
                            </div>
                        </div>

                        <!--<div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
                        <div v-if="rowe.length<=1">
                            <!--<div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                            <div class="card mb-20">
                                <a href="#" @click="edit()"  class="item item-text-wrap item-button-left  taille">
                                    <i class="i-File-Edit icon"></i>
                                    <span class="icons">{{$t('updatepatient')}}</span>
                                </a>
                            </div>
                        </div>
                        <!--<div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
<!--                        <div v-if="rowe.length>=1">
                            &lt;!&ndash;<div v-if=" checkArray(roles,controleur)" class="card mb-20">&ndash;&gt;
                            <div class="card mb-20">

                                <a href="#" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Folder-Archive icon"></i>
                                    <span class="icons">{{$t('archivpatient')}}</span>
                                </a>
                             </div>
                        </div>-->
                        <!--<div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
<!--                            <div v-if="rowe.length>=1">
                            &lt;!&ndash;<div v-if=" checkArray(roles,controleur)" class="card mb-20">&ndash;&gt;
                                <div class="card mb-20">
                                    <a href="#" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Edit icon"></i>
                                        <span class="icons">{{$t('updatestatuspatient')}}</span>
                                    </a>

                                </div>
                        </div>-->
                      <div v-if="rowe.length<=1 && rowe[0].status!=='CLOSED'">
                        <div class="card mb-20">
                          <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                          <a href="#"  @click="closes()" class="item item-text-wrap item-button-left  taille">
                            <i class="i-Close icon"></i>
                            <span class="icons">{{$t('close')}}</span>
                          </a>
                        </div>
                      </div>
                      <div v-if="rowe.length<=1 && rowe[0].status=='CLOSED'">
                        <div class="card mb-20">
                          <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                          <a href="#"  @click="billing()" class="item item-text-wrap item-button-left  taille">
                            <i class="i-Billing icon"></i>
                            <span class="icons">{{$t('facture')}}</span>
                          </a>
                        </div>
                      </div>







                    </b-col>
                </b-row>
            </div>

            <b-col md="12" class="mb-30" style="margin-top: 3px;max-width: 89%!important">

                <b-card
                        class="card mb-30"
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

                                <ListTable :rows="list" :columns="columns" :isCLoseMenu="true"
                                           :totalPage="totalPages_" :totalElement="totalElement" :links="links"
                                           @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage"
                                           @selectionChanged="clickRow"></ListTable>


                            </b-overlay>

                        </b-tab>

                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>

    </div>

</template>

<script>

    import ListTable from '../components/list-table'/*
    import ListKanban from '../components/list-kanban'
    import ListGraph from '../components/list-graph'*/
    import { mapGetters,mapActions } from "vuex";
   // import constants from '../../../plugins/constants'
    //import axios from 'axios'
    import { getRequestParams  } from '../../../plugins/functions'
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

            this.FetchVueListPatients(getRequestParams(this.filter,this.currentpage,10,this.$i18n.locale))

        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Patients"
        },

        computed: {
            ...mapGetters(["GetVueKanban","GetVueGraph","GetVueListPatients","GETCLOSEFOLDER"]),
        },
        methods: {
            ...mapActions(["FetchVueKanban", "FetchVueGraph", "FetchVueListPatients","fermerdossier"]),
            addpatient(){

                    this.$router.push({name: 'addpatient',params: { rowes:this.rowe }})

            },
          checkId(obj, id) {

            return obj.map(function(item) { return item.id; }).indexOf(id);

          },
          removelist(contact,indexIds){
            contact.splice(indexIds, 1);
            contact.sort();
          },
            consult(){
                console.log('parames2', this.rowe);
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_patient'),'error')
                    return ;
                }

                    this.$router.push({name: 'dossier',params: { rowes:this.rowe }})

            },

          edit(){
                console.log('parames2', this.rowe);
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_patient'),'error')
                    return ;
                }

                    this.$router.push({name: 'editdossier',params: { rowes:this.rowe }})

            },
            closes(){
                this.loadanotherpage = true
              this.fermerdossier(this.rowe[0])
            },
            billing(){
             // this.loadanotherpage = true
              this.$router.push({name: 'billing',params: { rowes:this.rowe }})
              console.log('parames', this.rowe);
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

            loadpage(params){

                console.log('loadpage',params)
                this.currentpage = params
                this.loadanotherpage = true
              this.FetchVueListPatients(getRequestParams(this.filter,this.currentpage,10,this.$i18n.locale))

               // this.visiteenattente(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))


            },
        },
/**/
        data() {

            return {
              currentpage:1,
              filter:"",
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
                        label: "Identity ",
                        field: "identity",
                       hidden: false,
                    },
                    {
                      label: "Date Accident",
                      field: "crashDate",
                      hidden: false,
                    },
                    {
                        label: "Sexe ",
                        field: "gender",
                       hidden: false,
                    },
                    {
                        label: "Gravite des traumatismes ",
                        field: "personTraumaSeverity",
                       hidden: false,
                    },
                    {
                        label: "hopital",
                        field: "hopital",
                       hidden: false,
                    },

                    {
                        label: "Date de Naissance ",
                        field: "dateNaiss",
                        hidden: false,
                    },
                  {
                        label: "Montant Acceptee ",
                        field: "amountAccepted",
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

          GETCLOSEFOLDER(value){
            console.log('link',value)
            this.list.splice(this.checkId(this.list,value.id), 1,  value)

            this.loadanotherpage=false
          },

            GetVueListPatients(value){

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