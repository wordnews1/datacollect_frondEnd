                }" />
        <template>


          <b-overlay :show="openb" >
            <div>


              <VueSignaturePad width="768px" height="346px"  id="signature"  ref="signaturePad"
                                :options="{penColor: pencolor,
              onBegin: () => {$refs.signaturePad.resizeCanvas()},
                                      }" />
              <div class="buttons">
                <b-button style="float: left;margin-left: 10px" @click="$router.push('pv')">Précédent</b-button>
                <b-button style="float: left;margin-left: 10px" @click="hideModal">Annuler</b-button>

                <b-button @click="undo">retour</b-button>
                <b-button @click="change"><i class="i-Eraser-2"></i></b-button>
                <b-button @click="resume"><i class="i-Pen-2"/></b-button>

                <b-button style="float: right;margin-right: 10px" @click="saveimage">Enregistrer</b-button>
              </div>
            </div>
          </b-overlay>

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
            mounted(){
              //$refs.signaturePad.resizeCanvas()

            },
            methods:{
              saveimage(){

                console.log('image')
                const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
                console.log(isEmpty);

                this.image = data
                console.log('image',data);

              },

              hideModal() {
                this.$bvmodal.hide('opencroquis')
              },
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
        <style >
          .right_header {
            color: #fff;
            margin-left: 30%;
          }
          .noborder {
            border: none;
            background-color: transparent;
            resize: none;
            outline: none;
          }

          .modal-fullscreen .modal-dialog {
            max-width: 100%;
            margin: 0;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100vh;
            display: flex;
            position: fixed;
            z-index: 100000;
          }
          .buttons {
            display: flex;
            gap: 8px;
            justify-content: center;
            margin-top: 8px;
          }

        </style>