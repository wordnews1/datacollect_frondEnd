<template>

    <div class="main-content">

        <b-row>

            <div style="background: white;" >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div >
                            <div  class="card mb-20">
                                <a href="#"  @click="addpatient()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Add icon"></i> <span class="icons">{{$t('add')}}</span>
                                </a>
                            </div>
                        </div>

                        <!-- <div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
                        <div>
                            <div class="card mb-20">
                                <!--  <div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                                <a href="#"  @click="signin()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Folder-Open icon"></i>
                                    <span class="icons">{{$t('consultfolder')}}</span>
                                </a>
                            </div>
                        </div>

                        <!--<div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
                        <div>
                            <!--<div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                            <div class="card mb-20">
                                <a href="#" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-File-Edit icon"></i>
                                    <span class="icons">{{$t('updatepatient')}}</span>
                                </a>
                            </div>
                        </div>
                        <!--<div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
                        <div>
                            <!--<div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                            <div class="card mb-20">

                                <a href="#" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Folder-Archive icon"></i>
                                    <span class="icons">{{$t('archivpatient')}}</span>
                                </a>
                            </div>
                        </div>
                        <!--<div v-if="rowe.length<=1  && rowe[0].statutVisite===3">-->
                        <div>
                            <!--<div v-if=" checkArray(roles,controleur)" class="card mb-20">-->
                            <div class="card mb-20">
                                <a href="#" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Edit icon"></i>
                                    <span class="icons">{{$t('updatestatuspatient')}}</span>
                                </a>

                            </div>
                        </div>







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

                                <ListTable :rows="list" :columns="columns" :isCLoseMenu="true"
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

    import ListTable from '../components/List-table2'/*
    import ListKanban from '../components/list-kanban'
    import ListGraph from '../components/list-graph'*/
    import { mapGetters,mapActions } from "vuex";
    // import constants from '../../../plugins/constants'
    //import axios from 'axios'
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

            this.FetchListExamens()

        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Patients"
        },

        computed: {
            ...mapGetters(["GETLISTEXAMENS"]),
        },
        methods: {
            ...mapActions([ "FetchListExamens"]),
            addpatient(){

                this.$router.push({name: 'addpatient',params: { rowes:this.rowe }})

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
            clickRow(params) {

                console.log('typetest1', params);
            },
            loadpage(params){

                console.log('loadpage',params)
                this.currentpage = params
                this.loadanotherpage = true

                // this.visiteenattente(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))


            },
        },
        /**/
        data() {

            return {
                totalPages_:0,
                loadanotherpage:false,
                totalElement:0,
                links:[],
                list:[],
                rowe:{},
                columns:[
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
                ]
            }
        },

        watch:{

            GETLISTEXAMENS(value){

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