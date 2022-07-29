<template>
    <div class="main-content">
        <!--<breadcumb :page="$t('register_cg')" :folder="'Lists'" />-->
     <!--   <div class="breadcrumb" style="padding: 0!important;margin:0 !important">
            <slot name="header">

                    <router-link :to="{ name: 'visit_list', params: { id:1 }}">

                        <button class="btn btn-gray-100 btn-icon rounded-circle m-1" type="button">
                            <span class="ul-btn__icon"><i class="i-Back1"></i></span></button>

                    </router-link>

                <h1>{{$t('register_cg')}}</h1>

            </slot>
        </div>-->

           <!-- -->
        <b-overlay :show="show" rounded="sm">

            <registercg
                    :show="show"
                    :rowes="rowes"
                    ref="cartegrise"
                    @registercge="registercgs">

            </registercg>

        </b-overlay>

    </div>
</template>

<script>
    import registercg from "../components/registercg"
    import { mapGetters,mapActions } from "vuex";
    import { makeToast } from '../../../plugins/functions'

    export default {
        components:{registercg},
        props:{
            rowes:Object
        },
        data() {
            return {
                show:false,
                date:new Date(),
            };
        },
        computed:{
        ...mapGetters(["getRegisterStatus"])

        },

        methods:{

            ...mapActions(["registercge"]),

            registercgs(variant = null){
                this.show=true
                this.registercge(variant)
            },

            makeToast(variant = null,type) {

                switch (type) {
                    case 0: type="error"; break;
                    case 1: type="success" ; break;
                    case 2: type="info"; break;
                    case 3: type="warning"; break;

                }

                this.$toasted.show(this.$t(variant),{type:type})


            },
        },

        mounted(){
            console.log('mounted',this.rowes)
            //this.show = (typeof this.rowes === "undefined")
            //console.log('mounted',this.show)
        },

        watch:{

            getRegisterStatus(value){

                console.log('statushold',value)
                //this.$refs.registerPartners.registerp(true)

                if(value.success){

                    makeToast(this.$t(value.message.code),value.message.level)
                    console.log('statushold',value)
                    this.$refs.cartegrise.initformcg()
                    //this.$router.push({ name: 'allvisit_list',params:{id:'0'} })

                }else{
                    makeToast(this.$t(value.message.code),value.message.level)
                }

                this.$store.state.cg.statusregister=false
                this.show=false

            }

        }
    };
</script>
