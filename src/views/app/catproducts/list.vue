<template>
    <div class="main-content">
        <breadcumb :page="'Liste des Categories de Produits '" :folder="date" />

        <!--<b-row >
            <b-col md="12" style="position:relative;text-align: right;">
            <div class="btn-group" role="group" aria-label="Basic example">

                <b-button  variant="secondary" v-b-modal.registercatproducts>{{$t('st_catproducts')}}</b-button>

            </div>
            </b-col>
        </b-row>-->

        <br>

        <formCatProducts
                id="registercatproducts"
                :title="$t('register_catproducts')"
                type="categorieproduits"
                :statut="statute"
                @registercatproducts="registercatProducts"
        ></formCatProducts>

        <b-row>

            <div style="background: white;" >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div class="card mb-20" >
                            <a href="#" v-b-modal.registercatproducts class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('new')}}</span>
                            </a>
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
                        <b-tab title="" >
                            <template slot="title">
                                <i class="i-Bar-Chart text-15"> </i>
                            </template>
                            <ListGraph :name_graph="percent_visit" :data="data" ></ListGraph>

                        </b-tab>

                        <b-tab title="" >
                            <template slot="title">
                                <i class="i-Split-Four-Square-Window text-15"> </i>
                            </template>
                            <ListKanban :rows_kanban="list_kanban" ></ListKanban>
                        </b-tab>

                        <b-tab title="" active>
                            <template slot="title">
                                <i class="i-Align-Justify-All text-15"> </i>
                            </template>
                            <ListTable :rows="list" :columns="columns" :isCLoseMenu="true"></ListTable>
                        </b-tab>

                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <!-- <div class="wrapper"> -->
        <br>

    </div>
</template>

<script>
    import ListTable from '../components/list-table'
    import ListKanban from '../components/list-kanban'
    import ListGraph from '../components/list-graph'
    import { mapGetters,mapActions } from "vuex";
    import formCatProducts from "../components/formCatProducts"

    export default {

        display: "Transitions",
        order: 7,
        props:{
            id:String
        },
        components: {
            ListTable,ListKanban,ListGraph,formCatProducts
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Task Manager"
        },
        data() {
            return {
                isCLoseMenu: true,
                date:new Date().toLocaleDateString(),
                statute:true,
                list1: [
                    {
                        columnname:"A inspecter",
                        number:"48",
                        visites:[
                            {
                                idVisite:1,
                                carteGrise:{
                                    numImmatriculation:'10503653'
                                },
                                contreVisite:false

                            },
                            {
                                carteGrise:{
                                    numImmatriculation:'10203643'
                                },
                                contreVisite:true
                            },
                        ]
                    },
                    {
                        columnname:"En cours",
                        number:"10",
                        visites:[
                            {
                                idVisite:2,
                                carteGrise:{
                                    numImmatriculation:'105803653'
                                },
                                contreVisite:false
                            },
                        ]
                    },

                ],
                columns: [
                    {
                        label: "Libelle",
                        field: "libelle",
                        html:true
                    },
                    {
                        label: "Date Created",
                        field: "createdDate",
                        type: "date",
                        dateInputFormat: "yyyy-mm-dd",
                        dateOutputFormat: "MMM Do yy"
                    },
                    {
                        label: "Date Modified",
                        field: "modifiedDate",
                        type: "date",
                        dateInputFormat: "yyyy-mm-dd",
                        dateOutputFormat: "MMM Do yy"
                    },
                    {
                        label: "Statut",
                        field: "activeStatus",
                        html: true
                    },

                ],

                data:[
                    { value: 535, name: 'A inspecter' },
                    { value: 310, name: 'Visit In Progress' },
                    { value: 234, name: 'Reussie' },
                    { value: 155, name: 'Echoue' }
                ],
                list_kanban:[],
                list:[],
                list_camembert:[],
                list_hist:[],
                percent_visit:'Pourcentage par visite'
            };
        },

        computed: {
            ...mapGetters(["GetVueKanban","GetVueGraph","GetVueHist","GetVueList","GetStatus","GetCatProducts"]),
        },

        methods: {
            ...mapActions(["FetchVueKanban","FetchVueGraph","registercatProduct","FetchVueList"]),
            registercatProducts:function(item){

                //console.log('clickcat products',item)
                this.registercatProduct(item)
            },
            makeToast(variant = null,type="info") {
                console.log('Please fill the form correctly',variant)
                this.$toasted.show(variant,{type:type})
            },
        },
        beforeMount(){
            this.FetchVueGraph('catproducts')
        },

        mounted() {

            this.FetchVueKanban('catproducts')

            this.FetchVueList('catproducts')

        },

        watch: {

            GetVueKanban:function (value) {
                this.list_kanban = value
            },
            GetVueGraph:function (value) {

                this.list_camembert = value

            },
            GetVueHist:function (value) {

                this.list_hist = value
            },
            GetVueList:function (value) {

                this.list = value
                console.log('tyope',this.list)
            },
            GetStatus:function(){

                this.makeToast('sucess','success')
                this.statute=false
                this.$bvModal.hide('registercatproducts')

            },

            GetCatProducts(item){
                this.list.push(item)

            }

        }

    };
</script>

<style scoped>
    .mb-30{
        margin-bottom: 10px !important;
    }
    .taille{
        width:50px;
        height: 50px;
        background: #ffffff9e;
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
</style>
