
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
                                <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-8 variant="transparent">
                                    {{$t('profile_inf')}}</b-button>
                            </b-card-header>

                            <b-collapse id="accordion-8" invisible accordion="my-accordion" role="tabpanel">

                                <b-card-body>
                                        <vue-img-preview></vue-img-preview>
                                </b-card-body>

                            </b-collapse>

                        </b-card>
                    </div>
                    <p></p>

                    <div role="tablist">
                        <b-card no-body class="ul-card__border-radius">
                            <b-card-header header-tag="header" class="p-1"  role="tab">
                                <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-9 variant="transparent">
                                    {{$t('adress_inf')}}</b-button>
                            </b-card-header>

                            <b-collapse id="accordion-9" invisible accordion="my-accordion" role="tabpanel">

                                <b-card-body>
                                        <partnersVue :rout=rout :type=address></partnersVue>
                                </b-card-body>

                            </b-collapse>

                        </b-card>
                    </div>
                    <p></p>

                    <div role="tablist">
                        <b-card no-body class="ul-card__border-radius">
                            <b-card-header header-tag="header" class="p-1"  role="tab">
                                <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
                                    {{$t('socials_inf')}}</b-button>
                            </b-card-header>
                            <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <b-row>
                                        <b-col md="6">

                                            <b-form-group
                                                    class="col-md-12 mb-30"
                                                    :label="$t('facebook')"
                                                    label-for="input-1"
                                            >
                                                <b-form-input

                                                        v-model="facebook"
                                                        type="text"
                                                        :placeholder="$t('facebook')"
                                                ></b-form-input>

                                            </b-form-group>
                                            <b-form-group
                                                    class="col-md-12 mb-30"
                                                    :label="$t('linkedin')"
                                                    label-for="input-1"
                                            >
                                                <b-form-input

                                                        v-model="linkedin"
                                                        type="text"
                                                        :placeholder="$t('linkedin')"
                                                ></b-form-input>

                                            </b-form-group>


                                        </b-col>
                                        <b-col md="6">


                                            <b-form-group
                                                    class="col-md-12 mb-30"
                                                    :label="$t('whatsapp')"
                                                    label-for="input-1"
                                            >
                                                <b-form-input

                                                        v-model="whatsapp"
                                                        type="text"
                                                        :placeholder="$t('whatsapp')"
                                                ></b-form-input>


                                            </b-form-group>

                                            <b-form-group
                                                    class="col-md-12 mb-30"
                                                    :label="$t('insta')"
                                                    label-for="input-1"
                                            >
                                                <b-form-input

                                                        v-model="insta"
                                                        type="text"
                                                        :placeholder="$t('insta')"
                                                ></b-form-input>

                                            </b-form-group>
                                        </b-col>
                                    </b-row>

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
    import partnersVue from "../partners/list"

    export default {

        name:"registerPartners",
        props:{
            id:String,
            title:String,
            type:String,
            statut:Boolean
        },
        components:{partnersVue},
        data() {
            return {
                linkedin:"",
                insta:"",
                whatsapp:"",
                facebook:"",
                address:"adresses",
                rout:false,
                content:"",
                town:"",
                rue:"",
                zip:"545",
                zip_other:"1548",
                pays:"",
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

        methods:{
            registerCustomer: function(item){

                let test={}
                test = { variant:item,cni: this.cni, nom: this.nom,prenom:this.prenom,
                    telephone:this.phone,dateNaiss:this.birthday,
                    passport:this.passport,permis:this.permi_de_conduire,date:new Date().toLocaleDateString() }

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
                        this.$emit("registerpartners",test);
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