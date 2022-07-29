<template>
    <div class="main-content">

        <breadcumb :page="$t('st_inspections')" :folder="$t('list_visit_banc')" />

        <b-modal id="confirmvalid" scrollable no-close-on-backdrop title="Alerte" hide-footer>

            <p></p>
            <span class="badge badge-danger"><i class="text-20 i-Danger"></i></span>&nbsp;&nbsp;{{$t('confirmvalidins')}}
            <p></p>

            <div style="text-align: right">
                <b-button type="submit" style="margin-right: 10px" variant="outline-success rights" @click="registerStInspections()" >{{$t('Confirm')}}</b-button>
                <b-button  variant="outline-danger" @click="$bvModal.hide('confirmvalid')" >{{$t('Annuler')}}</b-button>

            </div>

     </b-modal>

            <b-row>

                <b-col md="5">
                    <b-overlay :show="loadanotherpage" rounded="sm" >
                    <b-row class="scroll-card" >


                             <b-card  no-body v-for="(item,index) in visites" @click="Loadin(item,index)"
                                 :class="[visites.length === 0 ? 'greu' : isSelected(index,item)]"
                                 :key="item.idVisite"

                                class="bg-dark text-white o-hidden mb-30 taille ">

                            <img v-if="item.carteGrise.produit.img==null" src="../../../assets/images/photo-long-1.jpg" alt />
                            <img v-else :src="res + item.carteGrise.produit.img" alt />


                            <div class="card-img-overlay">
                                <div class="text-center pt-4">
                                    <h5 class="card-title mb-2 text-white " style="font-size: 13px">{{item.carteGrise.numImmatriculation}}</h5>
                                    <div class="separator border-top mb-2"></div>
                                </div>
                            </div>

                        </b-card>

                        <div style="margin-top: 10px"></div>





                    </b-row>
                        <b-row>
                            <b-pagination
                                    v-model="currentpage"
                                    :total-rows="totalElement"
                                    per-page="10"
                                    align="center"
                                    @change="loadpage"
                            ></b-pagination>
                        </b-row>
                    </b-overlay>
                        <!--<b-list-group>

                            <b-list-group-item href="#" v-for="(item,index) in visites" @click="Loadin(item,index)" :class="(isSelected(index,item))"   :key="item.idVisite">
                                {{item.carteGrise.numImmatriculation}}
                            </b-list-group-item>

                        </b-list-group>-->

                </b-col>

                <b-col md="7">

                    <b-overlay :show="show" rounded="sm">

                        <b-form :aria-hidden="show ? 'true' : null"  ref="st_inspection" @submit.prevent="registerStInspection()">

                        <b-card >
                             <b-row>
                    <b-form-group
                            class="col-md-6 mb-30"
                            :label="$t('cat')"
                            label-for="input-1"
                    >

                            <b-form-input

                                    v-model="cat"
                                    type="text"
                                    disabled
                                    name="produitId"
                                    :placeholder="$t('cat')"
                            ></b-form-input>

                    </b-form-group>
                    <b-form-group
                            class="col-md-6 mb-30"
                            :label="$t('immatriculation')"
                            label-for="input-1"
                    >
                        <b-form-input

                                v-model="numImmatriculation"
                                type="text"
                                name="numImmatriculation"
                                :placeholder="$t('immatriculation')"
                        ></b-form-input>

                    </b-form-group>


                <b-form-group
                        class="col-md-6 mb-30"
                        :label="$t('ligne')"
                        label-for="input-1"
                >
                    <b-form-select
                            id="ligneId"
                            name="ligneId"
                            @change="changeligne"
                            v-model="ligneId"
                            :placeholder="$t('ligne')"
                            return-object
                    >
                        <b-form-select-option v-for="item in lines" :value="item"
                                              :key="item.description">

                            {{item.description}} </b-form-select-option>

                    </b-form-select>

                </b-form-group>
                <b-form-group
                        class="col-md-6 mb-30"
                        :label="$t('essieu')"
                        label-for="input-1"
                >
                    <b-form-select
                            ref="essieuselect"
                            id="essieu"
                            name="essieux"
                            :value-field="essieu2"
                            v-model="essieu"
                            :placeholder="$t('essieu')"
                            :options="essieux"
                    ></b-form-select>

                </b-form-group>

                <b-form-group
                        class="col-md-5 mb-30"
                        :label="$t('chassis')"
                        label-for="input-1"
                >
                    <b-form-input
                            v-uppercase
                            v-model="chassis"
                            type="text"
                            name="chassis"
                            :placeholder="$t('chassis')"
                    ></b-form-input>

                <!--
                    <br>
                    <img src="../../../assets/images/photo-long-2.jpg" style="width:200px;height:100px" />-->

                </b-form-group>

                <b-button class="btn btn-outline-success  btn-icon m-1" style="margin-top:25px!important;margin-bottom:20px!important;padding:1px!important;"
                          variant="primary" v-b-modal.registercustomer
                ><span class="ul-btn__icon"><i class="i-Camera"></i></span>
                </b-button>

                <b-form-group
                        class="col-md-6 mb-30"
                        :label="$t('kilometrage')"
                        label-for="input-1"
                >
                    <b-form-input

                            v-model="kilometrage"
                            type="number"
                            name="kilometrage"
                            :placeholder="$t('kilometrage')"
                    ></b-form-input>

                </b-form-group>

                        <b-col md="12" style="position:relative;text-align: right;margin-top: 2px">
                            <b-button class="mt-3" type="submit" variant="primary">{{$t('submit')}}</b-button>
                        </b-col>

                             </b-row>
                    </b-card>
                        <p v-once class="typo__p" v-if="submitStatus === 'OK'">
                            <!--{{ makeToast("success","success") }}-->
                        </p>
                        <p v-once class="typo__p" v-if="submitStatus === 'ERROR'">
                            {{ makeToast("Erreur","error") }}
                        </p>
                        <div v-once class="typo__p" v-if="submitStatus === 'PENDING'">
                            <div class="spinner sm spinner-primary mt-3"></div>
                        </div>

                    </b-form>

                    </b-overlay>
                </b-col>
            </b-row>


    </div>
</template>
<script>
    import { mapGetters,mapActions } from "vuex";
    import { required } from "vuelidate/lib/validators";
    import constants from '../../../plugins/constants'
    import Vue from 'vue'
    import { getRequestParams  } from '../../../plugins/functions'

    export default {
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Form Start"
        },

        props:{
            rowes:Object
        },

        data() {
            return {

                loadanotherpage:false,
                filter:"",
                pagesize:10,
                currentpage:1,
                totalElement:0,
                totalPages:0,

                res:constants.resource_urls,

                ligneId:0,
                chassis:"",
                essieu:0,
                essieu2:"",
                numImmatriculation:"",
                cats:[],
                cat:"",
                date:new Date(),
                submitStatus: null,
                show: false,
                visites:[],
                visite:{},
                selected: 0,
                kilometrage:0,
                lines:[
                ],
                essieux:[

                    {value:2,text:"2"},
                    {value:3,text:"3"},
                    {value:4,text:"4"},
                    {value:5,text:"5"},
                ]
            };
        },
        computed: {
            ...mapGetters(["getVisiteWaiting","GetStatusPost","getLines"]),
        },
        validations: {
            ligneId: {
                required
            }
        },

        methods: {
            ...mapActions(["visitestatus","startinspection","lignes"]),
            loadpage(params){

                this.currentpage = params
                this.loadanotherpage = true

                this.visitestatus(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))




            },

            checkId(obj, id) {
                console.log('retrait',obj)
                //this.visite.carteGrise.produit.produitId
                return obj.map(function(item) { return item.carteGrise.carteGriseId; }).indexOf(id);

            },

            setupStream() {

                // Not a real URL, just using for demo purposes
                let es = new EventSource(constants.resource_urls+"/public/subscribe/"+Vue.prototype.$keycloak.tokenParsed.sub);


                es.addEventListener('edit_visit', message => {
                    let data = JSON.parse(message.data);
                    //  this.stockData = data.stockData;


                   // let indexe =0;
                    /*indexe = this.checkIds(this.visites,(data.idVisite))
                    console.log('ssemessages10',indexe);
                    if(indexe > -1){
                        //this.list.$set(indexe, (message.body.data)[0]);
                        this.visites.splice(indexe, 1, (data))
                        //this.list.splice(indexe, 1, updatedList)
                        var audio = new Audio(require('../../../plugins/mixkit-message-pop-alert-2354.mp3'));
                        audio.play();
                    }*/
                    let indexId = this.checkId(this.visites,data.carteGrise.carteGriseId)
                    if(indexId > -1){
                        this.visites.splice(indexId, 1);

                        this.visites.sort();
                        var audio = new Audio(require('../../../plugins/mixkit-message-pop-alert-2354.mp3'));
                        audio.play();
                    }



                }, false);


            },
            checkIds(obj, id) {

                return obj.map(function(item) { return item.idVisite; }).indexOf(id);

            },
            changeligne(value){



              if(value.categorieVehicule.type==="PL"){
                this.essieux = [

                    {value:2,text:"2"},
                    {value:3,text:"3"},
                    {value:4,text:"4"},
                    {value:5,text:"5"},
                ]
              }else{
                  this.essieux = [

                      {value:2,text:"2"},
                  ]
                  this.essieu = this.essieux[0]
                  this.essieu2 = this.essieux[0].text
                   this.$refs.essieuselect.$options.
                  console.log('this.visite', this.essieu)
              }
            },
            Loadin(item,index){


                this.isSelected(index,item,true)
                this.updatevaluesform(item)

                this.visite = item
                console.log('item',item)

            },
            isSelected (index,i,b=false) {
                console.log('item',b)
                return 'active'
                /*if(b){
                if(this.rowes.reference === i.carteGrise.numImmatriculation ){

                    return 'active'
                }}else{
                    /!*if(i==)
                    return 'active'*!/
                }*/

            },

            updatevaluesform:function(item){

                console.log('item',item)
                this.numImmatriculation = item.carteGrise.numImmatriculation
                this.cat = item.carteGrise.produit.libelle

                if(item.carteGrise.produit.categorieVehicule.type==="VL"){
                    this.essieux = [{value:2,text:"2"}]

                }else{

                    this.essieux = [{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"}]

                }
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
            registerStInspection:function(){


                console.log('this.visite',this.visite.carteGrise.vehicule)
                if(this.visite.carteGrise.vehicule.chassis !== this.chassis){

                    this.$bvModal.show('confirmvalid')
                }else{
                    this.registerStInspections()
                }
            },
            registerStInspections:function(){
                console.log('hello')
                this.show = true
                this.$v.$touch();

                if (this.$v.$invalid) {

                    this.submitStatus = "ERROR";
                    this.show = false
                } else {
                    // do your submit logic here
                    this.submitStatus = "PENDING";
                    setTimeout(() => {

                        /*let indexId = this.checkId(this.visites,this.visite.carteGrise.carteGriseId)
                        this.visites.splice(indexId, 1);
                        this.visites.sort();*/

                        let formData = new FormData(this.$refs.st_inspection);

                        formData.append('numImmatriculation',this.numImmatriculation)
                        formData.append('visiteId',this.visite.idVisite)
                        formData.set("ligneId",this.ligneId.idLigne)
                        //formData.append('controleurId',this.$store.state.caisses.client.id)
                        formData.append("position","1,")

                        formData.set('produitId',this.visite.carteGrise.produit.produitId)

                        this.categorie = this.cat.libelle

                        const data = {}; // need to convert it
                        for (let [key, val] of formData.entries()) {
                            Object.assign(data, { [key]: val })
                        }

                        console.log('startinsp',data)

                        this.submitStatus = "OK";
                        this.startinspection(data)
                    }, 1000);
                }
            }
        },


        created(){
            this.setupStream();
        },
        mounted(){

            //this.setupStream();

            if(this.$store.state.authData.role.indexOf('caissier') !== -1){
                console.log('controleur1',this.$store.state.authData.role.indexOf('caissier') !== -1)
                this.$router.push({ name: 'box'})
                return;

            }

            /*this.$sse(constants.resource_urls+"/public/subscribe", { format: 'json' }).then(sse => {

                console.log('sse',sse);

                sse.subscribe('controleur_visit', (message) => {

                    console.log('ssemessage',message);

                    //if(message.statut.includes('A inspecter')){
                    var arrays = [];
                    arrays.push(message);
                    this.visites = (arrays).concat(this.visites);

                    //}

                   /!* if(indexe > -1){
                        //this.list.$set(indexe, (message.body.data)[0]);
                        this.list.splice(indexe, 1, (message))
                        //this.list.splice(indexe, 1, updatedList)
                    }*!/


                });

            });*/



            // this.visitestatus(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))
            this.loadanotherpage=false
            this.visitestatus(getRequestParams(this.filter,this.currentpage,this.pagesize,this.$i18n.locale))
            this.lignes()

        },

        watch:{

            getLines:function(value){

                this.lines = value
            },
            getVisiteWaiting:function (values) {

                this.visites = values.data.content
                this.loadanotherpage=false

                console.log('visit',this.visites)
                //let indexId = this.checkId(this.visites,this.rowes.reference)
                this.totalElement = values.data.page.totalElements;
                this.totalPages_ = values.data.page.totalPages;
                this.visite = this.visites[0]
                /*console.log('visitenattente',0)
                console.log('visitenattente',values)
                console.log('visit',this.visite)*/


                this.updatevaluesform(this.visite)


            },
            GetStatusPost:function (values) {

                this.show = false
                if(values.data.success){

                    this.numImmatriculation = "";
                    this.categorie = "";

                    //this.visites.reduce(this.visite)
                    console.log('visitresu',this.visite)
                    console.log('visitresu',this.visites)
                    this.$bvModal.hide('confirmvalid')
                    //let indexId = this.checkId(this.visites,this.visite.carteGrise.carteGriseId)
                    //this.visites.splice(indexId, 1);

                    //this.visites.sort();

                    this.makeToast(this.$t('success'),1)

                    this.essieu=0
                    this.chassis=0
                    this.kilometrage=0

                }else{
                    this.makeToast(this.$t('error'),0)
                }

            },


        }
    };
</script>

<style scoped>

    .scroll-card{
        display: flex !important;
        flex-direction: row;
        flex-grow: 1;
        overflow: auto;
    }

    .taille{
        width:100px;
        height: 100px;
        margin:10px;
        background: #ffffff9e;
    }
    .scroll-card{
        height: 320px;
        display: flex !important;
        flex-direction: row;
        flex-grow: 1;
        overflow: auto;
    }
    img {
        height:100vh;
    }
    greu{
        background-color: grey;
    }
    </style>