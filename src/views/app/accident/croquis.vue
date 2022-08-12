<template>

<!--  <b-modal id="opencroquis" :title="$t('croquis')" hide-footer>-->
    <b-modal scrollable :title="$t('croquis')"  id="opencroquis" size="xl" hide-footer>

      <b-overlay :show="openb" rounded="sm" >
          <div id="app" style="border: 4px solid #ffc107">

      <b-row>

        <VueSignaturePad width="768px" height="346px" ref="signaturePad"
                         :options="{penColor: pencolor,
              onBegin: () => {$refs.signaturePad.resizeCanvas()},
                                      }" />

      </b-row>
      <div class="buttons">
        <button @click="undo">Undo</button>
        <button @click="save">Save</button>
        <button @click="change"><i class="i-Eraser-2"></i></button>
        <button @click="resume"><i class="i-Pen-2"/></button>
      </div>

      </div>
      </b-overlay>
  </b-modal>
</template>
<script>
export default {
  name:"croquis",

  data() {
    return {
      pencolor:"#000000",
      openb:false
    }
  },
  methods:{
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      alert("Open DevTools see the save data.");
      console.log(isEmpty);
      console.log(data);
    },
    change() {
      /* this.options = {
         penColor: "#ffffff",
       };*/
      console.log('change','change')
      this.pencolor = "#ffffff"
    },
    resume() {
      /*this.options = {
        penColor: "#000000",
      };*/
      this.pencolor = "#000000"
    }
  }
}
</script>