<template>

        <b-form :aria-hidden="show ? 'true' : null"  ref="cg" @submit.prevent="registerCg()" >

                <b-card style="background-color: #eee!important;">

                    <b-row>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('reference')"
                                label-for="input-1"
                        >

                            <AutoComplete ref="childAutos"
                                          @save-change="savechange"
                                          msg='reference'
                                          type="searchcg"
                                          :optionsKey="optionsKey3"
                                          :optionsKey1="optionsKey4"></AutoComplete>


                        </b-form-group>


                    </b-row>

                    <b-row>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('cat')"
                                label-for="input-1"
                        >

                            <b-form-input    
                                    autocomplete="off"
                                    v-model="cat.libelle"
                                    type="text"
                                    disabled
                                    name="produitId"
                                    :placeholder="$t('immatriculation')"
                            ></b-form-input>

                        </b-form-group>


                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('chassis*')"
                                label-for="input-1"
                        >


                            <AutoComplete
                                    msg='vehicules'
                                    type='all'
                                    ref="chassis"
                                    v-model="chassis"
                                    @save-change="setchassis"
                                    @register="loadvehicule"
                                    :optionsKey="optionsKey"
                                    :optionsKey1="optionsKey2"></AutoComplete>

                            <!--<AutoComplete  msg='clients' :optionsKey="optionsKey" :optionsKey1="optionsKey1"></AutoComplete>-->

                        </b-form-group>


                        <b-form-group
                                        class="col-md-3 mb-30"
                                        :label="$t('immatriculation*')"
                                        label-for="input-1"
                                >
                                   <!-- <ListSelect :list="cg"
                                                       v-model="numImmatriculation"
                                                       @select="changemodel"
                                                       option-value="carteGriseId"
                                                       option-text="numImmatriculation"
                                                       placeholder="Select Immatriculation">
                                    </ListSelect>-->
                                    <!--<b-form-input    
autocomplete="off"

                                            v-model="numImmatriculation"
                                            type="text"
                                            name="numImmatriculation"
                                            :placeholder="$t('immatriculation')"
                                    ></b-form-input>-->

                            <div>
                                <b-form-input    
autocomplete="off"

                                        type="text"
                                        v-model="numImmatriculation"
                                        @focus="deleteTexts()"
                                        placeholder=""
                                        size="sm"
                                        disabled

                                ></b-form-input>

                                <b-list-group v-if="listImmatriculation.length">

                                    <!--<b-list-group-item v-for="(s,i) in listImmatriculation" :key="i"
                                                       @click="selectied({item:s})">{{s.numImmatriculation}}


                                    </b-list-group-item>-->

                                </b-list-group>
                            </div>

                        </b-form-group>


                                <b-form-group
                                        class="col-md-3 mb-30"
                                        :label="$t('preImmatriculation')"
                                        label-for="input-1"
                                >
                                    <b-form-input    
autocomplete="off"
v-uppercase
                                            v-model.trim="$v.preImmatriculation.$model"
                                              v-model="preImmatriculation"
                                            type="text"
                                            name="preImmatriculation"
                                            :placeholder="$t('preImmatriculation')"


                                    ></b-form-input>

                                </b-form-group>


                                <b-form-group
                                        class="col-md-3 mb-30"
                                        :label="$t('datedebutvalidite')"
                                        label-for="input-1"
                                >
                                    <date-picker
                                            
                                            v-model="dateDebutValid"
                                            id="datedebutvalidite"
                                            name="dateDebutValid"
                                            valueType="format"
                                           ></date-picker>

                                </b-form-group>
                        <!--:language="lang"-->
                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('datefinvalidite')"
                                label-for="input-1"
                        >
                            <date-picker
                                    v-model="dateFinValid"
                                    name="dateFinValid"
                                    id="datefinvalidite"
                                         valueType="format"
                            ></date-picker>



                        </b-form-group>

                        <b-form-group
                                class=" mb-30 "
                                :label="$t('proprietaire*')"
                                label-for="input-1"
                                style="margin-left:15px;width:235px!important;"
                        >

                            <AutoComplete
                                    msg='proprietaires'
                                    type="all"
                                    ref="proprietaires"
                                    v-model="proprietaireId"
                                    @register="loadproprio"
                                    :optionsKey="optionsKey"
                                    :optionsKey1="optionsKey1"></AutoComplete>

                            <!--<b-form-select
                                    id="proprietaire"
                                    name="proprietaireId"
                                    v-model="proprietaireId"
                                    :placeholder="$t('proprietaire')"
                                    style="width:235px!important;"
                            >



                                <b-form-select-option  v-for="item in propriolist" :value="item.proprietaireVehiculeId"
                                                       :key="item.proprietaireVehiculeId">

                                    {{item.partenaire.nom}} {{item.partenaire.prenom}}</b-form-select-option>

                            </b-form-select>-->

                        </b-form-group>

                        <button class="btn btn-outline-success  btn-icon m-1" v-b-modal.registerproprio
                                style="margin-top:22px!important;padding:5px!important;margin-bottom:20px!important;"
                                type="button">
                            <span class="ul-btn__icon"><i class="i-Add"></i></span></button>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('ssdt id')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase

                                    v-model="ssdt_id"
                                    name="ssdt_id"
                                    type="text"
                                    :placeholder="$t('ssdt')"
                            ></b-form-input>

                            <!--<b-alert
                                    show
                                    variant="danger"
                                    class="error col-md-12 mt-1"
                                    v-if="!$v.ssdt.minLength"
                            >{{$t('validator_ssdt')}}
                                {{ $v.ssdt.$params.minLength.min }} {{$t('numbers')}}  .</b-alert
                            >-->

                        </b-form-group>

                        <b-form-group
                                class="col-md-3  mb-30"
                                :label="$t('adress')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase
                                    name="adresse"
                                    v-model="adresse"
                                    type="text"
                                    :placeholder="$t('adress')"
                            ></b-form-input>

                        </b-form-group>
                        <!--<b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('commune')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase

                                    v-model="commune"
                                    name="commune"
                                    type="text"
                                    :placeholder="$t('commune')"
                            ></b-form-input>

                        </b-form-group>-->

                        <b-form-group
                                class="col-md-3  mb-30"
                                :label="$t('montantPaye')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"

                                    name="montantPaye"
                                    v-model="montantPaye"
                                    type="number"
                                    :placeholder="$t('montantPaye')"
                            ></b-form-input>

                        </b-form-group>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('gage')"
                                label-for="input-1"
                        >
                            <!--<b-form-select

                                    name="vehiculeGage"
                                    v-model="vehiculeGage"
                                    :placeholder="$t('gage')"
                                    :options="gage"
                            >

                            </b-form-select>-->
                            <select class="form-control"
                                    name="vehiculeGage"
                                    v-model="vehiculeGage"
                                    :placeholder="$t('gage')"

                            >

                                <option v-for="item in gage" :value="item.id" :key="item.libelle">
                                    {{item.libelle}}
                                </option>

                            </select>

                        </b-form-group>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('genre')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase
                                    v-model="genreVehicule"
                                    name="genreVehicule"
                                    type="text"
                                    :placeholder="$t('genre')"
:disabled="sgenre"
                            ></b-form-input>

                        </b-form-group>
                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('marque*')"
                                label-for="input-1"
                        >
                            <select class="form-control"
                                    name="marqueVehiculeId"
                                    id="marqueVehiculeId"
                                    v-model="marqueVehiculeId"
                                    :disabled="smarque"

                            >

                                <!--<option :value="marques2.marqueVehiculeId" selected>{{marques2.libelle}}</option>-->
                                <option v-for="item in marques" :value="item.marqueVehiculeId" :key="item.marqueVehiculeId">
                                    {{item.libelle}}
                                </option>

                            </select>

                        </b-form-group>



                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('typeVehicule*')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase
                                    v-model.trim="$v.type.$model"
                                    v-model="type"
                                    name="type"
                                    type="text"
                                    :placeholder="$t('typeVehicule')"
:disabled="stype"
                            ></b-form-input>

                        </b-form-group>


                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('carosserie')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase
                                    name="carrosserie"
                                    v-model="carrosserie"
                                    type="text"
                                    :placeholder="$t('carosserie')"
                                    :disabled="scarrosserie"
                            ></b-form-input>

                        </b-form-group>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('enreg')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase
                                    type="text"
                                    v-model="enregistrement"
                                    name="enregistrement"
                                    :placeholder="$t('enreg')"
                            ></b-form-input>

                        </b-form-group>


                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('dateFirstCirculation')"
                                label-for="input-1"
                        >


                            <date-picker name="premiereMiseEnCirculation" v-model="premiereMiseEnCirculation" :disabled="spremiereMiseEnCirculation" valueType="format"></date-picker>

                            <!--&lt;!&ndash;<b-input-group v-b-modal="modalId">
                                <template #prepend>
                                    <b-button variant="transparent" class="border border-right-0">
                                        <i icon="calendar"></i>
                                    </b-button>
                                </template>
                                <label class="form-control border-left-0 cursor-pointer">
                                    {{ dateContext.selectedFormatted }}
                                </label>
                            </b-input-group>&ndash;&gt;

                            <b-modal :id="modalId" centered hide-header hide-footer no-fade static content-class="w-auto mx-auto">
                                <b-calendar v-model="premiereMiseEnCirculation" @context="ctx => dateContext = ctx"></b-calendar>
                            </b-modal>-->


                        </b-form-group>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('energie*')"
                                label-for="input-1"
                        >
                            <!--<b-form-select
                                    id="energie"
                                    v-model="energieId"
                                    name="energieId"
                                    :placeholder="$t('energie')"
                            >-->

                            <select class="form-control"
                                    id="energie"
                                    name="energieId"
                                    v-model="energieId"
                                    :disabled="senergie"
                            >

                                <!--<option :value="energies2.energieId" selected>{{energies2.libelle}}</option>-->
                                <option v-for="item in energies" :value="item.energieId" :key="item.energieId">
                                    {{item.libelle}}
                                </option>

                            </select>


                            <!--<b-form-select-option v-for="item in energies" :value="item.energieId" :key="item.energieId">
                                {{item.libelle}}</b-form-select-option>-->

                            <!--</b-form-select>-->

                        </b-form-group>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('cylindre*')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"
v-uppercase
                                    type="number"
                                    v-model="cylindre"
                                    name="cylindre"
                                    :placeholder="$t('cylindre*')"
:disabled="scylindre"
                            ></b-form-input>

                        </b-form-group>

                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('places')"
                                label-for="input-1"
                                :disabled="splaces"
                        >
                            <b-form-input    
autocomplete="off"

                                    type="number"
                                    v-model="places"
                                    name="places"
                                    :placeholder="$t('places')"
                            ></b-form-input>

                        </b-form-group>
                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('pa')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"

                                    name="puissAdmin"
                                    v-model="puissAdmin"
                                    type="number"

                                    :placeholder="$t('pa')"
                            ></b-form-input>

                        </b-form-group>


                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('poids_vide')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"

                                    v-model="poidsvide"
                                    type="number"
                                    name="poidsVide"
                                    :placeholder="$t('poids_vide')"
                            ></b-form-input>

                        </b-form-group>
                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('charge_utile')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="off"

                                    v-model="chargeutile"
                                    type="number"
                                    name="chargeUtile"
                                    :placeholder="$t('charge_utile')"
                            ></b-form-input>

                        </b-form-group>
                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('poidTotal')"
                                label-for="input-1"
                        >

                            <b-form-input    
autocomplete="off"

                                    v-model="poidTotal"
                                    type="number"
                                    disabled
                                    name="poidsTotalCha"
                                    :placeholder="$t('poidTotal')"
                            ></b-form-input>


                        </b-form-group>


                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('dateDelivrance')"
                                label-for="input-1"
                        >


                           <!-- <Datepicker :format="customFormatter"
                                    
                                    id="dateDelivrance"
                                    v-model="dateDelivrance"
                                    name="dateDelivrance"
                                    class="mb-2">

                            </Datepicker>-->
                            <date-picker v-model="dateDelivrance" valueType="format"></date-picker>

                        </b-form-group>


                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('lieuDelivrance')"
                                label-for="input-1"
                        >

                            <b-form-input    
autocomplete="off"
v-uppercase
                                    v-model="lieuDedelivrance"
                                    type="text"
                                    name="lieuDedelivrance"
                                    :placeholder="$t('lieuDelivrance')"
                            ></b-form-input>

                        </b-form-group>



                        <b-form-group
                                class="col-md-3 mb-30"
                                :label="$t('centre_ssdt')"
                                label-for="input-1"
                        >
                            <b-form-input    
autocomplete="on"

v-uppercase
                                    type="text"
                                    v-model="centre_ssdt"
                                    name="centre_ssdt"
                                    :placeholder="$t('centre_ssdt')"

                            ></b-form-input>


                        </b-form-group>


                        <registerPartners
                                id="registerproprio"
                                :title="$t('register_proprio')"
                                type="cg/proprietaires"
                                @registerpartners="registerCustomer"></registerPartners
                        >


                            </b-row>

                    <b-col md="12" style="position:relative;text-align: right;margin-top: 0px!important;">
                        <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
                    </b-col>
                    <br>

                </b-card>

            <!--<p v-once class="typo__p" v-if="submitStatus === 'OK'">
                &lt;!&ndash;{{ makeToast("success","success") }}&ndash;&gt;
            </p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">
                {{ makeToast("Remplissez tous les champs obligatoires","error") }}
            </p>
            <div v-once class="typo__p" v-if="submitStatus === 'PENDING'">
                <div class="spinner sm spinner-primary mt-3"></div>
            </div>-->

        </b-form>

</template>

<script>

    import {  } from "vuelidate/lib/validators";
    import { mapGetters,mapActions } from "vuex";
    import registerPartners from "../components/registerpartners"
    import AutoComplete from "../caisses/Autocomplete"
    import moment from 'moment'
    import { focusOut  } from '../../../plugins/functions'


    //import Datepicker from 'vuejs-datepicker';
    //import { ListSelect } from 'vue-search-select'
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {

        props:{
            rowes:Object
        },
        data() {
            return {
                smarque:false,
                stype:true,
                sgenre:true,
                scarrosserie:true,
                splaces:true,
                scylindre:true,
                spremiereMiseEnCirculation:true,
                senergie:false,

                spuissAdmin : false,
                datecrea : false,

                lang:"",
                modalId: 'date-picker-modal',
                show:false,
                optionsKey:"nom",
                optionsKey1:"proprietaire",
                optionsKey2:"chassis",

                optionsKey3:"client",
                optionsKey4:"reference",
                marques:[],
                marques2:{
                },
                propriolist:[],
                vehicule:"",
                energies:[],
                energies2:{},
                cats:[],
                cat:{},
                cg:[],
                categorie:"",
                chargeutile:0,
                poidsvide:0,
                poidTotal:0,
                gage:[
                    {id:true,
                        libelle:"oui"},
                    {id:false,libelle:"non"}],

                status: false,
                birthday:null,

                numImmatriculation:"",
                document:"cg",
                listImmatriculation:[],

                preImmatriculation:"",
                type:"",
                premiereMiseEnCirculation:"",

                dateDebutValid:"",
                dateFinValid:"",
                dateDelivrance:"",
                lieuDedelivrance:"",
                montantPaye:"",
                proprietaireId:"",
                ssdt_id:"",
                commune:"hello",
                marqueVehiculeId:"",
                genreVehicule:"",
                energieId:"",
                visiteId:"",
                produitId:"",
                carrosserie:"",
                puissAdmin:"",
                enregistrement:"",
                adresse:"",
                chassis:"",
                centre_ssdt:"",
                cylindre:"",
                addId:{},
                places:"",
                vehiculeGage:"",
                item:{},

                submitStatus: null

            }
        },
        components:{
            registerPartners,AutoComplete, DatePicker
        },

        validations: {
            /*preImmatriculation: {
                required,
                minLength: minLength(1)
            },
            type: {
                required,
                minLength: minLength(1)
            },
            proprietaireId: {
                required,
                minLength: minLength(1)
            },*/

            /*ssdt: {
                required,
                minLength: maxLength(9)
            },*/
        },

        computed: {
            ...mapGetters(["getMarques","getEnergie","getCatProducts","getProprioList","getCustomer","getCg"])
        },
        methods:{
            ...mapActions(["registercge","FetchCatProducts","gmarques","genergies","gproprietaire","registerCustom","searchcartegrise"]),

            customFormatter(date) {
                return moment(date).format('yyyy-MM-DD');
            },
            initformcg(){


                this.$refs.childAutos.resetWindow();
                this.$refs.proprietaires.selects();
                this.$refs.chassis.selects();

                this.cylindre = ""
                this.energieId = ""
                this.marqueVehiculeId = ""
                this.type=""
                this.places = ""
                this.ssdt_id = ""
                this.premiereMiseEnCirculation = ""
                this.carrosserie = ""
                this.poidsvide = ""
                this.chargeutile = ""
                this.poidTotal = ""
                this.puissAdmin = ""
                this.lieuDedelivrance = ""
                this.dateDebutValid = ""
                this.dateFinValid = ""
                this.dateDelivrance = ""
                this.chassis = ""
                this.proprietaireId = ""

                this.preImmatriculation = ""
                this.montantPaye = ""
                this.commune = ""
                this.genreVehicule = ""
                this.enregistrement = ""
                this.centre_ssdt = ""
                this.vehiculeGage = ""
                this.adresse = ""
                this.$store.state.cg.chassis = ""

            },


            savechange(data){

                console.log('savechanges',data.item)

                switch (data.msg) {

                    case 'reference':

                        this.loadvehicule(data.item.carteGrise)
                        this.$refs.chassis.selects(data.item.chassis);

                        this.document  = data.item.document

                        //this.checkdocument(this.document)


                        this.$refs.proprietaires.selects(data.item.carteGrise.proprietaireVehicule.partenaire.nom);
                        this.numImmatriculation = data.item.carteGrise.numImmatriculation
                        this.visiteId = data.item.id;
                        console.log('savechanges',data.item.id)
                        break;
                }


            },
            uppercase(){

                console.log('noms',this.preImmatriculation)
                this.preImmatriculation  = focusOut(this.preImmatriculation)
                console.log('noms',this.preImmatriculation)

            },

            deleteTexts:function(){
                this.addId.send=false
                console.log('change1',this.addId)
            },

            selectied:function(data){


                this.addId.send=true
                this.addId.carteGriseId=data.item.carteGriseId
                this.listImmatriculation=[]
                this.numImmatriculation = data.item.numImmatriculation


            },
            searchCg:function(){

                /*if (this.numImmatriculation.length === 0) {
                    cg = [];
                    return;
                }*/
                let i = this.numImmatriculation

                const r = this.cg.filter(
                    suggestion => suggestion["numImmatriculation"].toLowerCase().indexOf(i.toLowerCase()) > -1,
                );
                console.log('change',r)
                this.listImmatriculation=r

            },
            setchassis(value){
                console.log('this.chassis', value.item)
                this.$store.state.cg.chassis = value.chassis

                console.log('this.chassis', this.$store.state.cg.chassis)
                this.loaddatavehicule(value)
            },

            loadproprio(data){

                console.log('data',data.id)

                this.proprietaireId = data.id;
            },
            loaddatavehicule(data){


                this.carrosserie = data.carrosserie
                this.places = data.placeAssise
                this.chassis = data.chassis
                this.premiereMiseEnCirculation = data.premiereMiseEnCirculation
                this.puissAdmin = data.puissAdmin
                this.poidsvide = data.poidsVide
                this.chargeutile = data.chargeUtile
                this.cylindre = data.cylindre
                this.marqueVehiculeId = data.marqueVehicule.marqueVehiculeId
                this.energieId = data.energie.energieId

            },
            loadvehicule(data){



                this.produitId = data.produit.produitId

                this.numImmatriculation = data.numImmatriculation
                this.cat.libelle = data.produit.libelle
                this.cylindre = data.vehicule.cylindre
                this.energieId = data.vehicule.energie.energieId
                this.marqueVehiculeId = data.vehicule.marqueVehicule.marqueVehiculeId

                console.log('marqueVehiculeId',this.marqueVehiculeId)
                console.log('energieId',this.energieId)

                this.type=data.type
                this.places = data.vehicule.placeAssise
                this.ssdt_id = data.ssdt_id
                this.premiereMiseEnCirculation = this.customFormatter(data.vehicule.premiereMiseEnCirculation)
                this.carrosserie = data.vehicule.carrosserie
                this.poidsvide = data.vehicule.poidsVide
                this.chargeutile = data.vehicule.chargeUtile
                this.poidTotal = data.vehicule.poidsTotalCha
                this.puissAdmin = data.vehicule.puissAdmin
                this.lieuDedelivrance = data.lieuDedelivrance
                this.dateDebutValid = this.customFormatter(data.dateDebutValid)
                this.dateFinValid = this.customFormatter(data.dateFinValid)

                this.dateDelivrance = this.customFormatter(data.dateDelivrance)
                this.chassis = data.vehicule.chassis
                this.proprietaireId = data.proprietaireVehicule.proprietaireVehiculeId

                this.preImmatriculation = data.preImmatriculation
                this.montantPaye = data.montantPaye
                this.commune = data.commune
                this.genreVehicule = data.genreVehicule
                this.enregistrement = data.enregistrement
                this.centre_ssdt = data.centre_ssdt

                this.vehiculeGage =data.vehiculeGage

                this.adresse = data.commune
                this.$store.state.cg.chassis = data.vehicule.chassis
                this.$refs.chassis.selects(data.vehicule.chassis);

                this.$refs.proprietaires.selects(data.document);

                //this.checkdocument(this.document)

            },
            registerCg: function(){

                
                this.$v.$touch();
                if (this.$v.$invalid) {

                    this.submitStatus = "ERROR";
                    this.makeToast("Remplissez tous les champs obligatoires",'error')
                    //this.show = !this.show

                } else {

                    console.log('premiereMiseEnCirculation',this.dateFinValid)
                    // do your submit logic here
                    this.submitStatus = "PENDING";

                    console.log('localefr',this.preImmatriculation)

                    if(this.proprietaireId.length===0){
                        this.makeToast(this.$t('errorproprietaire'),'error')
                        return ;
                    }
                    if(!this.type){
                        this.makeToast(this.$t('errortype'),'error')
                        return ;
                    }

                    console.log('localefr',this.$store.state.cg.chassis.length)
                    if( this.$store.state.cg.chassis.length===0){
                        this.makeToast(this.$t('errorchassis'),'error')
                        return ;
                    }  if(this.cylindre.length===0){
                        this.makeToast(this.$t('errorcylindre'),'error')
                        return ;
                    }

                    if(this.marqueVehiculeId.length===0){
                        this.makeToast(this.$t('errorvehicule'),'error')
                        return ;
                    }

                    console.log('localefr',this.energieId.length)
                    if(this.energieId.length===0){
                        this.makeToast(this.$t('errorenergie'),'error')
                        return ;
                    }


                    //this.checkdocument(this.document)
                    //console.log(this.document+"hh")

                    this.show = !this.show
                    setTimeout(() => {
                        let formData = new FormData(this.$refs.cg);

                        if (typeof this.rowes === "undefined"){
                            formData.append('visiteId',this.visiteId)
                            formData.set('produitId',this.produitId)
                        }else{
                            formData.append('visiteId',this.rowes.id)
                            formData.set('produitId',this.cat.produitId)
                        }


                        formData.append('dateDebutValid',this.dateDebutValid)
                        formData.append('dateFinValid',this.dateFinValid)
                        formData.append('dateDelivrance',this.dateDelivrance)
                        formData.append('premiereMiseEnCirculation',this.premiereMiseEnCirculation)

                        formData.append('numImmatriculation',this.numImmatriculation)
                        formData.append('chassis', this.$store.state.cg.chassis)
                        formData.append('proprietaireId',this.proprietaireId)
                       // formData.append('premiereMiseEnCirculation',this.premiereMiseEnCirculation)

                        if(this.addId.send){
                            formData.append('carteGriseId',this.addId.carteGriseId)
                        }
                        this.categorie = this.cat.libelle

                        const data = {}; // need to convert it
                        for (let [key, val] of formData.entries()) {
                            Object.assign(data, { [key]: val })
                        }

                        //console.log('data',this.id)
                        console.log('data',data)
                        this.submitStatus = "OK";

                        //this.registercge(data)
                        this.$emit("registercge",data);


                    }, 1000);
                }

            },
            checkdocument(document){

                switch(document){

                    case "cg":

                        this.allcheck()


                        break;

                     case "cerfimma":

                         this.sgenre=false
                         this.scarrosserie = false
                         this.cylindre = false
                         this.puissAdmin = false
                         this.datecrea = false

                         if(this.proprietaireId.length===0){
                             this.makeToast(this.$t('errorproprietaire'),'error')
                             return ;
                         }
                        //this.allcheck()
                         if(this.marqueVehiculeId.length===0){
                             this.makeToast(this.$t('errorvehicule'),'error')
                             return ;
                         }

                         if(this.genreVehicule.length===0){
                             this.makeToast(this.$t('errorgenre'),'error')
                             return ;
                         }

                         if(this.carrosserie.length===0){
                             this.makeToast(this.$t('errorcarroserie'),'error')
                             return ;
                         }
                         if(this.cylindre.length===0){
                             this.makeToast(this.$t('errorcylindre'),'error')
                             return ;
                         }
                         if(this.puissAdmin.length===0){
                             this.makeToast(this.$t('errorpuiss'),'error')
                             return ;
                         }
                         if(this.premiereMiseEnCirculation > this.rowes.date ){
                             this.makeToast(this.$t('errorcg3'),'error')
                             return ;
                         }
                         if(this.premiereMiseEnCirculation > this.dateDelivrance ){
                             this.makeToast(this.$t('errorcg4'),'error')
                             return ;

                         }

                        break;

                    case "civio":

                        
                        if(this.marqueVehiculeId.length===0){
                            this.makeToast(this.$t('errorvehicule'),'error')
                            return ;
                        }

                        this.sgenre=false
                        if(this.genreVehicule.length===0){
                            this.makeToast(this.$t('errorgenre'),'error')
                            return ;
                        }

                        this.scarrosserie=false
                        if(this.carrosserie.length===0){
                            this.makeToast(this.$t('errorcarroserie'),'error')
                            return ;
                        }

                        this.splaces=false
                        if(this.places.length===0){
                            this.makeToast(this.$t('errorplaces'),'error')
                            return ;
                        }

                        this.scylindre=false
                        if(this.cylindre.length===0){
                            this.makeToast(this.$t('errorcylindre'),'error')
                            return ;
                        }
                        
                        if(this.energieId.length===0){
                            this.makeToast(this.$t('errorenergie'),'error')
                            return ;
                        }

                        this.spremiereMiseEnCirculation = false
                        if(this.premiereMiseEnCirculation.length===0){
                            this.makeToast(this.$t('errorfirstcirculation'),'error')
                            return ;
                        }
                        break;


                    case "cerfvente":
                      
                            this.stype=false,
                            this.sgenre=false,
                            this.scarrosserie=false,
                            this.splaces=false,
                            this.scylindre=false,
                            this.spremiereMiseEnCirculation=false
                        this.allcheck()
                           
                        break;

                    case "autres":
                        
                            this.stype=false,
                            this.sgenre=false,
                            this.scarrosserie=false,
                            this.splaces=false,
                            this.scylindre=false,
                            this.spremiereMiseEnCirculation=false
                        this.allcheck()
                           
                        break;

                }

            },

            allcheck(){
                console.log("smarque","sm")
                
                this.stype=false,
                this.sgenre=false,
                this.scarrosserie=false,
                this.splaces=false,
                this.scylindre=false,
                this.spremiereMiseEnCirculation=false
               

                if(this.preImmatriculation.length===0){
                    this.makeToast(this.$t('errorprenum'),'error')
                    return ;
                }

                console.log('localefr',this.type)
                if(!this.type){
                    this.makeToast(this.$t('errortype'),'error')
                    return ;
                }

                console.log('localefr',this.$store.state.cg.chassis.length)
                if( this.$store.state.cg.chassis.length===0){
                    this.makeToast(this.$t('errorchassis'),'error')
                    return ;
                }


                console.log('localefr',this.dateDebutValid.length)
                if(this.dateDebutValid.length===0){
                    this.makeToast(this.$t('errordebutvalid'),'error')
                    return ;
                }
                console.log('localefr',this.dateFinValid.length)
                if(this.dateFinValid.length===0){
                    this.makeToast(this.$t('errorfinvalid'),'error')
                    return ;
                }

                console.log('localefr',this.proprietaireId.length)
                if(this.proprietaireId.length===0){
                    this.makeToast(this.$t('errorproprietaire'),'error')
                    return ;
                }


                console.log('localefr',this.ssdt_id.length)
                if(this.ssdt_id.length===0){
                    this.makeToast(this.$t('errorssdt'),'error')
                    return ;
                }

                console.log('localefr',this.adresse.length)
                if(this.adresse.length===0){
                    this.makeToast(this.$t('erroradress'),'error')
                    return ;
                }



                console.log('localefr',this.montantPaye.length)
                if(this.montantPaye.length===0){
                    this.makeToast(this.$t('errorpaidamount'),'error')
                    return ;
                }

                console.log('localefr',this.vehiculeGage.length)
                if(this.vehiculeGage.length===0){

                    this.makeToast(this.$t('errorvgage'),'error')
                    return ;
                }

                console.log('localefr',this.genreVehicule.length)
                if(this.genreVehicule.length===0){
                    this.makeToast(this.$t('errorgenre'),'error')
                    return ;
                }

                console.log('localefr',this.carrosserie.length)
                if(this.carrosserie.length===0){
                    this.makeToast(this.$t('errorcarroserie'),'error')
                    return ;
                }

                console.log('localefr',this.enregistrement.length)
                if(this.enregistrement.length===0){
                    this.makeToast(this.$t('errorenregistrement'),'error')
                    return ;
                }

                console.log('localefr',this.cylindre.length)
                if(this.cylindre.length===0){
                    this.makeToast(this.$t('errorcylindre'),'error')
                    return ;
                }

                console.log('localefr',this.places.length)
                if(this.places.length===0){
                    this.makeToast(this.$t('errorplaces'),'error')
                    return ;
                }

                console.log('localefr',this.puissAdmin.length)
                if(this.puissAdmin.length===0){
                    this.makeToast(this.$t('errorpuiss'),'error')
                    return ;
                }

                console.log('localefr',this.poidsvide.length)
                if(this.poidsvide.length===0){
                    this.makeToast(this.$t('errorcg5'),'error')
                    return ;
                }

                console.log('localefr',this.chargeutile.length)
                if(this.chargeutile.length===0){
                    this.makeToast(this.$t('errorchutile'),'error')
                    return ;
                }

                console.log('localefr',this.centre_ssdt.length)
                if(this.centre_ssdt.length===0){
                    this.makeToast(this.$t('errorcentrssdt'),'error')
                    return ;
                }

                console.log('localefr',this.marqueVehiculeId.length)
                if(this.marqueVehiculeId.length===0){
                    this.makeToast(this.$t('errorvehicule'),'error')
                    return ;
                }

                console.log('localefr',this.energieId.length)
                if(this.energieId.length===0){
                    this.makeToast(this.$t('errorenergie'),'error')
                    return ;
                }


                console.log('localefr',this.premiereMiseEnCirculation.length)
                if(this.premiereMiseEnCirculation.length===0){
                    this.makeToast(this.$t('errorfirstcirculation'),'error')
                    return ;
                }

                console.log('localefr',this.dateDelivrance.length)
                if(this.dateDelivrance.length===0){
                    this.makeToast(this.$t('errordatedelivrance'),'error')
                    return ;
                }

                console.log('localefr',this.lieuDedelivrance.length)
                if(this.lieuDedelivrance.length===0){
                    this.makeToast(this.$t('errorlieuDedelivrance'),'error')
                    return ;
                }


                if(this.dateFinValid < this.dateDebutValid){
                    this.makeToast(this.$t('errordatesup'),'error')
                    return ;
                }

                if(this.dateDelivrance > moment().format("yyyy-MM-DD")){

                    this.makeToast(this.$t('errorcg1'),'error')
                    return ;
                }

                if(this.dateDelivrance < this.premiereMiseEnCirculation){
                    this.makeToast(this.$t('errorcg2'),'error')
                    return ;
                }

                if(this.premiereMiseEnCirculation > moment().format("yyyy-MM-DD") ){
                    this.makeToast(this.$t('errorcg3'),'error')
                    return ;
                }
                if(this.premiereMiseEnCirculation > this.dateDelivrance ){
                    this.makeToast(this.$t('errorcg4'),'error')
                    return ;

                }

                /*if(this.rowes.date > moment().format("yyyy-MM-DD")){
                    this.makeToast(this.$t('errorcg6'),'error')
                    return ;
                }*/
            },

            /*makeToast(variant = null,type="info") {
                this.$toasted.show(variant,{type:type})
            },*/

            makeToast(variant = null,type) {

                switch (type) {
                    case 0: type="error"; break;
                    case 1: type="success" ; break;
                    case 2: type="info"; break;
                    case 3: type="warning"; break;

                }

                this.$toasted.show(this.$t(variant),{type:type})


            },


            makeToastTwo(variant = null) {
                console.log('Successfully Submitted')

                this.$bvToast.toast("Successfully Submitted", {
                    title: `Variant ${variant || "default"}`,
                    variant: variant,
                    solid: true
                });
            },
            registerCustomer(variant = null) {

                this.registerCustom(variant)

            },
        },

        beforeMount(){
            this.gmarques()
            this.genergies()
        },
        mounted(){

            this.lang = this.$i18n.locale


            console.log("smarquee",this.rowes.document)
            this.document  = this.rowes.document //.item.document

            this.checkdocument(this.document)

            /*if (typeof this.rowes === "undefined"){
                this.$router.push({ name: 'allvisit_list',params:{id:'0'} })
            }*/


            //this.FetchCatProducts()
            //this.gproprietaire()
            if(this.rowes.chassis!==""){
                this.searchcartegrise(this.rowes.chassis)
            }

            console.log('rowea',this.rowes)

            this.numImmatriculation = this.rowes.reference
            this.cat.produitId = this.rowes.categorie.produitId
            this.cat.libelle = this.rowes.categorie.libelle
            this.cat = this.rowes.categorie
            this.cats.push(this.cat)
        },

        watch:{
            /*premiereMiseEnCirculation(newVal, oldVal) {
                if(newVal !== oldVal) {
                    this.$bvModal.hide(this.modalId)
                }
                this.premiereMiseEnCirculation = newVal;
            },*/
            chargeutile(newval){
                this.poidTotal = parseInt(this.poidsvide===""?0:this.poidsvide) + parseInt(newval===""?0:newval)
            },
            poidsvide(newval){
                this.poidTotal = parseInt(this.chargeutile===""?0:this.chargeutile) + parseInt(newval===""?0:newval)

            },
            getMarques(value){

                this.marques = value

            },
            getEnergie(value){
                this.energies = value

            },
            getCatProducts: function(value){
               // this.cats = value
                console.log('waiting',value)
            },

            getCg(value){
                console.log('cge',value)
                this.cg = value
                this.loadvehicule(value[0])
               // this.searchCg()

            },
            getProprioList: function(value){

                this.propriolist = value

            },
            getCustomer(val){

                if(val.proprietaireVehiculeId!=0) {

                    this.$bvModal.hide('registerproprio')
                    this.propriolist.push(val)

                    this.makeToast(this.$t('proprio_add'),'success')
                }else{
                    this.show=false
                    this.makeToast(this.$t('customer_denied'), "error")
                }
            },



        }
    }

</script>
<style scoped >
    .cursor-pointer {
        cursor: pointer;
    }

    .form-control{
        font-size: 0.8rem!important;
    }
    .custom-select{
        height: calc(2rem )!important;
    }
    select.form-control{
        height: calc(2rem )!important;
    }
    .form-group{
        margin-bottom:0.1rem
    }
</style>