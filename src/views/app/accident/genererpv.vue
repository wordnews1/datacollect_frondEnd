<template>
<!--  <vue-html2pdf
      :show-layout="true"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="297"
      filename="hee hee"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="793px"
      ref="html2Pdf"
  >

    <section slot="pdf-content">-->
  <b-overlay :show="loadanotherpage" rounded="sm" >
      <b-card no-body style="size: A4" id="printMe">


        <b-card-body >
          <b-row>
            <b-col md="5" style="justify-content: center;font-size: 10px">
              REPUBLIQUE DU CAMEROUN <br>
              PRESIDENCE DE LA REPUBLIQUE <br>
              DELEGATION GENERALE A LA SURETE NATIONALE <br>
              SECRETARIAT GENERAL <br>
              DIRECTION DE LA SECURITE <br>
              SOUS DIRECTION DE LA VOIE PUBLIQUE ET DE LA CIRCULATION<br>
            </b-col>
            <b-col md="2">
              <img src="@/assets/police.jpeg" alt="logopolice"/>
            </b-col>

            <b-col md="5" style="justify-content: center;font-size: 10px">
              REPUBLIC OF CAMEROUN<br>
              PRESIDENCY OF THE REPUBLIC<br>
              GENERAL DELEGATION FOR NATIONAL SECURITY<br>
              GENERAL SECRETARY<br>
              DEPARTMENT OF PUBLIC SECURITY<br>
              SUB DEPARTMENT OF THE PUBLIC HIGHWAY AND CIRCULATION<br>
            </b-col>
          </b-row>
          <br/>
          <br/>
          <b-row >

            <b-form-group
                class="col-md-4 mb-30"
                :label="$t('Id Accident')"
                label-for="input-1"
            >
              <b-form-input
                  class="noborder"
                  v-model="idacc"
                  type="text"

              ></b-form-input>

            </b-form-group>

            <b-form-group
                class="col-md-4 mb-30"
                :label="$t('crashacc')"
                label-for="input-1"

            >

              <b-form-input
                  class="noborder"
                  v-model="crashacc"
                  type="text"

              ></b-form-input>

              <!--
              <date-picker  v-model="crashacc" format="YYYY-MM-DD"
              valueType="YYYY-MM-DD" ></date-picker>
              -->

            </b-form-group>
            <b-form-group
                class="col-md-4 mb-30"
                :label="$t('crashouracc')"
                label-for="input-1"
            >
              <b-form-input
                  class="noborder"
                  v-model="crashouracc"
                  type="text"
                  required

              ></b-form-input>

            </b-form-group>

            <br/>
            <br/>

            <div  class="col-md-12" style="margin-top: 25px;margin-left: 15px">
              <label style="font-size: 18px">Patrouille, </label><span style="font-size: 14px;margin-left: 2px">{{patrouille}}</span>
            </div><br/>
            <div  class="col-md-12" style="margin-left: 15px">
              <label style="font-size: 18px">Nous, </label><span style="font-size: 14px;margin-left: 2px">{{nous}}</span>
            </div><br/>
            <div  class="col-md-12" style="margin-left: 15px">
              <label style="font-size: 18px">Assiste De,</label> <span style="font-size: 14px">{{assiste}}</span>
            </div><br/>
            <div class="col-md-12" style="margin-left: 15px">
              <label style="font-size: 18px">Avons constate accident,</label> <span style="font-size: 14px">{{constate}}</span>
            </div><br/>
            <div  class="col-md-12" style="margin-left: 15px">
              <label style="font-size: 18px">De la circulation survenu, </label> <span style="font-size: 14px">{{circulation}}</span>
            </div><br/>

          </b-row>


        </b-card-body>
        <p></p>


        <div style="text-align: right">
          <b-button  @click="$router.go(-1)" class="lefts" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
          <!-- <b-button  variant="outline-success" style="margin-right: 15px">Pdf</b-button>-->
          <b-button  variant="outline-success" @click="prints()" style="margin-right: 15px">{{$t('print')}}</b-button>
        </div>

        <b-row style="display: block;margin: 0 auto">
          <img v-bind:src="image" />
        </b-row>


      </b-card>
  </b-overlay>

<!--    </section>

  </vue-html2pdf>-->
</template>

<script>
import axios from 'axios'
import constants from '../../../plugins/constants'
//import VueHtml2pdf from 'vue-html2pdf'
export default {

  name:"genererpv",
  components: {
    /*VueHtml2pdf*/
  },
  data() {
    return {
      loadanotherpage:true,
      data: {},
      options: {
        penColor: "#000000",
      },
      pencolor: "#000000",
      idacc: 23,
      crashacc: '23/08/2022',
      crashouracc: '13:23',
      patrouille: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ',
      nous: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ',
      assiste: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ',
      constate: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ',
      circulation: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ',
      image:""
    }
  },
  props:{
    rowes:Array
  },
  methods:{
    prints(){
      this.$htmlToPaper('printMe');
    }
  },
  mounted() {

    axios.get(constants.resource_url + 'accidents/get-report/'+this.rowes[0].id,{}
    )
        .then(list => {

          this.loadanotherpage=false
          if (list.data.success) {
            console.log('products_error', list.data.data.nous);

            this.idacc = this.rowes[0].id
            this.crashacc = this.rowes[0].crashDate
            this.crashouracc = this.rowes[0].crashTime

            this.patrouille = list.data.data.patrouille
            this.nous = list.data.data.nous
            this.assiste = list.data.data.assiste
            this.constate = list.data.data.constate
            this.circulation = list.data.data.circulation

          }
        })
        .catch(function (error) {
          this.loadanotherpage=false
          console.log('products_error', error);
          // Handle Errors here.
          // var errorCode = error.code;

        });
  }

}

</script>

<style>
.noborder {
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
}
</style>