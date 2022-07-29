<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="main-content">

        <salesreceipt :encaissements="encaissements"
                      :encompte="encompte"
                      :box="box"
                      :invoice_tax ="invoice_taxs"
                      :field="field"
                      :codepays="codepays"
                      :devise="devise"
                      :listproducts="listproducts"
                      :country="country"
                      @print="print"
        @cancels="cancels"></salesreceipt>


        <bilan :data="bilan"></bilan>

        <b-button  style="right: 0;position: absolute" v-if="boxopen===true" pill variant="success m-1"
                   @click ="openmodalbox"  ><i class="i-Folder-Open"></i>
        </b-button>

        <b-button  style="right: 0;position: absolute" v-else pill variant="danger m-1" @click ="closemodalbox" >
            <i class="i-Close"></i></b-button>

        <b-col md="12" style="position:relative;text-align: right" >
            <!--{{$t('close_box')}}-->

            <b-overlay :show="openb" rounded="sm" >

                <b-modal id="confirmopenAccount" :title="$t('open_box')" hide-footer>

                <template #modal-header="{}">
                    <!-- Emulate built in modal header close button action -->
                    <h5>{{$t('open_box')}}</h5>
                </template>

                <template #default="{  }">

                    <b-form-input

                            v-model="ouvertureAmount"
                            type="number"
                            :placeholder="$t('Montant_Encaisse')"
                    ></b-form-input>
                    <p></p>
                    <div style="text-align: right">
                        <b-button  :disabled="!openb" @click="openBox()" variant="outline-success" style="margin-right: 15px">{{$t('open')}}</b-button>
                    </div>

                </template>

                </b-modal>

            </b-overlay>

            <!--<b-overlay :show="closeb" rounded="sm" >-->

             <b-modal id="confirmcloseAccount"  title="Confirmer la fermeture de la Caisse" hide-footer>
                <p></p>

                <template #default="{}">

                    <b-form-input
                            v-model="ouvertureAmount"
                            type="number"
                            :placeholder="$t('Montant_Close')"

                    ></b-form-input>


                    <p></p>

                    <div style="text-align: right">
                        <b-button :disabled="!closeb" type="submit" variant="outline-success rights"
                                  @click="closeBox()" >{{$t('close')}}</b-button>
                    </div>

                </template>

            </b-modal>

            <!--</b-overlay>-->

        </b-col>

        <breadcumb :page="$t('caisse')" :folder="date"   /> <!--:montant=""-->

        <b-overlay :show="show" rounded="sm" >

            <b-card  :aria-hidden="show ? 'true' : null"  class="overlay-box">
                <!--title="Form Inputs"-->


                <b-row>
                    <b-col md="6">


                        <b-row>
                            <Catproductes :cats="cat"  @FetcProduct="FetchProduct"></Catproductes>
                        </b-row>
                        <p></p>


                        <b-row>

                            <b-form-group
                                    class="col-md-10 mb-30"
                                    :label="$t('Reference')"
                                    label-for="input-1"

                            >
                                <reference :formattedreferenceValue="form.Reference"
                                           @setlistpr="setlistpr" @setrefoverlay="setoverlay"
                                           @setreference="setreference"></reference>

                            </b-form-group>

                            <div class="spinner spinner-info" v-if="show_refer"
                                 style="position:absolute;margin-top:29px!important;
                             margin-left:33px!important;
                             width:15px;height:15px;"></div>
                            <!--<div class="col-md-1" >

                                <button class="btn btn-outline-success  btn-icon m-1" @click="searchreference()"
                                        style="margin-top:25px!important;padding:4px!important;" type="button">
                                    <span class="ul-btn__icon"><i class="i-Search-People"></i></span></button>

                            </div>-->

                        </b-row>
                        <b-overlay :show="forcard" rounded="sm" >
                            <b-row class="scroll-card">

                                <b-card no-body v-for="item in products" :key="item.produit.produitId"  @click="Addcat(item)"
                                    class="bg-dark text-white o-hidden mb-30 taille " style="margin-left:28px!important;">

                                <img v-if="item.produit.img==null" src="../../../assets/images/photo-long-1.jpg" alt />

								<img v-else :src="resources_urls + item.produit.img" alt />
                                <!--<img v-if="item.produit.img==null" v-auth-image="../../../assets/images/photo-long-1.jpg" alt>
                                <img v-else v-auth-image="../../../assets/images/photo-long-1.jpg" alt />-->

                                <div class="card-img-overlay">
                                    <div class="text-center pt-4">
                                        <h5 class="card-title mb-2 text-white " style="font-size: 13px">{{$t(item.produit.libelle )}}</h5>
                                        <div class="separator border-top mb-2"></div>
                                    </div>
                                </div>

                            </b-card>

                            </b-row>
                        </b-overlay>

                    </b-col>
                    <b-col md="6">
                        <b-row>
                            <b-form-group
                                    class="col-md-10 mb-30"
                                    :label="$t('Client')"
                                    label-for="input-1"
                            >
                                <AutoComplete  msg='clients' type='caisse' :optionsKey="optionsKey"
                                               :optionsKey1="optionsKey1"></AutoComplete><!---->

                            </b-form-group>

                            <div class="bv-no-focus-ring" style="margin-top: 17px">

                                <b-button class="btn btn-outline-success  btn-icon m-1" style="margin-top:5px!important;padding:4px!important;"
                                          @click="showModal = true" variant="primary" v-b-modal.registercustomer
                                ><span class="ul-btn__icon"><i class="i-Add"></i></span>
                                </b-button>


                                <registerPartners
                                        id="registercustomer"
                                        :title="$t('register_customer')"
                                        type="caisse/clients"
                                        ref="registerPartners"
                                        :showpartners="statute"
                                        @registerpartners="registerCustomer"></registerPartners
                                >

                                <b-modal id="test" title="Liste des Taxes" hide-footer>

                                    <template #modal-header="{  }">
                                        <!-- Emulate built in modal header close button action -->
                                        <h5>{{$t('tax_list')}}</h5>
                                    </template>

                                    <template #default="{ hide }">
                                        <table class="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th scope="col" >
                                                    {{$t('nom_label')}}
                                                </th>
                                                <th scope="col" >
                                                    {{$t('description')}}
                                                </th>
                                                <th scope="col" >
                                                    {{$t('value')}}
                                                </th>
                                                <th scope="col" >
                                                    {{$t('type')}}
                                                </th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-if="taxes.length === 0">
                                                <td md="12"></td>
                                            </tr>
                                            <tr v-else v-for="item in taxes"  :key="item.taxeId">

                                                <td>{{item.nom}}</td>
                                                <td>{{item.description}}</td>
                                                <td>{{item.valeur}}</td>

                                                <td v-if="item.incluse == true">{{$t('incluse')}}</td>
                                                <td v-else>{{$t('excluse')}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <p></p>
                                        <div style="text-align: right">
                                            <b-button  @click="hide()" variant="outline-danger" style="margin-right: 15px">{{$t('close')}}</b-button>
                                        </div>

                                    </template>

                                </b-modal>

                            </div>
                        </b-row>



                        <b-row>
                            <b-form-group
                                    class="col-md-10 mb-30"
                                    :label="$t('Vendeur')"
                                    label-for="input-1"
                            >

                                <AutoComplete msg='vendeurs' type='caisse' :optionsKey="optionsKey" :optionsKey1="optionsKey1" ></AutoComplete>

                            </b-form-group>


                            <!--<div class="bv-no-focus-ring" style="margin-top: 17px">
                                <b-button class="btn btn-outline-success  btn-icon m-1"
                                          style="margin-top:5px!important;padding:4px!important;"  variant="primary" v-b-modal.registerseller
                                ><span class="ul-btn__icon"><i class="i-Add"></i></span>
                                </b-button>

                                &lt;!&ndash;<button class="btn btn-info btn-icon m-1" style="margin-top:5px!important;padding:4px!important;" type="button">
                                    <span class="ul-btn__icon"><i class="i-Search-People"></i></span></button>&ndash;&gt;


                                <registerPartners
                                        id="registerseller"
                                        :title="$t('register_sellers')"
                                        type="caisse/vendeurs"
                                        ref="registerPartners"
                                        :showpartners="statute"
                                        @registerpartners="registerCustomer"></registerPartners
                                >

                            </div>-->
                        </b-row>
                        <b-row>
                            <b-col >
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col" v-for="header in fields" :key="header">
                                            {{$t(header)}}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-if="listproducts.length === 0">
                                        <td colspan="5" md="12">{{$t('no_product')}}</td>
                                    </tr>
                                    <tr v-else v-for="item in listproducts"  :key="item.produit_id">

                                        <td>{{item.libelle}}</td>
                                        <td>

                                            <input
                                                    class="form-control"
                                                    type="text"
                                                    v-model="item.reference"
                                                    placeholder="Reference"
                                            />
                                        </td>

                                        <td>{{ item.prix | currencys(codepays,devise) }}</td>
                                        <td><a
                                                @click="SeeTaxProduct(item)"
                                                class="o-hidden d-inline-block"
                                                title="See Tax"
                                        >
                                            <i class="i-Eye-Visible text-25 text-success"></i>
                                        </a></td>
                                        <td><a
                                                @click="removeCatProducts(item)"
                                                class="o-hidden d-inline-block"
                                                title="Delete"
                                        >
                                            <i class="i-Close-Window text-25 text-danger"></i>
                                        </a></td>
                                    </tr>
                                    </tbody>
                                </table>

                            </b-col>

                            <b-col md="12">
                                <div class="invoice-summary float-right" style="width: 300px !important">
                                    <p>
                                        {{$t('Montant_total')}}:
                                        <span>{{Montant_total|currencys(codepays,devise)}}</span>
                                    </p>

                                    <p>
                                        {{$t('Taxes')}}:
                                        <span> {{invoice_tax|currencys(codepays,devise)}} </span>
                                    </p>

                                    <h5 class="font-weight-bold">
                                        {{$t('Net_a_Payer')}}:
                                        <span> {{invoice_total|currencys(codepays,devise)}} </span>

                                    </h5>

                                </div>
                            </b-col>
                        </b-row>

                        <p></p>
                        <b-row>

                            <b-col md="3"></b-col>
                            <b-col md="5" style="visibility: hidden"><h5><b>{{$t('Montant_Encaisse')}}:</b></h5></b-col>
                            <b-col md="4" style="visibility: hidden">
                                <b-form-input

                                        v-model="form.montant_encaisse"
                                        disabled
                                        type="number"
                                        required
                                        placeholder="0"
                                ></b-form-input></b-col>

                        </b-row>



                    </b-col>
                </b-row>

                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <b-row >
                    <b-col md="6">
                        <b-row>
                            <b-form-group
                                    class="col-md-10 mb-30"
                                    :label="$t('Contact')"
                                    label-for="input-1"
                            >
                                <AutoComplete ref='contacts' type='caisse' msg='contacts' :optionsKey="optionsKey" :optionsKey1="optionsKey1" ></AutoComplete>

                            </b-form-group>

                            <div class="bv-no-focus-ring " style="margin-top: 17px;">

                                <button class="btn btn-outline-success  btn-icon m-1" v-b-modal.registercontact
                                        style2="margin-top:5px!important;padding:4px!important;" type="button">
                                    <span class="ul-btn__icon"><i class="i-Add"></i></span></button>

                                <registerPartners
                                        id="registercontact"
                                        :title="$t('register_contacts')"
                                        :showpartners="statute"
                                        type="caisse/contacts"
                                        ref="registerPartners"
                                        @registerpartners="registerCustomer"
                                ></registerPartners
                                >


                            </div>

                        </b-row>
                    </b-col>

                    <b-col md="6" style="position:relative;text-align: right;margin-top: 19px" >

                        <b-button pill variant="grey m-1" style="border:1px solid grey ;border-radius: 3px;visibility: hidden"
                                  @click="launchAccount()">{{$t('Mis_en_Compte')}}</b-button>
                        <b-button pill variant="danger m-1 " @click="closecaisse()" >{{$t('Annuler')}}</b-button>



                        <b-modal id="confirminAccount" scrollable no-close-on-backdrop title="Confirmer la mise en Compte" hide-footer>
                            <p></p>
                            <div style="text-align: right">
                                <b-button  variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
                                <b-button type="submit" variant="outline-success rights" @click="inAccount()" >{{$t('Enregistrer')}}</b-button>

                            </div>
                        </b-modal>

                        <b-modal id="confirminBox" scrollable no-close-on-backdrop title="Confirmer l'Encaissement" hide-footer>
                            <p></p>
                            <div style="text-align: right">
                                <b-button  variant="outline-danger"  style="visibility: hidden;margin-right: 10px">{{$t('Annuler')}}</b-button>
                                <b-button type="submit" variant="outline-success rights" @click="inBox()" >{{$t('Encaisser')}}</b-button>

                            </div>
                        </b-modal>


                        <!--<b-button pill variant="success m-1" v-b-modal.confirminBox >{{$t('Encaisser')}}</b-button>-->
                        <b-button pill variant="success m-1" @click="launchBox()" >{{$t('Encaisser')}}</b-button>

                    </b-col>

                </b-row>

                <b-row>
                    <b-col md="6" style="position:relative;text-align: left" >
                        <div class="row row-horizon">

                           <span class="holdList">
                              <!-- list Holds goes here -->
                               <span class="Hold " :class="[item.holdId == selecthold.holdId ? 'selectedHold' : '']" id="item.holdId" v-for="item in holdlist"
                                     :key="item.hold_id" @click="SelectHold(item)">

                                   {{item.number}}<!--<span id="Time">{{item.time}}</span>-->

                               </span>
                           </span>
                            <span class="Hold pl" @click="AddHold()">+</span>
                            <span class="Hold pl" @click="RemoveHold()">-</span>

                            <!--<b-tabs pills justified>
                                <b-tab :title="item.number" v-for="item in holdlist" :key="item.hold_id" @click="SelectHold(item)" active>

                                </b-tab>

                            </b-tabs>-->
                        </div>
                    </b-col>
                </b-row>


            </b-card>
        </b-overlay>

    </div>
</template>


<script>

    import AutoComplete from "./Autocomplete"
    import useAutocomplete from '../../../store/modules/useAutocomplete'
    import Catproductes from "./catproductes"
    import salesreceipt from "./salesreceipt"
    import bilan from "../components/bilan"
    import registerPartners from "../components/registerpartners"
    import reference from "../components/reference"
    import moment from 'moment'
    import constants from '../../../plugins/constants'
    import { mapGetters,mapActions } from "vuex";
    export default {

        metaInfo: {
            title: "Caisse"
        },

        data() {
            return {
                forcard:false,
                openb:true,
                closeb:true,
                chassi:"chassis",
                selectholdvar:false,
                resources_urls:constants.resource_urls,
                date: new Date().toLocaleString(),
                cat:[],
                userinput:"",
                boxopen:false,
                contactsId:5,
                box:false,
                modaltax:false,
                encaissements:{},
                bilan:{},
                form: {
                    num_ticket:'123',
                    montant_encaisse:0,
                    Reference:"",
                    name: "",
                    email: "",
                    emails: "",
                    fName: "",
                    lName: "",
                    phone: ""
                },
                ouvertureAmount:0,
                resultsearch:[],
                selection:[],
                Montant_total:0,
                invoice_tax: 0,
                invoice_taxs: 0,
                invoice_total: 0,
                showModal:true,
                clients:[],
                products:[],
                show:false,
                customerForm:
                    {
                        cni: "",
                        nom: "",
                        prenom: "",
                        phone: "",
                        status: false,
                        birthday:"",
                        passport:"",
                        permi_de_conduire:"",
                        date: new Date().toLocaleString(),
                    }
                ,
                search:false,
                contact:{
                    Name:""
                },
                vendeur:{
                    Name:""
                },
                variant:"",
                country:this.$store.state.authData.country,
                listproducts:[
                ],
                listtax:[
                ],
                tax:[],
                statute:false,
                show_refer:false,
                selecthold:{},
                taxes:[],
                selected:[],
                optionsKey:"nom",
                optionsKey1:"telephone",
                fields: ["Désignation", "Reference", "Prix","Taxes","Actions"],
                //field: ["Désignation", "Prix","Prix"],
                field:"",
                holdlist:[],
                encompte:false,
                codepays:'',
                devise:''

            };
        },
        setup({options,optionsKey,optionsKey1}){
            return {
                ...useAutocomplete(options,optionsKey,optionsKey1)
            }
        },

        beforeMount(){

          this.codepays = this.$i18n.locale
            this.devise = localStorage.getItem('devise')

            console.log('codepayes',this.$store.state.authData.role)

            if(this.$store.state.authData.role.indexOf('cg') !== -1){
                this.$router.push({ name: 'allvisit_list', params: { id: '0' }})
                return;
            }
            if(this.$store.state.authData.role.indexOf('controleur') !== -1){
                this.$router.push({name: 'visit_start'})
                return;
            }

        },
        filters:{
            momentes: function (date) {
                return moment(date).format('yyyy-MM-dd HH:mm');
            },

            currencys:function (value,codepays,devise) {

                return new Intl.NumberFormat(codepays, { style: 'currency', currency: devise }).format(value);
            },
            currencysout:function (value,codepays,devise) {
                console.log('intl',value)
                var intl =  new Intl.NumberFormat(codepays, { style: 'currency', currency: devise }).format(value);
                console.log('intl',intl)
                return intl.replace(devise,'')
            }

        },
        components:{salesreceipt, AutoComplete,Catproductes,registerPartners,bilan,reference},
        computed: {

            ...mapGetters(["getStatusHold","getProducts","getCustomers","getCustomer","getStatus","getCatProducts","GetBox","GETBILAN","GetEncaissements","getObjetHold",
                "getHoldList","getSelectHold","GetProductsHold","MoveProductsHold","GetBoxOpen","GetCaisseOpen","GetCHECKSESSION","GetRemoveAllProducts"]),

        },

        methods: {
            ...mapActions(["FetchCatProducts","FetchSalesProducts","registerCustom","FetchProducts",
                "FetchSellers","FetchContacts","FetchCustomers","inAccounts"
                ,"inBoxs","addhold","closebox","openboxs","removehold","checksessione","holdliste","SelectHolds","getProductsHold","addProductsHold","removeProductsHold","removeAllProductsHold"]),

            setreference(value){
                this.form.Reference=value

            },
            openmodalbox(){
                this.$bvModal.show('confirmopenAccount')
            },
            closemodalbox(){
                this.$bvModal.show('confirmcloseAccount')
            },
            setoverlay(value){
                if(!this.forcard){
                    this.forcard = value
                }

            },
            setlistpr(value){

                this.forcard = false
                if(this.search) {
                    this.show_refer = !this.show_refer
                }
                if(value[0].produit!=null){
                    this.products=value;
                }
                console.log('setlistpr',value[0].produit)
            },
            stringToBoolean: function(string){

                if(string!=null){
                    switch(string.trim()){
                        case "true": case "yes": case "1": return true;
                        case "false": case "no": case "0": case null: return false;
                        default: return Boolean(string);
                    }
                }

            },
                print (){
                // Pass the element id here
                this.$htmlToPaper('printMe');
            },
            cancels (){
                // Pass the element id here
                this.box=false;
                this.$bvModal.hide('tests')
                console.log('cancels',this.box)
            },
            closecaisse(){

                console.log('close')
                this.removehold({number:this.selecthold.number,close:true})
                //this.removeAllProductsHold({number:this.selecthold.number,sessionCaisseId:localStorage.getItem("sessioncaisse")})

            },
            registerCustomer(variant = null) {

                 setTimeout(() => {

                    this.$refs.registerPartners.registerp(true)
                    console.log('hello',this.formattedreferenceValue)

                },4000);

                this.registerCustom(variant)
                this.variant  = variant

                console.log('relandes',variant)

            },

            //Aucun Produit Selectionne
            inAccount() {

                this.show=!this.show
                this.$bvModal.hide('confirminAccount')

                this.inAccounts(

                    {
                        produitVue:this.listproducts,
                        montantTotal:this.invoice_total,
                        montantHT:this.Montant_total,
                        montantEncaisse:this.form.montant_encaisse,
                        sessionCaisseId:localStorage.getItem("sessioncaisse"),
                        clientId:this.$store.state.clientsId,
                        vendeurId:this.$store.state.vendeursId,
                        contactId:this.$store.state.contactsId,
                        type:0,
                        lang: this.$i18n.locale
                    }
                )

                //this.inAccounts()
            },

            launchBox(){

                if(this.$store.state.categorieproducts.contactsId===0){
                    this.makeToast(this.$t('select_contact'),'error')
                    return ;
                }

                if(this.listproducts.length===0){
                    this.makeToast(this.$t('no_product'),'error')
                    return ;
                }

                if(this.form.montant_encaisse===0){
                    this.makeToast(this.$t('which_amount'),'error')
                    return ;
                }
                this.encompte = false

                this.$bvModal.show('confirminBox')
            },

            launchAccount(){

                if(this.$store.state.categorieproducts.contactsId===0){
                    this.makeToast(this.$t('select_contact'),'error')
                    this.$bvModal.hide('confirminAccount')
                    return ;
                }


                if(this.listproducts.length === 0){
                    this.makeToast(this.$t('no_product'),'error')
                    this.$bvModal.hide('confirminAccount')
                    return ;
                }


                if(this.form.montant_encaisse > 0){
                    this.makeToast(this.$t('montant_encaisse_null'),'error')
                    this.$bvModal.hide('confirminAccount')
                    return ;
                }


                this.encompte = true
                this.$bvModal.show('confirminAccount')

            },

            inBox() {

                this.$bvModal.hide('confirminBox')
                this.show=true
                console.log('contactID',this.$store.state.categorieproducts.contactsId)
                console.log('clientId',this.$store.state.categorieproducts.clientsId)

                this.inBoxs(

                    {
                        produitVue:this.listproducts,
                        montantTotal:this.invoice_total,
                        montantHT:this.Montant_total,
                        montantEncaisse:this.form.montant_encaisse,
                        sessionCaisseId:localStorage.getItem("sessioncaisse"),
                        type:(this.listproducts[0].libelle==='dec')?2:1,
                        clientId:this.$store.state.categorieproducts.clientsId,
                        vendeurId:this.$store.state.categorieproducts.vendeursId,
                        contactId:this.$store.state.categorieproducts.contactsId,
                        contacclt:this.$store.state.categorieproducts.contacclt,
                        lang: this.$i18n.locale
                    }

                )

            },
            closeBox(){

                console.log('closebox')
                //this.$bvModal.show('bilan')\
                this.closeb=false
                this.closebox({"ouvertureAmount":this.ouvertureAmount})

            },

            openBox(){

                //this.$bvModal.hide('confirmopenAccount')
                // if(this.boxopen==="false"){
                //     this.makeToast("Caisse Ouverte veuillez la fermer","error")
                //     return;
                // }
                this.openb=false
                this.openboxs({"ouvertureAmount":this.ouvertureAmount})

            },

            Addcat(product) {

                console.log('product',product)

                if((this.form.Reference)==''){
                    this.makeToast(this.$t('ref_enter'),'error')
                    return ;
                }

                if(product.produit.libelle=='dec' && this.listproducts.length!=0){

                    this.makeToast(this.$t('product_waiting'),'error')
                    /*if(this.listproducts.length!=0){
                        this.listproducts = []
                        this.removeAllProductsHold(product)
                        console.log('valcatproduct',product.selecthold)

                    }else{
                        console.log('valcatproduct','vide')
                    }*/
                }
                product.selecthold=this.selecthold
                product.reference = this.form.Reference
                this.forcard = true
                this.addProductsHold(product)

            },
            /*searchreference(){

                this.show_refer=!this.show_refer
                this.search = true;
                this.searchReference(this.form.Reference)
            },*/
            applyTax(prix,taxes){

                taxes.forEach((value) => {

                    if(!value.incluse){
                        prix = prix + (prix*value.valeur)/100
                    }
                });
                return prix
            },
            SelectHold(item){

                console.log('hold',item.number)

                this.SelectHolds(item)
                //requete pour recuperer la liste des produits
            },
            checkIdHold(obj, id) {

                return obj.map(function(item) { return item.holdId; }).indexOf(id);

            },
            invoiceTotal() {

                var subtotal,total;
                subtotal = this.listproducts.reduce(function(sum, item) {
                    var cost = parseFloat(item.prix);
                    if (!isNaN(cost)) {
                        return sum + cost;
                    }
                }, 0);

                this.Montant_total = subtotal.toFixed(2);
                // tax
                //total = subtotal * (this.invoice_tax / 100) + subtotal;
                total = this.invoice_tax + subtotal;

                /*switch (operande) {

                    case "+":
                        total = this.invoice_tax + subtotal;
                        break;

                    case "-":
                        total = Math.abs(subtotal - this.invoice_tax) ;
                        break;
                }*/

                total = parseFloat(total);
                if (!isNaN(total)) {
                    this.invoice_total = total.toFixed(2);
                    this.form.montant_encaisse = this.invoice_total
                } else {
                    this.invoice_total = "0.00";
                }

            },
            taxTotal(prix,operande){

                var subtotaltax ,ageTotal;

                //list of taxes of thisproduct
                subtotaltax =  this.listtax.reduce((data, user) => {
                    ageTotal = (ageTotal || 0) + user.valeur
                    return ageTotal;
                }, {});


                //calculate amount and add it in total amout tax
                if (!isNaN(subtotaltax)) {
                    switch (operande) {
                        case "+":
                            console.log('subtotal',subtotaltax)
                            this.invoice_tax = this.invoice_tax + ((subtotaltax * prix)/100)
                            break;
                        case "-":

                            this.invoice_tax = Math.abs(this.invoice_tax - ((subtotaltax * prix)/100))
                            break;
                    }
                    this.invoice_taxs = this.invoice_tax;

                }

                /*  subtotal = this.listtax.reduce(function(sum, item) {
                      var cost = parseFloat(item.valeur);
                      if (!isNaN(cost)) {

                          console.log('subtotal',cost)
                          return sum + cost;

                      }
                  }, 0);*/

            },

            checkId(obj, id) {

                return obj.map(function(item) { return item.reference; }).indexOf(id);

            },
            removeCatProducts(product) {

                console.log('index',this.listproducts)
                this.removeProductsHold(product)

            },
            SeeTaxProduct(product) {

                this.taxes = product.taxes
                this.$bvModal.show('test')


            },
            FetchProduct(catproduct){
                console.log('oproduct')

                this.FetchProducts(catproduct)
            },

            /* makeToast(variant = null, msg) {
                 this.$bvToast.toast(msg, {
                     title: ` ${variant || "default"}`,
                     variant: variant,
                     solid: true
                 });
             },*/

            makeToast(variant = null,type) {
                console.log('Please fill the form correctly',variant)
                this.$toasted.show(variant,{type:type})
            },

            AddHold(){

                this.addhold()
                console.log('bilan', this.$store.state.categorieproducts.contactsId)
            },

            RemoveHold(){

                this.$store.state.caisses.statusrequete = false
                //console.log('hello',this.selecthold.number)

                this.removehold({number:this.selecthold.number,
                    close:true})
            },

        },

        mounted() {

            if(this.$store.state.authData.role.indexOf('controleur') !== -1){
                return;
            }
            if(this.$store.state.authData.role.indexOf('cg') !== -1){
                return;
            }

            this.boxopen = this.stringToBoolean((localStorage.getItem('boxopen')));
            this.show = (localStorage.getItem('boxshow')!=null)?(this.stringToBoolean((localStorage.getItem('boxshow')))):"" ;


            this.checksessione()
            this.holdliste()


            console.log(moment().format("yyyy-MM-DD"))
            console.log('boxopen',this.boxopen)
            console.log('codepays',this.codepays)

            this.FetchCatProducts()
            this.FetchSalesProducts({number:localStorage.getItem("selecthold")})

            //this.closeBox()
            //this.searchPartners({val:'t',type:'clients'})
            //this.FetchContacts()
            //this.FetchSellers()
            //this.FetchCustomers()

        },

        watch: {


            GetCHECKSESSION:function(value){

                console.log('checksession',value)

                this.boxopen = this.stringToBoolean((localStorage.getItem('boxopen')))
                this.show = this.stringToBoolean((localStorage.getItem('boxshow')))

                console.log('show',this.boxopen)

               // this.show = (localStorage.getItem("boxshow"))=='true'
                console.log('show',(this.show))

            },

            GetRemoveAllProducts:function(value){

                console.log('remov',value)
                this.show=false
                if(value===0){

                   // this.invoice_taxs=this.invoice_tax
                    console.log('remov',this.invoice_taxs)
                    this.$bvModal.show('tests')

                    this.listproducts=[]
                    this.listtax=[]
                    this.invoice_tax = 0
                    this.invoiceTotal()

                    /*this.$store.state.categorieproducts.contactsId=0
                    this.$store.state.categorieproducts.vendeursId=0
                    this.$store.state.categorieproducts.clientsId=0*/
                    this.form.Reference=""
                }else if(value===1){
                    this.makeToast(this.$t('error'),0)
                }
                this.$store.state.caisses.removeallproducts=2;

            },

            GetCaisseOpen:function(value){

                if(!value) {

                    this.show = false
                    this.$bvModal.hide('confirmopenAccount')
                    this.openb=true
                    this.boxopen = false
                    localStorage.setItem("boxopen",false)
                    localStorage.setItem("boxshow",false)
                }
                this.$store.state.caisses.caisseopen=true;

                /*else{
                    console.log('stdatus',value)

                    this.$bvModal.hide('confirmcloseAccount')
                    console.log('stdatus',value)
                    localStorage.setItem("boxopen",value)

                }
                */


            },

            getCatProducts: function(value){

                this.cat=[]
                this.cat = value
                console.log('registerp',value)
            },
            /*getProducts(val){
                if(this.search) {
                    this.show_refer = !this.show_refer
                }
                console.log('resultl',val)
                //this.makeToast('sucess','success')
                this.products=val;
            },*/
            getStatus(value){

                this.$refs.registerPartners.registerp(value)
                if(value){
                    this.statute=false
                }else{
                    console.log('registerp',value)
                }

            },
            getb(){
                return this.boxopen
            },

            getCustomer(val){

                this.statute=false
                console.log('statute',this.variant)

                //useAutocomplete().state.userInput="hello"
                useAutocomplete().selects()

                console.log('statute',val)
                if(Object.keys(val).length !== 0) {


                    if(this.variant.variant === "caisse/clients"){
                        this.$bvModal.hide('registercustomer')
                        this.clients.push(val)
                        this.makeToast(this.$t('customer_add'),'success')
                    }

                    if(this.variant.variant === "caisse/contacts"){

                        this.$bvModal.hide('registercontact')


                        // this.contacts.push(val)
                        this.makeToast(this.$t('contact_add'),'success')
                    }

                    if(this.variant.variant === "caisse/vendeurs"){
                        this.$bvModal.hide('registerseller')
                       // this.clients.push(val)
                        this.makeToast(this.$t('sellers_add'),'success')
                    }

                    this.$bvModal.msgBoxOk('',)


                }else{

                    //this.show=false
                    this.makeToast(this.$t('customer_denied'), "error")
                }
            },
            GetBox(val){
                this.box=val;

                if(val){

                    console.log('encaiss',this.holdlist.length)

                    if(this.holdlist.length>1){
                        this.show=false
                        this.closecaisse()
                    }else{

                        this.removeAllProductsHold({number:this.selecthold.number,
                            sessionCaisseId:localStorage.getItem("sessioncaisse")})
                    }
                    this.$store.state.categorieproducts.box = false

                }
               // this.box=false;

            },

            GetEncaissements(val){

                this.encaissements=val

                this.field = this.$store.state.categorieproducts.contacclt
                this.$store.state.categorieproducts.contactsId=0
                this.$store.state.categorieproducts.vendeursId=0
                this.$store.state.categorieproducts.clientsId=0

                useAutocomplete.deleteText(val)
                console.log('enc5',val)
                useAutocomplete().state.userInput=""

            },


            GETBILAN(val){

                this.bilan=val
                console.log('bilan',val)

            },
            getObjetHold(val){

                //this.selecthold = val
                this.holdlist.push(val);

            },
            getStatusHold(val){

                if(val===200){
                    let indexIds = this.checkIdHold(this.holdlist,this.selecthold.holdId)
                    console.log('objetshold',indexIds)

                    this.holdlist.splice(indexIds, 1);
                    this.holdlist.sort();

                }

            },

            getHoldList(val){
                this.holdlist=[]
                this.holdlist=val;

                console.log('holdlistes',this.holdlist)

                console.log('holdtes',localStorage.getItem("selecthold"))
                this.selecthold = this.holdlist[0]

                /*if(localStorage.getItem("selecthold") === 'null' || localStorage.getItem("selecthold") === null ){

                    this.selecthold = this.holdlist[0]
                    console.log('holdlist',this.holdlist[0])
                }

                if(Object.keys(localStorage.getItem("selecthold")).length !== 0){

                    this.selecthold = localStorage.getItem("selecthold")
                    console.log('holdlis',this.selecthold)

                }

                console.log('hhhh',this.selecthold)*/
                this.SelectHolds(this.selecthold)

            },
            getSelectHold(val){

                this.selecthold = val

                localStorage.setItem("selecthold",val)

                //this.$store.state.categorieproducts.contactsId=0
                // this.$store.state.categorieproducts.vendeursId=0
                //this.$store.state.categorieproducts.clientsId=0
                useAutocomplete().state.userInput=""

                console.log('soooobjethold',val)
                this.getProductsHold(this.selecthold)

            },
            GetProductsHold(val){

                console.log('getp',val)

                //this.listproducts = val
                this.listproducts=[]
                this.listtax=[]

                if(val.length!=0) {
                    val.forEach((value) => {

                        this.listproducts.push({
                            produitId: value.produit.produitId,
                            libelle: value.produit.libelle,
                            reference: value.reference,
                            holdId: this.selecthold.holdId,
                            prix: value.produit.prix,//this.applyTax(value.produit.prix,value.taxe),
                            categorie: value.produit.categorieProduit.libelle,
                            descriptionCat: value.produit.categorieProduit.description,
                            taxes: value.taxes
                        });

                        this.listtax  = value.taxes
                        this.taxTotal(value.produit.prix,"+")

                    });

                }else{
                    this.invoice_tax  = 0
                }
                this.invoiceTotal()

            },

            MoveProductsHold(value){

                console.log('movef',value)
                this.forcard = false

                var operande =""
                if(value.statut===0) {

                    if(value.success){

                        this.listproducts.reference = this.form.Reference
                        operande = "+"
                        this.listproducts.push({

                            produitId: value.produit.produitId,
                            libelle: value.produit.libelle,
                            reference: this.listproducts.reference,
                            holdId: this.selecthold.holdId,
                            prix: value.produit.prix,//this.applyTax(value.produit.prix,value.taxe),
                            categorie: value.produit.categorieProduit.libelle,
                            descriptionCat: value.produit.categorieProduit.description,
                            taxes: value.taxe

                        });
                        console.log(new Intl.NumberFormat('CM', { style: 'currency', currency: 'XAF' }).format(value.produit.prix));

                        if(!value.taxe.incluse){

                            this.listtax = value.taxe
                            console.log('movee', this.listtax)

                        }
                        operande="+";
                        this.taxTotal(value.produit.prix,operande)

                    }else{
                        this.makeToast(this.$t(value.message),'error')
                        console.log('prxxxoducts',false)

                        //obtenir object par son id
                    }

                }else{

                    operande="-";

                    //console.log('checkid',this.checkId(this.listproducts,value.reference))
                    let indexId = this.checkId(this.listproducts,value.reference)
                    this.listtax = (this.listproducts[indexId]).taxes


                    this.taxTotal(this.listproducts[indexId].prix,operande)
                    this.listproducts.splice(indexId, 1);



                }


                this.invoiceTotal()

            },

            GetBoxOpen(value){


                if(!value) {

                    this.show = false
                    this.closeb=true
                    this.$bvModal.hide('confirmopenAccount')

                }else{
                    this.closeb=true
                    this.$bvModal.hide('confirmcloseAccount')

                    this.show = true
                    this.boxopen= false
                    this.boxopen= true
                    console.log('stdatus',value)

                    this.selecthold={}
                    this.listproducts=[]
                    this.listtax=[]
                    this.invoiceTotal()
                    this.invoice_tax = 0
                    this.holdlist=[]


                    localStorage.setItem("boxopen",true)
                    localStorage.setItem("boxshow",true)


                    this.$store.state.caisses.boxopens=false
                    // this.$bvModal.show('bilan')

                }


            },
        }
    };
</script>

<style scoped>
    .Hold {
        cursor: pointer;
        text-align:center;
        margin:5px 1px;
        padding: 2px 10px;
        background-color:#4C5261;
        border-radius:3px;
        color:#E4E6E7;
        text-transform:uppercase;
        font-size: 20px;
        display:inline-block;
        font-weight:600;
        padding-bottom: 7px;
        border-bottom: 3px solid #212C32;
    }
    .Hold span {
        font-size: 12px;
        color:#b9b2b2;
        margin-left: 8px;
    }
    .selectedHold{
        /*background-color:#35B8E0;*/
        color:#E2E2E2;
        border-bottom: 3px solid #f65e48;
    }
    .pl {
        background-color:#253138;
        color:#fff;
        border-bottom: 3px solid #101417;
    }
    .taille{
        width:120px;
        height: 120px;
        margin:10px;
        background: #ffffff9e;
    }
    .rights{
        position: relative;right: 0;margin-right: 10px;
    }

    img {
        height:100vh;
    }
    .overlay-box{
        background: #eee;
    }
    .scroll-card{
        height: 250px;
        display: flex !important;
        flex-direction: row;
        flex-grow: 1;
        overflow: auto;
    }
</style>
