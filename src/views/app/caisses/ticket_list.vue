<template>

    <div class="main-content">

        <ticket :encaissements="encaissements"
                      :invoice_tax ="invoice_taxs"
                      :field="field"
                      :codepays="codepays"
                      :devise="devise"
                      :country="country"
                         @print="print"
                      @cancels="cancels"></ticket>

        <b-modal id="confirmdelete" scrollable no-close-on-backdrop :title="$t('delete_confirm')" hide-footer>

            <p></p>

            <div style="text-align: right">
                <b-button  variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
                <b-button type="submit" variant="outline-success rights" @click="deleteprop()" >{{$t('confirm')}}</b-button>
            </div>


        </b-modal>


        <breadcumb :page="$t('list_ticket')" :folder="date" />

        <b-row>


            <div style="background: white;" >

                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div v-if="rowe.length<=1 ">
                            <div  class="card mb-20">
                                <a href="#"  @click="reticket()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Finger-Print icon"></i>
                                    <span class="icons">{{$t('reprint_ticket')}}</span>
                                </a>
                            </div>
                        </div>

                    </b-col>
                </b-row>
            </div>


            <b-col md="12" class="mb-30" style="margin-top: 3px;max-width: 93%!important">

                <b-card
                        class="card   mb-30"
                        header=""
                        header-bg-variant="transparent">
                    <b-tabs pills >

                        <b-tab title="" active>

                            <template slot="title">
                                <i class="i-Align-Justify-All text-15"> </i>

                            </template>
                            <b-overlay :show="loadanotherpage" rounded="sm" >

                                <ListTable :rows="list" :searchref="searchref" :columns="columns" :isCLoseMenu="true"
                                           :totalPage="totalPages_" :totalElement="totalElement" @searchlistticket="searchlistticket"
                                           @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>

                            </b-overlay>
                        </b-tab>

                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>

        <br>

    </div>
</template>

<script>

    import constants from '../../../plugins/constants'
    import axios from 'axios'
    import ListTable from '../components/list-table'
    import { getRequestParams  } from '../../../plugins/functions'
    import ticket from "./ticket"

    export default {

        display: "Ticket List",
        props:{

        },
        components: {
            ListTable,ticket
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Ticket List"
        },
        data() {

            return {
                date: new Date().toLocaleString(),
                encaissements:{},
                invoice_taxs: 0,
                loadanotherpage:false,
                country:this.$store.state.authData.country,
                encompte:false,
                totalPages_:0,
                totalElement:0,
                list:[],
                parames:{},
                filter:"",
                pagesize:10,
                currentpage:1,
                field:"",
                searchref:"ventes",
                columns: [
                    {
                        label: "id",
                        field: "id",
                    },
                    {
                        label: "numTicket",
                        field: "numTicket",
                    },
                    {
                        label: "nomClient",
                        field: "nomClient",
                    },
                    {
                        label: "numClient",
                        field: "numClient"
                    },
                    {
                        label: "total",
                        field: "total"
                    },
                    {
                        label: "dateVente",
                        field: "dateVente",
                        type: "datetime",
                        dateInputFormat: "yyyy-MM-dd HH:mm",
                        dateOutputFormat: "yyyy-MM-dd HH:mm"
                    }

                ],
                rowe:{},

            };
        },
        methods: {

            searchlistticket(params){
                this.loadanotherpage = true
                this.loadlisttickets(params)
            },
            cancels (){
                // Pass the element id here
                this.box=false;
                this.$bvModal.hide('tests')
                console.log('cancels',this.box)
            },
            print (){
                // Pass the element id here
                this.$htmlToPaper('printMe');
            },
            reticket(){

                this.encaissements = this.rowe[0]
                this.$bvModal.show('tests')

            },
            loadpage(params){


                console.log('loadpage',params)
                this.currentpage = params
                this.loadanotherpage = true

                this.loadlisttickets(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))

                //this.visiteenattente(getRequestParams(this.filter,this.currentpage,this.pagesize))


            },
            makeToast(variant = null,type) {

                switch (type) {
                    case 0: type="error"; break;
                    case 1: type="success" ; break;
                    case 2: type="info"; break;
                    case 3: type="warning"; break;

                }

                this.$toasted.show(this.$t(variant),{type:type})


            },
            loadfiles(item,index){

                //debugger;
                //this.file = this.$refs.file[0];

                this.model={}
                this.model.idTest = item.idCategorieTest;
                this.model.filename = this.$refs['file'+index][0].files[0].name;

                this.models[index]= this.model;
                this.files[index] = this.$refs['file'+index][0].files[0];

                console.log("refs", this.models);


            },
            clickRow(params){

                console.log('typetest1',params);
                if(params.length==1) {

                    this.rowe = params;
                    //localStorage.setItem('idVisite', this.rowe[0].idVisite)
                    //this.tests = params[0].testAttendus;

                    console.log('parames', params);

                }else{
                    this.rowe={}
                }
            },
            editProps(params){

                console.log('params',params)
            },
            deleteProps(params){

                this.$bvModal.show('confirmdelete')
                this.idd = params.formattedRow.id

                console.log('params',params.formattedRow.id)
            },
            deleteprop(){

                this.$bvModal.hide('confirmdelete')
                console.log('params',this.idd)

            },
            loadlisttickets(params){

                axios.get(constants.resource_url+'search/'+ this.searchref,{ params } )

            .then(value => {

                    this.list = value.data.data.content;
                    this.totalElement = value.data.data.page.totalElements;
                    this.totalPages_ = value.data.data.page.totalPages;

                    this.loadanotherpage = false
                    console.log('typelist',this.list)
                    //console.log('response',value);

                })

                    .catch(function(error) {
                        console.log('customer_create_error',error);
                        // Handle Errors here.
                        // var errorCode = error.code;

                    });

            }


        },
        beforeMount(){

            this.codepays = this.$i18n.locale
            this.devise = localStorage.getItem('devise')

        },
        mounted() {

            this.loadlisttickets(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))

        },
        watch: {


        }

    };
</script>

<style scoped>

    .mb-30{
        margin-bottom: 10px !important;
    }
    .active_row {
        padding:5px;
        background-color:#0275d8;
    }
    tr:hover{
        cursor: pointer;
    }

    .taille{
        width:50px;
        height: 50px;
        background: #ffffff9e;
    }

    .circle {
        width: 50px;
        height: 50px;

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
        position: absolute;
        top: 50%;
        left: 50%;
        height: 50%;
        text-align: center;
        width: 50px;
        font-size: 12px;
        transform: translate(-45%, 10%);
        display: block;
    }

    .mb-20{
        margin-bottom:5px
    }

    .panel-actions{
        margin:0!important;
        padding-right:25px!important;
    }

    .scroll-card{
        height: 250px;
        display: flex !important;
        flex-direction: row;
        flex-grow: 1;
        overflow: auto;
    }

</style>