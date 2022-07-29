<template>


    <b-modal :id="id" :title="title" :show="statut" size="xl" hide-footer>

        <!--<b-card
                title="Card with overlay"
                :aria-hidden="show ? 'true' : null"
        >-->
        <template #modal-header="{  }">
            <!-- Emulate built in modal header close button action -->
            <h5>{{title}}</h5>
        </template>


        <template #default="{ hide }">

            <b-overlay :show="show" rounded="sm">

                <b-form :aria-hidden="show ? 'true' : null" @submit.prevent="registerSettlement(type)">

                    <b-form-group
                            class="col-md-12 mb-30"
                            :label="$t('clients')"
                            label-for="input-1"
                    >

                        <b-form-select
                                id="input-3"
                                v-model="client"
                                :options="clients"
                                required
                        ></b-form-select>


                    </b-form-group>

                    <b-form-group
                            class="col-md-10 mb-30"
                            :label="$t('desc_inf')"
                            label-for="input-1"
                    >
                        <b-form-input

                                v-model.trim="$v.nom.$model"
                                type="text"
                                :placeholder="$t('desc_inf')"
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
                            :label="$t('prix')"
                            label-for="input-1"
                    >
                        <b-form-input

                                v-model="prix"
                                type="number"
                                :placeholder="$t('prix')"
                        ></b-form-input>


                    </b-form-group>

                    <p></p>

                    <div style="text-align: right">
                        <b-button  @click="hide()" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
                        <b-button type="submit" variant="outline-success rights" style="position: relative;right: 0;margin-right: 10px;">{{$t('Enregistrer')}}</b-button>
                    </div>

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

    </b-modal>

</template>

<script>

    import { required, minLength } from "vuelidate/lib/validators";

    export default {
        name:"formsettlement",
        props:{
            clients:Array,
            id:String,
            title:String,
            type:String,
            statut:Boolean
        },
        data() {
            return {
                submitStatus: null,
                nom: '',
                prix:1,
                client:'',
                status: false,
                show: false
            }
        },
        validations: {
            nom: {
                required,
                minLength: minLength(4)
            }
        },

        methods:{
            registerSettlement: function(item){

                let test={}
                test = { variant:item, nom: this.nom,
                    content:this.content }

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
                        this.$emit("registersettlement",test);
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