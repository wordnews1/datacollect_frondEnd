<template>

        <b-modal :id="id" scrollable no-close-on-backdrop :title="title" :show="statut" hide-footer>

        <template #default="{ hide }">

            <b-overlay :show="show" rounded="sm">
            <b-form :aria-hidden="show ? 'true' : null" @submit.prevent="registerCustomer(type)">

                <b-form-group
                        class="col-md-10 mb-30"
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
                        class="col-md-10 mb-30"
                        :label="$t('nom_label')"
                        label-for="input-1"
                >

                    <b-form-input

                            v-model.trim="$v.nom.$model"
                            type="text"
                            :placeholder="$t('prooftag')"
                            @keyup="focusOut"
                            @blur="focusOut"
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
                        class="col-md-10 mb-30"
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
                        class="col-md-10 mb-30"
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
                        class="col-md-10 mb-30"
                        :label="$t('birthday')"
                        label-for="input-1"
                >
                    <b-form-datepicker id="example-datepicker"  v-model="birthday" class="mb-2"></b-form-datepicker>

                </b-form-group>
                <b-form-group
                        class="col-md-10 mb-30"
                        :label="$t('passports')"
                        label-for="input-1"
                >
                    <b-form-input

                            v-model="passport"
                            type="number"
                            :placeholder="$t('passport')"
                    ></b-form-input>

                </b-form-group>
                <b-form-group
                        class="col-md-10 mb-30"
                        :label="$t('permi')"
                        label-for="input-1"
                >
                    <b-form-input

                            v-model="permi_de_conduire"
                            type="number"
                            :placeholder="$t('permis')"
                    ></b-form-input>

                </b-form-group>


                <p></p>

                <div style="text-align: right">
                    <b-button  @click="hide()" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
                    <b-button type="submit" variant="outline-success rights" style="position: relative;right: 0;margin-right: 10px;">{{$t('Enregistrer')}}</b-button>
                </div>

                <p class="typo__p" v-if="submitStatus === 'OK'">
                    <!--{{ makeToast("success","success") }}-->
                </p>
                <p  class="typo__p" v-if="submitStatus === 'ERROR'">
                    <!--{{ makeToast("Remplissez les champs obligatoires","error") }}-->

                </p>
                <div  class="typo__p" v-if="submitStatus === 'PENDING'">
                    <div class="spinner sm spinner-primary mt-3"></div>
                </div>

            </b-form>
            </b-overlay>
        </template>

    </b-modal>

</template>

<script>

    import { required, minLength, maxLength } from "vuelidate/lib/validators";

    export default {
        name:"registerPartners",
        props:{
            id:String,
            title:String,
            type:String,
            statut:Boolean
        },
        data() {
            return {
                submitStatus: null,
                cni:'',
                nom: '',
                prenom: '',
                phone: '',
                status: false,
                birthday:null,
                passport:null,
                permi_de_conduire:null,
                show: false
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
                test = { variant:item,
                    cni: this.cni,
                    nom: this.nom,
                    prenom:this.prenom,
                    telephone:this.phone,
                    dateNaiss:(this.birthday!==''?this.birthday:null),
                    passport:(this.passport!==''?this.passport:null),
                    permis:(this.permi_de_conduire!==''?this.permi_de_conduire:null),
                    date:new Date().toLocaleDateString() }

                    this.show = !this.show
                    this.$v.$touch();

                    if (this.$v.$invalid) {

                        this.submitStatus = "ERROR";
                        this.show = !this.show
                        this.makeToast("Remplissez les champs obligatoires","error")

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

            registerp(value){
              console.log('relande',value)
                this.show = false
                if(value){
                       this.nom='',
                        this.cni='',
                        this.prenom = '',
                        this.phone = '',
                        this.birthday = null,
                        this.passport = null,
                        this.permi_de_conduire = null
                }

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
            focusOut(){
                if (['Arrow', 'Backspace', 'Shift'].includes(event.key)) {
                    this.preventNextIteration = true;
                    return;
                }
                if (this.preventNextIteration) {
                    this.preventNextIteration = false;
                    return;
                }

                //this.referenceValue = this.formattedreferenceValue.replace(/\s/g, '').match(/([a-zA-Z0-9])/g)[0];
                this.nom = this.nom.replace(/[^a-zA-Z ]/g, "");
                this.nom = this.nom.toUpperCase()

            }
        }
    }
</script>