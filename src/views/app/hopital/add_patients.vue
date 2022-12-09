
<template>

    <b-overlay :show="show" rounded="sm">

      <b-modal id="opencontacts" :title="$t('add_contact')" hide-footer>

        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t("add_contact")}} </h5>
        </template>

        <template #default="{  }">
          <b-row>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('CNI')"
                label-for="input-1"
            >

              <b-form-input
                  v-uppercase

                  v-model="contact.cni"
                  type="text"
              ></b-form-input>


            </b-form-group>



            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('nom')"
                label-for="input-1"
            >

              <b-form-input
                  v-uppercase
                  v-model="contact.firstName"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('prenom')"
                label-for="input-1"
            >

              <b-form-input
                  v-model="contact.lastName"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('phone')"
                label-for="input-1"
            >

              <b-form-input

                  v-model="contact.phone"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group  style="margin-bottom: 10px"
                           class="col-md-6 mb-30"
                           :label="$t('Genre')"
                           label-for="input-1"
            >

              <b-form-select v-model="contact.gender">
                <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
                <option v-for="option in sexes" :value="option.id" :key="option.id">
                  {{ option.value }}
                </option>
              </b-form-select>


            </b-form-group>
            <b-form-group  style="margin-bottom: 10px"
                           class="col-md-6 mb-30"
                           :label="$t('Filiation')"
                           label-for="input-1"
            >

              <b-form-select v-model="contact.filiation">
                <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
                <option value="frere">Frere</option>
                <option value="soeur">Soeur</option>
                <option value="bienfaiteur">Bienfaiteur</option>
                <option value="passant">Autorite Etatique</option>
                <option value="passant">Autres</option>

              </b-form-select>


            </b-form-group>


          </b-row>


          <p></p>
          <div style="text-align: right">
            <b-button @click="submitcontact()" variant="outline-success" style="margin-right: 15px">
              {{$t('ajouter')}}</b-button>
          </div>

        </template>

      </b-modal>

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
                                  <b-form-group  style="margin-bottom: 10px"
                                                 class="col-md-6 mb-30"
                                                 :label="$t('Statut du Patient')"
                                                 label-for="input-1"
                                  >

                                    <b-form-select v-model="contact.roadType">
                                      <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
                                      <option v-for="option in respdata.personRoadTypeResp" :value="option.id" :key="option.id">
                                        {{ option.value }}
                                      </option>
                                    </b-form-select>

                                  </b-form-group>
                                  <b-form-group  style="margin-bottom: 10px"
                                                 class="col-md-6 mb-30"
                                                 :label="$t('Profession')"
                                                 label-for="input-1"
                                  >

                                    <b-form-select  v-model="contact.profession">
                                      <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
                                      <option v-for="option in respdata.professionResp" :value="option.id" :key="option.id">
                                        {{ option.name }}
                                      </option>
                                    </b-form-select>


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
                                        style="margin-bottom: 20px"
                                            class="col-md-12 mb-30"
                                            :label="$t('birthday')"
                                            label-for="input-1"
                                    >

                                      <date-picker v-model="birthday" format="YYYY-MM-DD"  valueType="YYYY-MM-DD" ></date-picker>

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

                                      <label style="margin-left: 15px;font-size: 12px;color: #1b406c;margin-bottom: 4px;">Sexe: </label>
<!--                                    <b-form-select
                                        :label="$t(''Genre')"
                                        id="sexe"
                                        name="personGender"
                                        v-model="personGender"
                                        >-->
                                      <select
                                          name="personGender"
                                          v-model="personGender"
                                          style="margin-left: 15px" class="form-control">

                                        <option value=1>
                                            Male
                                        </option>

                                        <option value=2>
                                            Female
                                        </option>

                                      <option value=3>
                                        Inconnu
                                      </option>

                                      </select>
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

                                      <DatePickers format="YYYY-MM-DD H:i"  v-model="crashacc" />


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
                                            required
                                                class="form-control"
                                                name="persontrauma"
                                                v-model="persontrauma"
                                        >

                                            <option value="1">
                                                Traumatisme Mortel
                                            </option>

                                            <option value="2">
                                                Traumatisme Grave/sérieux
                                            </option>
                                          <option value="3">
                                            Traumatisme Léger/Mineur
                                          </option>
                                          <option value="4">
                                            pas de Traumatisme
                                          </option>
                                          <option value="5">
                                           Inconnu
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

            </div>
            <p></p>

            <div role="tablist">
              <b-card no-body class="ul-card__border-radius">

                <b-card-header header-tag="header" class="p-1"  role="tab">
                  <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-10 variant="transparent">
                    {{$t('contact_patient')}}</b-button>
                </b-card-header>

                <b-collapse id="accordion-10" invisible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-row>
                      <b-button  @click ="addcontact()"  variant="success"
                                 style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                      <b-col md="12">
                        <b-overlay :show="loadanotherpage" rounded="sm" >

                          <ListTable :type="'contact'" @onRowclick="onRowclick" :rows="contacts" :columns="columns" :isCLoseMenu="true"
                                     :totalPage="totalPagesoin_" :totalElement="totalElementsoin"
                                     @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                        </b-overlay>
                      </b-col>
                    </b-row>
                    <br/>

                  </b-card-body>
                </b-collapse>

              </b-card>
            </div>
            <p></p>
            <!--<div style="text-align: right">
                <b-button  @click="hide()" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
                <b-button type="submit" variant="outline-success rights" style="position: relative;right: 0;margin-right: 10px;">{{$t('Enregistrer')}}</b-button>
            </div>-->

          <b-col md="12">
            <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
          </b-col>

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
    import ListTable from '../components/list-table'
   // import partnersVue from "../partners/list"
    import { mapGetters,mapActions } from "vuex";
    import DatePickers from 'vuejs-datetimepicker';

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    export default {

        name:"registerPartners",
        props:{
            id:String,
            title:String,
            type:String,
            statut:Boolean
        },
        components:{DatePicker,DatePickers,ListTable},

        data() {
            return {
              respdata:[],
              persontrauma:1,
              sexes:[{
                id:1,
                value:"Homme"
              },
                {
                  id:2,
                  value:"Femme"
                },
                {
                  id:9,
                  value:"Inconnu"
                }],
              contacts:[],
              contact:{},
              columns:[

                {
                  label: "CNI",
                  field: "cni",
                  hidden: false,
                },
                {
                  label: "Prenom",
                  field: "firstName",
                  hidden: false,
                },
                {
                  label: "Nom",
                  field: "lastName",
                  hidden: false,
                },
                {
                  label: "Numero de Telephone",
                  field: "phone",
                  hidden: false,
                },
                {
                  label: "actions",
                  field: "actions",
                  html: true
                }
              ],
              totalPagesoin_:0,
              loadanotherpage:false,
              totalElementsoin:0,
                checkEx2Options : [
                    {item: 'oui', name: 'Oui'},
                    {item: 'non', name: 'Non'}
                ],
              crashacc:'',
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
            ...mapGetters(["GetStorePatients","GETLISTDATA"]),
        },
      mounted(){

        this.ListData()
      },


        methods:{

            ...mapActions(["StorePatients","ListData"]),
          submitcontact(){

            this.$bvModal.hide('opencontacts')
            this.contacts.push(this.contact)
            this.contact={}
            this.makeToast(this.$t('added'),1)
          },
          onRowclick(){},
          addcontact(){
            this.$bvModal.show('opencontacts')
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
            this.currentpage = params
            this.loadanotherpage = true

          },
            registerCustomer: function(item){
                console.log('test',item)
                let test={}
                test = {cni: this.cni, nom: this.nom,prenom:this.prenom,crashDate:this.crashacc,
                    telephone:this.phone,dateNaiss:this.birthday,
                    passport:this.passport,permis:this.permi_de_conduire,description:this.description,gender:this.personGender}
                let params = {}
                params = {poids:this.poids,temperature:this.temperature,pouls:this.pouls,tension:this.tension,params:this.checkedNames}
                let accparams = {}
                accparams = {persontrauma:this.persontrauma,consumalcohol:this.consumalcohol,
                  consumdrugs: this.consumdrugs}
                test.accparams = accparams
                test.parametre = params
              test.contacts = this.contacts

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
        },

      watch:{
        GETLISTDATA(data){

          console.log('data',data)
          this.respdata = data

        },

        GetStorePatients(value){

            console.log('ff',value)
          this.$router.push({name: 'hospital',params: { rowes:0 }})
          }
        },
    }
</script>
<style scoped>
    .right_header {
        color: #fff;
        margin-left: 30%;
    }

    .year-month-wrapper{
      background-color: #003473!important;
    }
    </style>
