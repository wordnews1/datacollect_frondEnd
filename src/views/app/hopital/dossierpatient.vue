
<template>

    <b-overlay :show="show" rounded="sm">

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

                    <AutoComplete ref="childAutos" @save-change="savechange" msg='clients'
                                  type='caisse' :optionsKey="optionsKey"
                                  :optionsKey1="optionsKey1"></AutoComplete>

                    <p></p>
                    <div style="text-align: right">
                        <b-button  :disabled="!openb" @click="openBox()" variant="outline-success" style="margin-right: 15px">{{$t('open')}}</b-button>
                    </div>

                </template>

            </b-modal>

        </b-overlay>

        <b-form :aria-hidden="show ? 'true' : null" >

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
                            {{$t('basic_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('cnis')"
                                            label-for="input-1"
                                    >

                                        <b-form-input disabled

                                                v-model.trim="$v.cni.$model"
                                                type="number"
                                                :placeholder="$t('cni')"
                                        ></b-form-input>

                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.cni.minLength"
                                        >{{$t('validator_cni')}}
                                            {{ $v.cni.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('prenom_label')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="prenom"
                                                type="text"
                                                :placeholder="$t('prenom')"
                                        ></b-form-input>

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('birthday')"
                                            label-for="input-1"
                                    >
                                        <b-form-datepicker id="example-datepicker"  v-model="birthday" class="mb-2"></b-form-datepicker>

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('permi')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="permi_de_conduire"
                                                type="number"
                                                :placeholder="$t('permis')"
                                        ></b-form-input>

                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('nom_label')"
                                            label-for="input-1"
                                    >

                                        <b-form-input
                                                disabled

                                                v-model.trim="$v.nom.$model"
                                                type="text"
                                                :placeholder="$t('prooftag')"
                                        ></b-form-input>
                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.nom.minLength"
                                        >{{$t('validator_nom')}}
                                            {{ $v.nom.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >


                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('tel')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="phone"
                                                disabled
                                                type="number"
                                                :placeholder="$t('tels')"
                                        ></b-form-input>

                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.phone.minLength"
                                        >{{$t('validator_phone')}}
                                            {{ $v.phone.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >
                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.phone.maxLength"
                                        >{{$t('validator_phone_max')}}
                                            {{ $v.phone.$params.maxLength.max }} {{$t('letters')}}  .</b-alert
                                        >

                                    </b-form-group>





                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('passports')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="passport"
                                                type="number"
                                                :placeholder="$t('passport')"
                                        ></b-form-input>

                                    </b-form-group>
                                    <label>Sexe: </label>
                                    <b-form-select
                                            :label="$t('sexe')"
                                            id="sexe"
                                            name="personGender"
                                            v-model="personGender"
                                    >

                                        <option value="0">
                                            Homme
                                        </option>

                                        <option value="1">
                                            Femme
                                        </option>

                                    </b-form-select>
                                </b-col>
                            </b-row>



                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>
            <p></p>
            <div role="tablist">

                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-5 variant="transparent">
                            {{$t('acc_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-5" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>

                                <b-col md="6">

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('crashacc')"
                                            label-for="input-1"
                                    >
                                        <b-form-datepicker id="example-datepicker"  v-model="crashacc" class="mb-2"></b-form-datepicker>

                                    </b-form-group>
                                    <b-form-group :label="$t('consumalcohol')">


                                        <b-form-checkbox
                                                v-model="consumalcohol"
                                                value="oui"
                                                class="mb-5"
                                                disabled
                                        >
                                            Oui
                                        </b-form-checkbox>

                                        <b-form-checkbox
                                                disabled
                                                v-model="consumalcohol"
                                                value="non"
                                                class="mb-5 right_header"
                                        >
                                            Non
                                        </b-form-checkbox>


                                    </b-form-group>




                                </b-col>
                                <b-col md="6">

                                    <b-form-group :label="$t('persontrauma')">
                                        <select
                                                class="form-control"
                                                name="persontrauma"
                                                v-model="persontrauma"
                                        >

                                            <option value="0">
                                                Mortel
                                            </option>

                                            <option value="1">
                                                Grave
                                            </option>


                                        </select>
                                    </b-form-group>


                                    <b-form-group :label="$t('consumdrugs')">


                                        <b-form-checkbox
                                                disabled
                                                v-model="consumdrugs"
                                                value="oui"
                                                class="mb-5"
                                        >
                                            Oui
                                        </b-form-checkbox>

                                        <b-form-checkbox
                                                disabled
                                                v-model="consumdrugs"
                                                value="non"
                                                class="mb-5 right_header"
                                        >
                                            Non
                                        </b-form-checkbox>



                                    </b-form-group>


                                </b-col>
                            </b-row>



                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>
            <p></p>

            <!--<div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-2 variant="transparent">
                            {{$t('adress_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-2" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('pays')"
                                            label-for="input-1"
                                    >

                                        <b-form-select
                                                id="input-3"
                                                v-model="pays"
                                                :options="countrys"
                                                required
                                        ></b-form-select>

                                        &lt;!&ndash;<b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.cni.minLength"
                                        >{{$t('validator_cni')}}
                                            {{ $v.cni.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >&ndash;&gt;

                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('rue')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="rue"
                                                type="text"
                                                :placeholder="$t('rue')"
                                        ></b-form-input>

                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('zip_other')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="zip_other"
                                                type="number"
                                                :placeholder="$t('zip_other')"
                                        ></b-form-input>

                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('towns')"
                                            label-for="input-1"
                                    >

                                        <b-form-select
                                                id="input-3"
                                                v-model="town"
                                                :options="towns"
                                                required
                                        ></b-form-select>
                                        &lt;!&ndash;<b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.nom.minLength"
                                        >{{$t('validator_nom')}}
                                            {{ $v.nom.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >&ndash;&gt;


                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('zip')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="zip"
                                                type="number"
                                                :placeholder="$t('zip')"
                                        ></b-form-input>


                                    </b-form-group>


                                </b-col>
                            </b-row>

                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>
            <p></p>-->
            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-3 variant="transparent">
                            {{$t('desc_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-3" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>

                            <wysiwyg v-model="content" />

                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>

            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-4 variant="transparent">
                            {{$t('param_med')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-4" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>

                                <b-col md="6">

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('poids')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="poids"
                                                type="text"
                                                :placeholder="$t('poids')"
                                        ></b-form-input>

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('temperature')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="temperature"
                                                type="text"
                                                :placeholder="$t('temperature')"
                                        ></b-form-input>

                                    </b-form-group>


                                </b-col>
                                <b-col md="6">


                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('tension')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="tension"
                                                type="text"
                                                :placeholder="$t('tension')"
                                        ></b-form-input>


                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('pouls')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="pouls"
                                                type="text"
                                                :placeholder="$t('pouls')"
                                        ></b-form-input>

                                    </b-form-group>


                                </b-col>
                            </b-row>
                            <b-row>
                                <br/>
                                <b-col md="12">
                                    <b-form-group :label="$t('param_med_label')">

                                        <b-form-checkbox-group
                                                disabled
                                                id="flavours"
                                                name="flavours"
                                                class="ml-4"
                                                aria-label="Individual flavours"
                                                stacked
                                        >
                                            <br/>
                                            <b-form-checkbox
                                                    v-model="checkedNames"
                                                    value="ashtme"
                                                    class="mb-5"
                                            >
                                                Asthme
                                            </b-form-checkbox>

                                            <b-form-checkbox
                                                    v-model="checkedNames"
                                                    value="cardiaque"
                                                    class="mb-5 right_header"
                                            >
                                                Maladie Cardiaque
                                            </b-form-checkbox>
                                            <br/>
                                            <b-form-checkbox
                                                    v-model="checkedNames"
                                                    value="hypertension"
                                                    class="mb-5"
                                            >
                                                hypertension
                                            </b-form-checkbox>


                                            <b-form-checkbox
                                                    v-model="checkedNames"
                                                    value="epilepsie"
                                                    class="mb-5 right_header"
                                            >
                                                Epilepsie

                                            </b-form-checkbox>
                                            <br/>

                                            <b-form-checkbox
                                                    v-model="checkedNames"
                                                    value="diabete"
                                                    class="mb-5 "
                                            >
                                                Diabete
                                            </b-form-checkbox>

                                            <b-form-checkbox
                                                    v-model="checkedNames"
                                                    value="cancer"
                                                    class="mb-5 right_header"
                                            >
                                                Cancer
                                            </b-form-checkbox>


                                        </b-form-checkbox-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>

            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
                            {{$t('soins')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-button type="submit"  @click ="openmodalbox('soins')"  variant="success"
                                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                                <b-col md="12">
                                    <b-overlay :show="loadanotherpage" rounded="sm" >

                                        <ListTable :type="'soins'" :rows="listsoin" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
                                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                                    </b-overlay>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>

            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-7 variant="transparent">
                            {{$t('Examens')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-7" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-button type="submit"  @click ="openmodalbox('examen')"  variant="success"
                                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                                <b-col md="12">
                                    <b-overlay :show="loadanotherpage" rounded="sm" >

                                        <ListTable :type="'examen'" @onRowclick="onRowclick" :rows="listexamen" :columns="columnexamen" :isCLoseMenu="true"
                                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                                    </b-overlay>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>
            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-8 variant="transparent">
                            {{$t('traumatisme')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-8" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-button  @click ="openmodalbox('trauma')"  variant="success"
                                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                                <b-col md="12">
                                    <b-overlay :show="loadanotherpage" rounded="sm" >

                                        <ListTable :type="'trauma'" @onRowclick="onRowclick" :rows="listrauma" :columns="columnexamen" :isCLoseMenu="true"
                                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                                    </b-overlay>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>


        </b-form>
    </b-overlay>

</template>

<script>

    import constants from '../../../plugins/constants'
    import ListTable from '../components/List-table2'
    import { required, minLength, maxLength } from "vuelidate/lib/validators";
    // import partnersVue from "../partners/list"
    import axios from 'axios'
    import { mapGetters,mapActions } from "vuex";
    export default {

        name:"dossierpatient",
        props:{
           rowes:Array
        },

        components: {
            ListTable
        },
        mounted(){
            console.log('rowe',this.rowes)
            //this.ListDossierPatient(this.rowes[0].id)
            this.ListDossierPatient(9)
            this.folder_id = 9

        },
        data() {
            return {
                optionsKey:"nom",
                optionsKey1:"prenom",
                folder_id:0,
                checkEx2Options : [
                    {item: 'oui', name: 'Oui'},
                    {item: 'non', name: 'Non'}
                ],
                crashacc:'',
                listsoin:[],
                listexamen:[],
                listrauma:[],
                totalPagesoin_:0,
                loadanotherpage:false,
                totalElementsoin:0,
                linksoin:[],
                columnexamen:[
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
                    ,{
                        label: "actions",
                        field: "actions",
                        hidden: false,
                        html: true,
                    }

                ],
                columnoins:[

                    {
                        label: "Id",
                        field: "id",
                        hidden: false,
                    },
                    {
                        label: "Name",
                        field: "name",
                        hidden: false,
                    },
                    {
                        label: "Price",
                        field: "price",
                        hidden: false,
                    },                    {

                        label: "Number",
                        field: "number",
                        hidden: false,
                    },
                    {
                        label: "actions",
                        field: "actions",
                        hidden: false,
                        html: true,
                    }
                ],
                consumalcohol:'',
                consumdrugs:'',
                personGender:'',
                checkedNames:[],
                poids:'',
                temperature:'',
                tension:'',
                pouls:'',

                rout:false,
                content:"",
                submitStatus: null,
                cni:'',
                nom: '',
                prenom: '',
                phone: '',
                status: false,
                birthday:null,
                passport:'',
                permi_de_conduire:'',
                show: false,
                countrys:["Afghanistan","Cameroun"],
                towns:["Douala","Yaounde"]
            }
        },
        validations: {
            cni: {
                required,
                minLength: minLength(9)
            },
            nom: {
                required,
                minLength: minLength(4)
            },
            phone: {
                required,
                minLength: minLength(9),
                maxLength: maxLength(9)
            },
        },
        computed: {
            ...mapGetters(["GetListDossier"]),
        },
        methods:{

            ...mapActions(["ListDossierPatient"]),
            savechange(data) {

                console.log('savechange', data);
            },
            openmodalbox(){
                this.$bvModal.show('confirmopenAccount')
            },
            onRowclick(params){
                this.loadanotherpage = true
                let soin = {
                    care: this.folder_id,
                    item: params.id
                };
                switch(params.type){
                    case 'examen':

                        axios.post(constants.resource_url+'cares/remove-exam', soin)
                            .then(response =>{
                                this.listexamen = response.data.data.exams;
                                this.loadanotherpage = false
                                //this.containerClass = 'container';
                                //this.trauma={}
                            }).catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);

                        }); break;
                    case 'soins':

                        axios.post(constants.resource_url+'cares/remove-treatment', soin)
                            .then(response =>{
                                this.listsoin = response.data.data.treatments;
                                //this.containerClass = 'container';
                                //this.trauma={}
                                this.loadanotherpage = false
                            }).catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);

                        });break;
                    case 'trauma':
                        axios.post(constants.resource_url+'cares/remove-injury', soin)
                            .then(response =>{
                                this.listrauma = response.data.data.injuries;
                                this.containerClass = 'container';
                                this.trauma={}
                                this.loadanotherpage = false

                            }).catch(function(error) {
                            console.log('products_error',error);
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // console.log(error);

                            //commit("setError", error);

                        });break;

                }
                console.log('paramis',params)

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

            loadpage(params){

                console.log('loadpage',params)


            },
            clickRow(){
                console.log('loadpage','')
            },
            selectionChanged(){
                console.log('loadpage','')
            },

            makeToast(variant = null,type="info") {

                this.$toasted.show(variant,{type:type})
            },

            makeToastTwo(variant = null) {
                console.log('Successfully Submitted')

                this.$bvToast.toast("Successfully Submitted", {
                    title: `Variant ${variant || "default"}`,
                    variant: variant,
                    solid: true
                });
            },
        },
        watch:{
            GetListDossier(data){
                console.log('data',data)
                this.cni = data.cni!=null?data.cni:'pas renseigne'
                this.nom = data.nom!=null?data.nom:'pas renseigne'
                this.prenom = data.prenom!=null?data.prenom:'pas renseigne'
                this.telephone = data.telephone!=null?data.telephone:'pas renseigne'
                this.birthday = data.dateNaiss!=null?data.dateNaiss:'pas renseigne'
                this.passport = data.passport!=null?data.passport:'pas renseigne'
                this.permis = data.permis!=null?data.permis:'pas renseigne'
                this.personGender = data.gender!=null?data.gender:'pas renseigne'

                this.poids = data.poids!=null?data.poids:'pas renseigne'
                this.tension = data.tension!=null?data.tension:'pas renseigne'
                this.pouls = data.pouls!=null?data.pouls:'pas renseigne'
                this.temperature = data.temperature!=null?data.temperature:'pas renseigne'
                this.crashacc = data.crashDate!=null?data.crashDate:'pas renseigne'
                this.listsoin = data.treatments
                this.listexamen = data.exams
                this.listrauma = data.injuries
            }

        }
    ,
    }

</script>
<style scoped>
    .right_header {
        color: #fff;
        margin-left: 30%;
    }

</style>
 