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
                <b-form :aria-hidden="show ? 'true' : null" ref="regproducts" @submit.prevent="registerProducts(type)">

                    <b-form-group
                            class="col-md-12 mb-30"
                            :label="$t('img')"
                            label-for="input-1"
                    >
                        <!--<vue-img-preview @change="selectedFile(event)"></vue-img-preview>-->
                        <ImagePreview @input="input"></ImagePreview>

                    </b-form-group>

                    <b-form-group
                            class="col-md-12 mb-30"
                            :label="$t('cat_products')"
                            label-for="input-1"
                    >

                        <!--<b-form-select
                                id="proprietaire"
                                name="proprietaireId"
                                v-model="proprietaireId"
                                :placeholder="$t('proprietaire')"
                        ></b-form-select>-->
                        <b-form-select
                                id="input-3"
                                name="categorieProduitId"
                                v-model="catproduct"
                                required
                        >

                            <b-form-select-option  v-for="item in cats" :value="item.categorieProduitId"
                                                   :key="item.categorieProduitId">

                                {{item.libelle}}</b-form-select-option>
                        </b-form-select>


                    </b-form-group>

                    <b-form-group
                            class="col-md-10 mb-30"
                            :label="$t('nom_label')"
                            label-for="input-1"
                    >

                        <b-form-input

                                v-model.trim="$v.nom.$model"
                                type="text"
                                name="libelle"
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
                            :label="$t('prix')"
                            label-for="input-1"
                    >

                        <b-form-input
                                v-model="prix"
                                required
                                type="number"
                                name="prix"
                                :placeholder="$t('prix')"
                        ></b-form-input>


                    </b-form-group>


                    <b-form-group
                            class="col-md-12 mb-30"
                            :label="$t('desc_inf')"
                            label-for="input-1"
                    >
                        <b-row>
                            <wysiwyg v-model="content"  />
                        </b-row>

                    </b-form-group>


                    <b-form-group
                            class="col-md-12 mb-30"
                            :label="$t('validity_date')"
                            label-for="input-1"
                    >
                        <b-form-input
                                v-model="date"
                                required
                                type="number"
                                name="delaiValidite"
                                :placeholder="$t('validity_date')"
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
    import ImagePreview from "../components/ImagePreview"
    import { mapGetters,mapActions } from "vuex";
    import { required, minLength } from "vuelidate/lib/validators";

    export default {
        name:"registerPartners",
        props:{
            id:String,
            title:String,
            type:String,
            statut:Boolean,
        },
        components:{ImagePreview},
        data() {
            return {
                img: null,
                catproduct:{},
                submitStatus: null,
                nom: '',
                date:1,
                prix: 0,
                content:'',
                status: false,
                show: false,
                cats:[]
            }
        },
        validations: {
            nom: {
                required,
                minLength: minLength(4)
            },
            prix: {
                required
            },
        },
        mounted(){
            this.FetchCatProducts()
        },
        computed: {
            ...mapGetters(["getCatProducts"]),
        },
        watch:{
            getCatProducts: function(value){
                this.cats = value
                console.log('files2',value);
            },
        },

        methods:{
            ...mapActions(["FetchCatProducts"]),
           /* selectedFile(event) {

                console.log('files2',event);
                this.img = event.target.files[0]
            },*/
            registerp(){
                this.show = !this.show

                    this.catproduct={}
                    this.nom=''
                    this.prix=0
                    this.content=''
                    this.date = 0

            },
            input(data){

                this.img = data
            },
            registerProducts: function(){

                if(this.img == null){
                    //this.makeToast('error','')
                }


                this.show = !this.show
                this.$v.$touch();

                if (this.$v.$invalid) {

                    this.submitStatus = "ERROR";
                    this.show = !this.show
                } else {
                    // do your submit logic here
                    this.submitStatus = "PENDING";
                    setTimeout(() => {
                        /*let test={}
                        test = { variant:item, categorieProduitId:this.categorie,libelle: this.nom,
                            prix:this.prix,description:this.content,
                            date:new Date().toLocaleDateString() }*/

                        this.submitStatus = "OK";

                        let formData = new FormData(this.$refs.regproducts);

                        formData.append('file', this.img);
                        formData.append('description', this.content);
                        formData.append('variant', 'produits');

                        this.$emit("registerproducts",formData);

                       /* for(var pair of formData.entries()) {
                            console.log(pair[0]+ ', '+ pair[1]);
                        }*/

                    }, 1000);
                }

            },
            // type
            // message
            //
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

        }
    }
</script>
<style scoped>
  /*  .vue-img-preview-container{
        height:200px
    }*/
    </style>