<template>
    <div class="main-content">
        <breadcumb :page="$t('list_products')" :folder="date" />
        <!--<b-row >
            <b-col md="12" style="position:relative;text-align: right;">
                <div class="btn-group" role="group" aria-label="Basic example">

                    <b-button  variant="secondary" v-b-modal.registerproducts>{{$t('st_products')}}</b-button>

                </div>
            </b-col>
        </b-row>-->
        <br>

        <b-row>
            <div style="background: white;" >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div class="card mb-20" >
                            <a href="#" v-b-modal.registerproducts class="item item-text-wrap item-button-left  taille">
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

        <formProducts
                id="registerproducts"
                :title="$t('register_products')"
                type="contacts"
                :cats="cats"
                ref="registerProducts"
                @registerproducts='registerproducts'
        ></formProducts>


    </div>
</template>

<script>
    import ListTable from '../components/list-table'
    import ListKanban from '../components/list-kanban'
    import ListGraph from '../components/list-graph'
    import { mapGetters,mapActions } from "vuex";
    import formProducts from "../components/formproducts"

    export default {

        display: "Transitions",
        order: 7,
        props:{
            id:String
        },
        components: {
            ListTable,ListKanban,ListGraph,formProducts
        },
        data() {
            return {
                cats:[{value:1,text:"Vignette"},{value:2,text:"Decaissement"}],
                isCLoseMenu: true,
                date:new Date().toLocaleDateString(),
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
                        label: "CategorieProduit",
                        field: "CategorieProduit",
                        html:true
                    },
                    {
                        label: "Libelle",
                        field: "libelle",
                    },
                    {
                        label: "Prix",
                        field: "prix"
                    },
                    {
                        label: "Date",
                        field: "createdDate",
                        type: "date",
                        dateInputFormat: "yyyy-mm-dd",
                        dateOutputFormat: "MMM Do yy"
                    }

                ],
                list:[],

                data:[
                        { value: 535, name: 'A inspecter' },
                        { value: 310, name: 'Visit In Progress' },
                        { value: 234, name: 'Reussie' },
                        { value: 155, name: 'Echoue' }
                ],
                list_kanban:[],
                list_camembert:[],
                list_hist:[],
                percent_visit:'Pourcentage par visite'
            };
        },

        computed: {
            ...mapGetters(["GetVueKanban","GetVueGraph","GetVueHist","GetVueList","GetProducts"]),
        },

        methods: {
            ...mapActions(["FetchVueKanban","FetchVueGraph","FetchVueList","registerproduct"]),
            registerproducts:function(item){
                console.log('registerprid',item);
                this.registerproduct(item)
            },
            makeToast(variant = null,type="info") {
                this.$toasted.show(variant,{type:type})
            },
        },

        mounted() {
            this.FetchVueKanban('produits')
            this.FetchVueGraph('produits')
            this.FetchVueList('produits')

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

            },

            GetProducts(item){
                console.log('GetProducts',item)
                this.makeToast('sucess','success')
                this.$bvModal.hide('registerproducts')
                this.list.push(item)

                this.$refs.registerProducts.registerp()

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
