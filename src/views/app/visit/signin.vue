<template>

    <b-modal scrollable no-close-on-backdrop   id="signin" size="lg" hide-footer>

        <b-overlay :show="openb" rounded="sm" >
            <div id="app" style="border: 4px solid #ffc107">

                <VueSignaturePad width="768px" height="346px" ref="signaturePad"
                                 :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}}" />

                <div>
                    <b-button  variant="outline-danger" @click="$router.go(-1)" style="margin-left: 10px">{{$t('Annuler')}}</b-button>
                    <b-button type="submit" variant="outline-success rights"  style="margin-right:10px;float: right" @click="save()" >{{$t('Enregistrer')}}</b-button>

                </div>

            </div>

        </b-overlay>

    </b-modal>

</template>


<script>


    import { mapGetters,mapActions } from "vuex";
    // import { makeToast } from '../../../plugins/functions'
    export default {
        name:"signin",
        props:{
            rowes:Array
        },
        computed: {
            ...mapGetters(["getStatusSignature"]),
        },
        data() {
            return {
                openb:false
            }},

        methods: {
            makeToast(variant = null,type="info") {
                console.log('Please fill the form correctly',variant)
                switch (type) {
                    case 0: type="error"; break;
                    case 1: type="success" ; break;
                    case 2: type="info"; break;
                    case 3: type="warning"; break;

                }

                this.$toasted.show(this.$t(variant),{type:type})
            },
            ...mapActions([
                "savesignature"
            ]),
            undo() {
                this.$refs.signaturePad.undoSignature();
            },
            save() {

               // this.openb=true
                const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
                console.log(isEmpty);
                //console.log(data);
                // if(isEmpty){
              this.$emit('signature',data)
                //this.savesignature({imageValue:data,id:this.rowes[0].id})

                /* }else{
                     this.makeToast(this.$t('signature_empty'),0)
                 }*/


            }
        },

        mounted(){
            console.log('mounted',this.rowes)
            //console.log('mounted',this.rowes[0].id)
            if (typeof this.rowes === "undefined"){
                this.$router.push({ name: 'allvisit_list', params: { id: '0' }})
            }
        },

        watch: {

            getStatusSignature:function(value){
                this.openb=false
                console.log('value',value)

                if(value){

                    this.$emit('signature',value)

                    //this.$router.push({ name: 'allvisit_list' })
                    this.makeToast('signature ok',1)
                    //this.$store.state.visits.signature=false

                }else{

                    this.makeToast('signature e',0)

                }
            }
        }
    };
</script>