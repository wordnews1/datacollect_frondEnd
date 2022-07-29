<template>

    <div class="main-content">
        <b-modal id="confirmdelete" scrollable no-close-on-backdrop :title="$t('delete_confirm')" hide-footer>
            <p></p>
            <div style="text-align: right">
                <b-button  variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
                <b-button type="submit" variant="outline-success rights" @click="deleteprop()" >{{$t('Enregistrer')}}</b-button>

            </div>
        </b-modal>

        <breadcumb :page="$t('allvisit_list')" :folder="date" />

        <b-row>

            <div class="container" style="background: white; " >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">

                        <div class="card mb-20" >
                            <a href="#" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Add icon"></i>
                                <span class="icons">{{$t('new')}}</span>
                            </a>
                        </div>

                        <div v-if="rowe.length<=1" class="card mb-20">
                            <a href="#" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Finger-Print icon"></i>
                                <span class="icons">{{$t('sign_inspection')}}</span>
                            </a>
                        </div>

                        <div v-if="rowe.length<=1" class="card mb-20">
                            <a href="#" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Receipt-3 icon"></i>
                                <span class="icons">{{$t('print_inspection')}}</span>
                            </a>
                        </div>

                        <div v-if="rowe.length<=1" class="card mb-20">
                            <a @click="update" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Edit icon"></i>
                                <span class="icons">{{$t('maj')}}</span>
                            </a>
                        </div>


                        <div class="card mb-20">
                            <a  @click="approved()" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Check icon"></i>
                                <span class="icons">{{$t('approved')}}</span>
                            </a>
                        </div>

                        <div v-if="rowe.length<=1" class="card mb-20">
                            <a  @click="gototest()" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Start icon"></i>
                                <span class="icons">{{$t('st_inspection')}}</span>
                            </a>
                        </div>


                        <div v-if="rowe.length<=1" class="card mb-20">
                            <a  @click="signin()" class="item item-text-wrap item-button-left  taille">
                                <i class="i-Check icon"></i>
                                <span class="icons">{{$t('st_sign')}}</span>
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
                            <ListGraph :name_graph="percent_visit" :datae="list_camembert" :listhisto="list_hist"></ListGraph>

                        </b-tab>

                        <b-tab title="">

                            <template slot="title">
                                <i class="i-Split-Four-Square-Window text-15"> </i>
                            </template>
                            <ListKanban :rows_kanban="list_kanban" ></ListKanban>

                        </b-tab>


                        <b-tab title="" active>
                            <template slot="title">
                                <i class="i-Align-Justify-All text-15"> </i>
                            </template>

                            <ListTable :rows="list" :columns="columns" :isCLoseMenu="true" @deleteProps="deleteProps"
                                       @editProps="editProps" @selectionChanged="clickRow"></ListTable>

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


    export default {

        display: "Transitions",
        order: 7,
        props:{
            id:String
        },
        components: {
            ListTable,ListKanban,ListGraph
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Task Manager"
        },
        data() {
            return {
                rowe:{},
                selectedParentMenu: "",
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
                        label: "id",
                        field: "id",
                        hidden: true,
                    },
                    {
                        label: "Categorie",
                        field: "categorie.libelle",
                        html:true
                    },
                    {
                        label: "Type",
                        field: "type",
                    },
                    {
                        label: "Reference",
                        field: "reference"
                    },
                    {
                        label: "Client",
                        field: "client"
                    },
                    {
                        label: "Date",
                        field: "date",
                        type: "date",
                        dateInputFormat: "yyyy-mm-dd",
                        dateOutputFormat: "yyyy-mm-dd"
                    },
                    {
                        label: "Statut",
                        field: "statut",
                        html: true
                    },
                    {
                        field: "action",
                        label: "Action"
                    }

                ],
                idd:0,
                data:[],
                list_kanban:[],
                list:[],
                list_camembert:[],
                list_hist:[],
                percent_visit:'Pourcentage par visite'
            };
        },

        computed: {
            ...mapGetters(["GetVueKanban","GetVueGraph","GetVueHist","getVisiteWaiting","getSideBarToggleProperties","getStatusApprove"]),
        },

        methods: {

            ...mapActions(["FetchVueKanban","FetchVueGraph","visiteenattente","approve"]),

            approved(){
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }

                let rowes=[]
                this.rowe.forEach((value,index) => {
                    rowes[index] = value.id
                })
                this.approve({'rowes':rowes})

            },
            gototest(){
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }
                this.$router.push({name: 'visit_start',params: { rowes:this.rowe }})
            },
            signin(){
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('st_signin_error'),'error')
                    return ;
                }
                this.$router.push({name: 'st_signin',params: { rowes:this.rowe }})
            },
            update(){
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }

                this.$router.push({name: 'cg',params: { rowes:this.rowe[0] }})
            },
            makeToast(variant = null,type="info") {
                this.$toasted.show(variant,{type:type})
            },
            checkId(obj, id) {

                return obj.map(function(item) { return item.reference; }).indexOf(id);

            },
            clickRow(params){
                this.rowe = params
                console.log('parames',params);
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

            }

        },
        beforeMount(){
            this.FetchVueGraph('visite')
        },
        mounted() {

            this.FetchVueKanban('visit')
            this.visiteenattente()
            //this.FetchVueList('visite')
            //this.FetchVueVisitList(this.id)

        },
        watch: {

            id: function(newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.FetchVueKanban('visit')
                //this.FetchVueList('visite')
                this.FetchVueVisitList(this.id)
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

            getVisiteWaiting:function (value) {

                this.list = value
                console.log('type',this.list)
            },

            getStatusApprove(value){

                console.log('value',value)
                if(value){
                    this.makeToast(this.$t('approved_success'),'success')

                    let indexId = this.checkId(this.list,value.reference)
                    this.list.splice(indexId, 1);
                }

                this.$store.state.visits.statusapprove = false

            }

        }

    };
</script>

<style scoped>

    .mb-30{
        margin-bottom: 10px !important;
    }

    .taille{
        width: 150px;
        height: 150px;
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
        margin-bottom:5px;

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
