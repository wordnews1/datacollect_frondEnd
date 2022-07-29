
<template>

    <b-form-input
            v-uppercase
            v-model="formattedreferenceValue"
            type="text"
            required
            @input="input"
            @keyup="focusOut"
            @blur="focusOut"
            placeholder="LT00215212"
    ></b-form-input>

</template>


<script>
    import { mapGetters,mapActions } from "vuex";
    export default {

        data() {
            return {
                referenceValue: 0,
                preventNextIteration: false,
                formattedreferenceValue: ''
            };
        },

        methods: {
            ...mapActions(["searchReference"]),
            resetfield(){
                this.formattedreferenceValue = ''
            },
            input(event){
                console.log('input',event)

                this.$emit('setrefoverlay',true)

                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }

                this.timer = setTimeout(() => {

                    this.searchReference(this.formattedreferenceValue)
                    console.log('hello',this.formattedreferenceValue)

                },2000);

            },
            focusOut: function(event) {

                if (['Arrow', 'Shift'].includes(event.key)) {
                    this.preventNextIteration = true;
                    return;
                }
                if (this.preventNextIteration) {
                    this.preventNextIteration = false;
                    return;
                }

                this.referenceValue = this.formattedreferenceValue.replace(/[^a-zA-Z0-9]/g, "");
                this.formattedreferenceValue = this.referenceValue.toUpperCase()

                this.$emit('setreference',this.formattedreferenceValue)

            }
        },
        computed: {

            ...mapGetters(["getProducts"]),

        },

        watch:{
            getProducts(val){
                console.log('result',val)
                this.$emit('setlistpr',val)
                //this.products=val;
            }
        }
    };
</script>