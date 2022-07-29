<template>

    <div class="main-content">
        <b-modal id="confirmdelete" scrollable no-close-on-backdrop :title="$t('delete_confirm')" hide-footer>
            <p></p>
            <div style="text-align: right">
                <b-button  variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
                <b-button type="submit" variant="outline-success rights" @click="deleteprop()" >{{$t('Enregistrer')}}</b-button>

            </div>
        </b-modal>

        <b-overlay :show="openb" rounded="sm">

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

                                            // hello
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

        <breadcumb :page="$t('visits_inspect')" v-if="id===1" :folder="date" />
        <breadcumb :page="$t('list_visit')" v-if="id===0" :folder="date" />

        <b-row>

                <div style="background: white;" >
                    <b-row  style="right: 0;position: absolute;margin-right: 32px;margin-top: 3px;">
                        <b-col md="12">

                            <div v-if="rowe.length<=1  && rowe[0].statutVisite===3">
                                <div v-if=" checkArray(roles,controleur)" class="card mb-20">

                                    <a href="#" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Add icon"></i>
                                        <span class="icons">{{$t('new')}}</span>
                                    </a>
                                </div>
                            </div>

                            <div v-if="rowe.length<=1  && rowe[0].statutVisite===3">
                                <div v-if=" checkArray(roles,controleur)" class="card mb-20">
                                    <a href="#"  @click="signin()" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Finger-Print icon"></i>
                                        <span class="icons">{{$t('sign_inspection')}}</span>
                                    </a>
                                </div>
                            </div>

                            <div v-if=" rowe.length<=1 && checkArray(roles,controleur) ">
                                <div v-if="(rowe[0].statutVisite > 4 || rowe[0].statutVisite === 4)" class="card mb-20">
                                    <a href="#"  @click="printpv()" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Cash-Register icon"></i>
                                        <span class="icons" v-if="(rowe[0].statutVisite===6)" >{{$t('print_inspection')}}</span>
                                        <span class="icons" v-if="(rowe[0].statutVisite>6)">{{$t('reprint_inspection')}}</span>
                                    </a>
                                </div>
                            </div>

                            <div v-if="(rowe.length<=1 && checkArray(roles,cg))" >
                                <div v-if="rowe[0].statutVisite===0" class="card mb-20">
                                    <a @click="update" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Edit icon"></i>
                                        <span class="icons">{{$t('maj')}}</span>
                                    </a>
                                </div>
                            </div>
                            <div v-if="(rowe.length<=1 && checkArray(roles,cg))" >
                                <div v-if="rowe[0].statutVisite===0" class="card mb-20">
                                    <a @click="update" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Edit icon"></i>
                                        <span class="icons">{{$t('maj')}}</span>
                                    </a>
                                </div>
                            </div>


                            <div v-if="(rowe.length<=1 && checkArray(roles,controleur))">
                                <div v-if="rowe[0].conformityTest && rowe[0].inspection!==null && rowe[0].statutVisite===4" class="card mb-20">
                                    <a  @click="openconformview(rowe[0])" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Check icon"></i>
                                        <span class="icons">{{$t('rapport_machine')}}</span>
                                    </a>
                                </div>
                            </div>

                            <!--<div class="card mb-20">
                                    <a  @click="approved()" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Check icon"></i>
                                        <span class="icons">{{$t('approved')}}</span>
                                    </a>
                            </div>-->


                            <div v-if="(rowe.length<=1 && checkArray(roles,controleur)) ">
                                <div v-if="rowe[0].statutVisite===1" class="card mb-20">
                                    <a  @click="gototest()" class="item item-text-wrap item-button-left  taille">
                                        <i class="i-Check icon"></i>
                                        <span class="icons">{{$t('st_inspection')}}</span>
                                     </a>
                                </div>
                            </div>


                            <!--<div v-if="rowe.length<=1" class="card mb-20">
                                <a  @click="signin()" class="item item-text-wrap item-button-left  taille">
                                    <i class="i-Check icon"></i>
                                    <span class="icons">{{$t('st_sign')}}</span>
                                </a>
                            </div>-->


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
        <Signin :rowes="rowe1" @signature="signaturee"> </Signin>
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
    import Signin from '../visit/signin'

    import { getRequestParams  } from '../../../plugins/functions'
    export default {

        display: "Transitions",
        order: 7,
        props:{
            id:String
        },
        components: {
            ListTable,ListKanban,ListGraph,Signin
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Task Manager"
        },
        data() {
            return {
                totalPages_:0,
                totalElement:0,
                links:[],
                openb:false,
                loadanotherpage:false,
                filter:"",
                pagesize:10,
                currentpage:1,
                rowe:{},
                rowe1:[],
                selectedParentMenu: "",
                isCLoseMenu: true,
                date:new Date().toLocaleDateString(),
                roles:[],
                caissier:[],
                cg:[],
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
                        dateInputFormat: "yyyy-MM-dd HH:mm",
                        dateOutputFormat: "yyyy-MM-dd HH:mm"
                    },
                    {
                        label: "Statut",
                        field: "statut",
                        html: true
                    },


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
            ...mapGetters(["GetVueKanban","GetVueGraph","GetVueHist","GetVueList","getLink","getSideBarToggleProperties","getStatusApprove"]),
        },

        methods: {

            ...mapActions(["FetchVueKanban","FetchVueGraph","FetchVueVisitList","approve","printp"]),
            signaturee(){
                this.$bvModal.hide('signin')
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
            sendfiles(){

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


                axios.post(constants.resource_url + "visite/conformity/" + this.rowe[0].idVisite
                    , formData , {
                        headers: { 'Content-Type' : 'multipart/form-data' }
                    }

                )
                    .then(customers => {

                        if(customers.data.success) {
                            //this.openb=true;
                            //objet client qui vient detre ajoute
                            this.$bvModal.hide('openview')
                            this.makeToast(this.$t(customers.data.message))

                            this.$router.go()

                            this.rowe[0].statutVisite = 5

                            //this.list.re

                        }


                    })
                    .catch(function(error) {
                        console.log('customer_create_error',error);
                        // Handle Errors here.
                        // var errorCode = error.code;

                    });

            },
            printpv(){

                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }
                //window.open(constants.resource_url+'visites/imprimer/'+this.rowe[0].id, '_blank');
                this.printp(this.rowe[0].id)

            },
            gototest(){
                if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('Select_visit'),'error')
                    return ;
                }
                this.$router.push({name: 'visit_start',params: { rowes:this.rowe }})
            },
            signin(){

                /*if(Object.keys(this.rowe).length === 0){
                    this.makeToast(this.$t('st_signin_error'),'error')
                    return ;
                }
                this.$router.push({name: 'st_signin',params: { rowes:this.rowe }})*/
                this.$bvModal.show('signin')

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
            checkArray(arr1,arr2){
                return (arr1.filter(x => arr2.includes(x))).length
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
            loadpage(params){

                console.log('loadpage',params)
                this.currentpage = params
                this.loadanotherpage = true

                this.FetchVueVisitList(getRequestParams(this.filter,this.currentpage,this.pagesize))
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

            console.log('id',this.id);

            this.roles  = this.$store.state.authData.role
            this.caissier = ['caissier','chef']
            this.cg = ['cg','chef']
            this.controleur = ['chef','controleur']

            if(typeof (this.id) =='undefined'){

               this.id =  localStorage.getItem("idvisit")
            }else{
               localStorage.setItem("idvisit",this.id)
            }

            this.FetchVueKanban('visit')

            //this.visiteenattente()
            //this.FetchVueList('visite')

            //this.FetchVueVisitList(this.id,getRequestParams(this.filter,this.currentpage,this.pagesize))

            this.FetchVueVisitList(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))
            //this.FetchVueVisitList(this.id,getRequestParams("",1,10))

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
                console.log('tyope',this.list_camembert)

            },
            GetVueHist:function (value) {

                this.list_hist = value

            },
            GetVueList:function (value) {


                this.list = value.content;
                this.links = value.links;
                this.totalElement = value.page.totalElements;
                this.totalPages_ = value.page.totalPages;
                this.loadanotherpage = false


            },
            getStatusApprove(value){

                console.log('value',value)
                if(value){
                    this.makeToast(this.$t('approved_success'),'success')

                    let indexId = this.checkId(this.list,value.reference)
                    this.list.splice(indexId, 1);
                }

                this.$store.state.visits.statusapprove = false

            },
            getLink(value){
                console.log('link',value)
                window.open(value, '_blank')
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
