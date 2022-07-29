<template>
    <div class="main-content">
        <breadcumb :page= type  :folder="date" />

        <!---->
        <registerPartners
                id="registercustomer"
                :title="$t('register_customer')"
                :type=type
                @registerpartners="registerCustomer"></registerPartners
        >
        <br>

        <registerPartners
                id="registercontacts"
                :title="$t('register_contact')"
                :type=type
                @registerpartners="registerCustomer"></registerPartners
        >
        
        <formsettlement
                        id="registerreglement"
                        :title="$t('register_settlement')"
                        :type=type
                        :clients="clients"
                        @registerpartners="registerCustomer"></formsettlement
                >

        <formadress
                        id="registeradress"
                        :title="$t('register_adress')"
                        :type=type
                        :clients="clients"
                        @registerpartners="registerCustomer"></formadress
                >

        <b-row>
            <div style="background: white;" >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div class="card mb-20" >
                            <a href="#" v-if = "fullNameIsExist('clients')"  v-b-modal.registercustomer class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('new')}}</span>
                            </a>
                        </div>

                        <div class="card mb-20" >
                            <a href="#" v-if = "fullNameIsExist('contacts')"  v-b-modal.registercontacts class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('new')}}</span>
                            </a>
                        </div>

                        <div class="card mb-20" >
                            <a href="#" v-if = "fullNameIsExist('vendeurs')"  v-b-modal.registervendeurs class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('new')}}</span>
                            </a>
                        </div>
                        <div class="card mb-20" >
                            <a href="#" v-if = "fullNameIsExist('sales')"   class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('details_ventes')}}</span>
                            </a>
                        </div>

                        <div class="card mb-20" >
                            <a href="#" v-if = "fullNameIsExist('reglement')"  v-b-modal.registerreglement class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('new')}}</span>
                            </a>
                        </div>

                        <div class="card mb-20" >
                            <a href="#" v-if = "fullNameIsExist('address')"  v-b-modal.registeradress class="item item-text-wrap item-button-left  taille">
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
    import registerPartners from "../components/registerpartners_old"
    import formsettlement from "../components/formSettlement"
    import formadress from "../components/formadress"

    export default {

        name:"partnersVue",
        order: 7,
        statute:true,
        props:{
            type:String,
            root:Boolean
        },
        components: {
            ListTable,ListKanban,ListGraph,registerPartners,formsettlement,formadress
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Task Manager"
        },
        data() {
            return {
                column:[],
                list:[],
                clients:["Tchokotcheu","Tchikou"],
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

            ...mapGetters(["GetVueKanban","GetVueGraph","GetVueHist","GetVueList","getCgs","GetVehicules"]),
            columns() {

                if(this.type==='ventes') return this.$store.state.constantes.sales_model
                if(this.type==='reglement') return this.$store.state.constantes.sales_model
                if(this.type==='clients') return this.$store.state.constantes.customer_model
                if(this.type==='contacts') return this.$store.state.constantes.customer_model
                if(this.type==='vendeurs') return this.$store.state.constantes.customer_model
                if(this.type==='adresses') return this.$store.state.constantes.adresses_model
                if(this.type==='cg') return this.$store.state.constantes.cg_model
                if(this.type==='vehicules') return this.$store.state.constantes.vehicules_model

                return this.column
            }

        },

        methods: {
            ...mapActions(["FetchVueKanban","FetchVueGraph","FetchVueList","getcge","getvehicules"]),
            fullNameIsExist (item) {

                if (this.type === item){
                    return true
                }else{
                    return false
                }
            },
            registerCustomer(){

            },
        },
        mounted() {

            if(this.rout)
                this.type = this.$route.params['type']

            this.FetchVueKanban(this.type)
            this.FetchVueGraph(this.type)
            this.FetchVueList(this.type)


            if(this.type==='cg'){
                this.getcge()
            }
            if(this.type==='vehicules'){
                this.getvehicules()
            }

        },

        beforeUpdate(){
            if(this.rout)
                this.type = this.$route.params['type']


        },

        watch: {

            type: function(newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.type = newVal

                if(this.rout)
                    this.type = this.$route.params['type']

                this.FetchVueKanban(this.type)
                this.FetchVueGraph(this.type)
                this.FetchVueList(this.type)


                if(this.type==='cg'){
                    this.getcge()
                }
                if(this.type==='vehicules'){
                    this.getvehicules()
                }

            },
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
                console.log('list',this.list)
            },
            getCgs:function (value) {

                this.list = value
                console.log('listes',this.list)
            },
            GetVehicules:function (value) {

                this.list = value
            },
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

