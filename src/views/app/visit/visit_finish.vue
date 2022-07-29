<template>

    <div class="main-content">

        <b-modal id="confirmdelete" scrollable no-close-on-backdrop :title="$t('delete_confirm')" hide-footer>

            <p></p>

            <div style="text-align: right">
                <b-button  variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
                <b-button type="submit" variant="outline-success rights" @click="deleteprop()" >{{$t('confirm')}}</b-button>
            </div>

        </b-modal>


        <b-overlay :show="open2b" rounded="sm">

            <b-modal id="openview"  :title="$t('indic_rapport_machine')" scrollable no-close-on-backdrop  size="lg" hide-footer>


                <p></p>
                <template #default="{}">

                    <b-form :aria-hidden="openb ? 'true' : null" ref="regfiles" @submit.prevent="sendfiles">

                        <input type="hidden" :value="tests.length" name="filenumber"/>
                        <b-form-group
                                v-for="(item,index) in tests"  :key="index"
                                class="col-md-12 mb-30"
                                label-for="input-1"
                        >

                            <div class="row">
                            <span
                                    :class="[(active_row == index ? 'active_row' : '') ,'onHover']" class="form-control col-md-4" @click="rowClick(item, index)"
                            ><b>{{item.description}} </b></span>
                                <input type="hidden" class="col-md-1" :value="item" :name="'typetest'+index"/>

                                <input class="form-control col-md-4 ml-8" type="file" :ref="'file'+index" @change = "loadfiles(item,index)" required/>
                            </div>

                        </b-form-group>

                        <!--<div class="table-responsive-sm">

                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>{{$t('TypeofTest')}}</th>
                                            <th>{{$t('rapport_machine')}}</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr  v-for="(item,index) in tests"   :key="index">

                                            <td class="center" ><b>{{index+1}} </b> </td>

                                            <td class="left" :class="[(active_row == index ? 'active_row' : '') ,'onHover']" @click="rowClick(item, index)"><b>{{item.description}} </b> </td>
                                            <td class="center" ><input type="file"  > </td>
                                        </tr>
                                        </tbody>
                                    </table>


                        </div>-->

                        <p></p>

                        <div style="text-align: right">
                            <b-button type="submit" variant="outline-success rights"
                            >{{$t('valider')}}</b-button>
                            <!--@click="erg()"-->
                        </div>
                    </b-form>

                </template>

            </b-modal>

        </b-overlay>

        <breadcumb :page="$t('allvisit_list_end')" :folder="date" />

        <b-row>

            <div style="background: white;" >
                <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                    <b-col md="12">


                        <div v-if=" rowe.length<=1 && checkArray(roles,controleur)">
                            <div v-if="(rowe[0].statutVisite > 4 || rowe[0].statutVisite === 4)" class="card mb-20">
                                <a href="#"  @click="printpv()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Receipt-3 icon"></i>
                                    <span class="icons" v-if="(rowe[0].statutVisite>6)">{{$t('reprint_inspection')}}</span>
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
                            <b-overlay :show="loadanotherpage" rounded="sm" >

                                <ListTable :rows="list" :columns="columns" :isCLoseMenu="true"
                                           :totalPage="totalPages_" :totalElement="totalElement"
                                           @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>

                            </b-overlay>
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
    import constants from '../../../plugins/constants'
    import axios from 'axios'
    import functions from '../../../plugins/functions'

    import { getRequestParams  } from '../../../plugins/functions'
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
                loadanotherpage:false,
                filter:"",
                pagesize:10,
                currentpage:1,

                datas:{},
                model:{},
                models:[],
                files:[],
                rowe:{},
                totalPages_:0,
                totalElement:0,
                selectedParentMenu: "",
                isCLoseMenu: true,
                date:new Date().toLocaleDateString(),
                list1: [
                ],
                openb:false,
                open2b:false,
                active_row:'',
                selecte:"",
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
                        dateInputFormat: "yyyy-MM-dd HH:mm",
                        dateOutputFormat: "yyyy-MM-dd HH:mm"
                    },
                    {
                        label: "Statut",
                        field: "statut",
                        html: true
                    },


                ],
                columns2: [
                    {
                        label: "id",
                        field: "id",
                        hidden: true,
                    }
                ],
                idd:0,
                data:[],
                list_kanban:[],
                filenames:[],
                tests:[],
                list:[],
                list_camembert:[],
                list_hist:[],
                percent_visit:'Pourcentage par visite',
                roles:[],
                caissier:[],
                cg:[],
                controleur:[],
            };
        },

        computed: {
            ...mapGetters(["getLinks","GetVueKanban","GetVueGraph","GetVueHist","getVisiteEnded","getSideBarToggleProperties","getStatusApprove"]),
        },

        methods: {

            ...mapActions(["FetchVueKanban","FetchVueGraph","visitefinish","approve","bilancaisse","printps"]),
            rowClick(data, index) {
                this.active_row = index
            },

            loadpage(params){

                console.log('loadpage',params)
                this.currentpage = params
                this.loadanotherpage = true

                this.visitefinish(getRequestParams(this.filter,this.currentpage,this.pagesize))


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

            checkIdVisite(obj, id) {

                return obj.map(function(item) { return item.idVisite; }).indexOf(id);

            },
            sendfiles(){

                this.open2b = !this.open2b;
                this.datas.datas = this.models;
                this.openb=true;

                console.log('yello',this.datas);

                console.log('yello',this.files);

                let formData = new FormData();
                this.files.forEach((file) => {
                    formData.append('files',file);
                });

                formData.append('data', JSON.stringify(this.datas));

                //console.log('file',formData.entries());
                //console.log('file',formData.values());
                /*formData.append('file', this.$refs.file +''+index);
                formData.append('description', this.content);
                formData.append('variant', 'produits');*/
                //"https://tests.free.beeceptor.com"


                axios.post(constants.resource_url + "visite/conformity/" + localStorage.getItem('idVisite')
                    , formData , {
                        headers: { 'Content-Type' : 'multipart/form-data' }
                    }

                )
                    .then(customers => {
                        this.open2b = !this.open2b

                        if(customers.data.success) {
                            //this.openb=true;
                            //objet client qui vient detre ajoute
                            this.$bvModal.hide('openview')
                            functions.makeToast(this.$t(customers.data.message),1)
                            // this.makeToast(this.$t(customers.data.message),1)

                            this.$router.go()

                            this.rowe[0].statutVisite = 5

                            //this.list.re

                        }


                        //requete pour modifier le statut de la visite

                    })
                    .catch(function(error) {
                        this.open2b = !this.open2b
                        console.log('customer_create_error',error);
                        this.makeToast(this.$t('error'),0)
                        // Handle Errors here.
                        // var errorCode = error.code;

                    });

            },
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
            printpv(){

                this.loadanotherpage = true
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }
                console.log('links','links')

                this.printps(this.rowe[0].id)
                //window.open(constants.resource_url+'visites/imprimer/'+this.rowe[0].id, '_blank');
                //this.printp({'rowes':this.rowe[0].id})

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

            openconformview(params){
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }
                this.$bvModal.show('openview')
                console.log('parames',params);

                // this.$router.push({name: 'cg',params: { rowes:this.rowe[0] }})
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
            checkId(obj, id) {

                return obj.map(function(item) { return item.reference; }).indexOf(id);

            },
            selectcheck(params)
            {
                console.log('selectcheck',params)
            },
            clickRow(params){

                console.log('typetest1',params);
                console.log('typetest1',params.length);


                if(params.length>0){

                    this.rowe = params;
                    localStorage.setItem('idVisite',this.rowe[0].idVisite)
                    this.tests = params[0].testAttendus;
                    /*this.tests[0] = "F";
                    this.tests[1] = "R";
                    this.tests[2] = "R";
                    this.tests[3] = "P";
                    this.tests[4] = "G";*/


                    console.log('typetest',this.tests)

                    console.log('parames',params[0].statutVisite);
                    console.log('parames',params);
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
            checkIds(obj, id) {

                return obj.map(function(item) { return item.id; }).indexOf(id);

            },
            checkArray(arr1,arr2){
                return (arr1.filter(x => arr2.includes(x))).length
            }

        },
        beforeMount(){
            this.FetchVueGraph('visite')
        },
        mounted() {


            this.bilancaisse()
            this.FetchVueKanban('visit')

            this.roles  = this.$store.state.authData.role
            this.caissier = ['caissier','chef']
            this.cg = ['cg','chef']
            this.controleur = ['chef','controleur']

            /*var url = "http://192.168.8.113:8080/api/v1/"+"subscribe";
            var eventsrc = new EventSource(url);
            eventsrc.addEventListener("latestnews",function(e){
                console.log('ssenvent',e);
            })*/

            //this.FetchVueList('visite')
            //this.FetchVueVisitList(this.id)

            console.log('loadpage',getRequestParams(this.filter,this.currentpage,this.pagesize))

            this.visitefinish(getRequestParams(this.filter,this.currentpage,this.pagesize))
            //this.visiteenattente()

        },
        watch: {

            getLinks(value){

                this.loadanotherpage = false

                console.log('link',value)
                // this.$store.state.visits.links=""

            },


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

            getVisiteEnded:function (value) {

                this.list = value.content;
                this.totalElement = value.page.totalElements;
                this.totalPages_ = value.page.totalPages;
                this.loadanotherpage = false
                console.log('typelisteee',this.list)

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
    .active_row {
        padding:5px;
        background-color:#0275d8;
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
        border-radius: 25px;
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
