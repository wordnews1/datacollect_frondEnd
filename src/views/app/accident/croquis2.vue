<template>
  <b-overlay :show="loadanotherpage" rounded="sm" >
  <div >
    <h1>Croquis de l'accident</h1>
    <div class="show-area">
      <CanvasDraw :width="1000" :height="480" :outputName="'example'" @send="send"/>
    </div>
  </div>
  </b-overlay>
</template>

<script>

import axios from 'axios'
import constants from '../../../plugins/constants'
import CanvasDraw from './../components/CanvasDraw.vue'
export default {
  name: 'croquis2',
  components: {
    CanvasDraw
  },
  data() {

    return {
      loadanotherpage:false,
    }
  },
  props:{
    rowes:Object
  },
  mounted(){
    console.log('rowe',this.rowes)
    console.log('rowe',this.rowes.id)
  },
  methods:{
    makeToast(variant = null,type) {

      switch (type) {
        case 0: type="error"; break;
        case 1: type="success" ; break;
        case 2: type="info"; break;
        case 3: type="warning"; break;

      }

      this.$toasted.show((variant),{type:type})

    },
    send(formdata){

      this.loadanotherpage=true
      formdata.append('accident_id',this.rowes.id)
      axios.post(constants.resource_url+'accidents/save-drawing',formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
      )
          .then(list => {

            console.log('ajouté',list.data)
            console.log('ajouté',list.data.success)

            if(list.data.success){
              //build object path
              this.loadanotherpage=false
              this.makeToast(this.$t('Croquis de l\'image ajouté' ),1)
              this.$router.push({name: 'accidents'})
            }else{
              this.makeToast(this.$t('erreur lors de l\'ajout de l\'image'),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });

    }
  }
}

</script>