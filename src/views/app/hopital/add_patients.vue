
<template>

    <b-overlay :show="show" rounded="sm">

        <b-form :aria-hidden="show ? 'true' : null" @submit.prevent="registerCustomer(type)">

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

                                        <b-form-input

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
                                            Male
                                        </option>

                                        <option value="1">
                                            Female
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
                                        >
                                            Oui
                                        </b-form-checkbox>

                                        <b-form-checkbox
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
                                                    v-model="consumdrugs"
                                                    value="oui"
                                                    class="mb-5"
                                            >
                                                Oui
                                            </b-form-checkbox>

                                            <b-form-checkbox
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

                <b-col md="12">
                    <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
                </b-col>
            </div>
            <!--<div style="text-align: right">
                <b-button  @click="hide()" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
                <b-button type="submit" variant="outline-success rights" style="position: relative;right: 0;margin-right: 10px;">{{$t('Enregistrer')}}</b-button>
            </div>-->

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

</template>

<script>

    import { required, minLength, maxLength } from "vuelidate/lib/validators";
   // import partnersVue from "../partners/list"
    import { mapGetters,mapActions } from "vuex";
    export default {

        name:"registerPartners",
        props:{
            id:String,
            title:String,
            type:String,
            statut:Boolean
        },
        components:{},

        data() {
            return {
                checkEx2Options : [
                    {item: 'oui', name: 'Oui'},
                    {item: 'non', name: 'Non'}
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
            ...mapGetters(["GetStorePatients"]),
        },
        methods:{

            ...mapActions(["StorePatients"]),
            registerCustomer: function(item){
                console.log('test',item)
                let test={}
                test = {cni: this.cni, nom: this.nom,prenom:this.prenom,
                    telephone:this.phone,dateNaiss:this.birthday,
                    passport:this.passport,permis:this.permi_de_conduire,description:this.description,personGender:this.personGender}
                let params = {}
                params = {poids:this.poids,temperature:this.temperature,pouls:this.pouls,tension:this.tension,params:this.checkedNames}
                let accparams = {}
                accparams = {persontrauma:this.persontrauma,consumalcohol:this.consumalcohol,consumdrugs: this.consumdrugs,crashDate:this.crashDate}
                test.accparams = accparams
                test.parametre = params

                this.show = !this.show
                this.$v.$touch();

                if (this.$v.$invalid) {

                    this.submitStatus = "ERROR";
                    this.show = !this.show
                } else {
                    // do your submit logic here
                    this.submitStatus = "PENDING";
                    setTimeout(() => {
                        this.submitStatus = "OK";
                        // this.$emit("registerpartners",test);

                        this.StorePatients(test)

                        console.log('test',test)

                    }, 1000);
                }

                //
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
        }
    }
</script>
<style scoped>
    .right_header {
        color: #fff;
        margin-left: 30%;
    }

    </style>
