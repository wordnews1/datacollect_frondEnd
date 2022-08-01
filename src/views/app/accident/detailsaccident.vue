<template>

  <b-overlay :show="show" rounded="sm">


    <b-form :aria-hidden="show ? 'true' : null" >

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('accident')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

                  <b-form-group
                      class="col-md-6 mb-30"
                      :label="$t('Type Accident')"
                      label-for="input-1"
                  >

                    <b-form-input disabled

                                  v-model="data.accidentType.value"
                                  type="text"
                    ></b-form-input>

                  </b-form-group>
                <b-form-group
                      class="col-md-6 mb-30"
                      :label="$t('Gravite Accident')"
                      label-for="input-1"
                  >

                    <b-form-input disabled

                                  v-model="data.accidentSeverity.value"
                                  type="text"
                    ></b-form-input>

                  </b-form-group><b-form-group
                      class="col-md-6 mb-30"
                      :label="$t('Date Accident')"
                      label-for="input-1"
                  >

                    <b-form-input disabled

                                  v-model="data.accidentDate"
                                  type="text"
                    ></b-form-input>

                  </b-form-group><b-form-group
                      class="col-md-6 mb-30"
                      :label="$t('Type d impact')"
                      label-for="input-1"
                  >

                    <b-form-input disabled

                                  v-model="data.impactType.value"
                                  type="text"
                    ></b-form-input>

                  </b-form-group>

                  <b-form-group
                      class="col-md-6 mb-30"
                      :label="$t('municipalité')"
                      label-for="input-1"
                  >
                    <b-form-input
                        disabled

                        v-model="data.municipality"
                        type="text"
                    ></b-form-input>

                  </b-form-group>
     <b-form-group
                          class="col-md-6 mb-30"
                          :label="$t('place')"
                          label-for="input-1"
                      >
                        <b-form-input
                            disabled

                            v-model="data.place"
                            type="text"
                        ></b-form-input>

                      </b-form-group>



              </b-row>



            </b-card-body>
          </b-collapse>

        </b-card>
      </div>
      <p></p>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-2 variant="transparent">
              {{$t('route')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-2" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('type de Route')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.roadType.value"
                      type="text"
                  ></b-form-input>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Categorie de Route')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.roadCategory.name"
                      type="text"
                  ></b-form-input>

                </b-form-group><b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Etat de la Route')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.roadState.value"
                      type="text"
                  ></b-form-input>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Carrefour')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.roadState.value"
                      type="text"
                  ></b-form-input>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Type de contrôle de la circulation au carrefour')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.roadTrafficControl.value"
                      type="text"
                  ></b-form-input>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('virage')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.virage.value"
                      type="text"
                  ></b-form-input>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Route avec pente?')"
                    label-for="input-1"
                >
                  <b-form-input
                      disabled

                      v-model="data.roadSlopSection.value"
                      type="text"
                  ></b-form-input>

                </b-form-group>
              </b-row>



            </b-card-body>
          </b-collapse>

        </b-card>
      </div>
      <p></p>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
              {{$t('véhicules')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'vehicule'" :rows="listsoin" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
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
              {{$t('accidentés')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-7" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>


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


    </b-form>
  </b-overlay>

</template>

<script>

//import constants from '../../../plugins/constants'
import ListTable from '../components/List-table2'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
// import partnersVue from "../partners/list"
import { mapGetters,mapActions } from "vuex";
export default {

  name:"dossierpatient",
  props:{
    rowes:Object
  },

  components: {
    ListTable
  },
  mounted(){
    console.log('rowe',this.rowes)
    //this.ListDossierPatient(this.rowes[0].id)
    this.DetailsAccident(this.rowes.id)
    //this.folder_id = this.rowes[0].id

  },
  data() {
    return {
      data:{},
      valeur:'',
      valeur1:{},
      filteredSuggestions:[],
      type:"",
      folder_id:0,

      crashacc:'',
      listsoin:[],
      listexamen:[],
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
          label: "Numero de la Personne",
          field: "personNumber",
          hidden: false,
        },{
          label: "Nom",
          field: "person.firstName",
          hidden: false,
        },{
          label: "Numero de Vehicule ",
          field: "vehicleNumber",
          hidden: false,
        },{
          label: "Annee du permis",
          field: "drivingLicenceYear",
          hidden: false,
        },{
          label: "Role",
          field: "roadType.value",
          hidden: false,
        },{
          label: "Consommation d'alcool?",
          field: "alcoholConsumption.value",
          hidden: false,
        }

      ],
      columnoins:[

        {
          label: "Id",
          field: "id",
          hidden: false,
        },
        {
          label: "Numero d'accident d",
          field: "vehicleAccidentNumber",
          hidden: false,
        },
        {
          label: "Immatriculation",
          field: "plateNumber",
          hidden: false,
        },
        {
          label: "Marque",
          field: "vehicle.brand.value",
          hidden: false,
        },
        {
          label: "Assurance",
          field: "insuranceName",
          hidden: false,
        },                    {

          label: "Assurance Valide?",
          field: "insuranceValid",
          hidden: false,
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
  openb:false,
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
    ...mapGetters(["GETDETAILACCIDENT"]),
  },
  methods:{

    ...mapActions(["DetailsAccident"]),
    editProps(params){

      console.log('params',params)
    },
    deleteProps(params){

      console.log('params', params+'params.formattedRow.id');
    },
    onRowclick(params){
      //this.$router.push({name: 'detailsaccident',params: { rowes:params }})
      console.log('loadpage',params)
    },

    selected(value){
      this.filteredSuggestions = []
      this.valeur = value.item.name
      this.valeur1 = value

      console.log('selected',value)
    },
    makeToast(variant = null,type) {

      switch (type) {
        case 0: type="error"; break;
        case 1: type="success" ; break;
        case 2: type="info"; break;
        case 3: type="warning"; break;

      }

      this.$toasted.show((variant),{type:type})

    },
    savechange(data) {

      console.log('savechange', data);
    },
    openmodalbox(value){

      this.type=value
      console.log('savechange', value);
      this.$bvModal.show('confirmopenAccount')
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
    GETDETAILACCIDENT(data){
      console.log('datae',data)
      this.data = data
      this.listsoin = data.vehicules
      this.listexamen = data.persons

      console.log('datae',this.listsoin)

    }

  }
  ,
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