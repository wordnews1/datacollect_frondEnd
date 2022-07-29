<template>
    <div class="container-fluid">
        <nav class="tabbable">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <!--:class="[item.categorieProduitId == selectcat.categorieProduitId ? 'selectedHold' : '']"-->

                <a class="nav-item nav-link " :class="[item.categorieProduitId == selectcat.categorieProduitId ? 'selectedHold' : '']"
                   style="background: #ffffff9e;margin-left: 5px;" v-for="item in cats" :key="item.categorieProduitId" @click="FetchProducts(item)"
                   id="nav-home-tab" data-toggle="tab"
                   role="tab" aria-controls="nav-home">{{$t(item.libelle) }} </a>

            </div>

        </nav>

    </div>
</template>


<script>

    export default {
        name:"Catproductes",
        props:{
            cats:Array,

        },
        data() {
            return {
                selectcat:{}
            }
        },
        methods:{
            FetchProducts: function(item){

                this.selectcat = item
                this.$emit("FetcProduct",item);
        },

        }
    }

</script>

<style scoped>

    .selectedHold{
        /*background-color:#35B8E0;*/
        color:#E2E2E2;
        border-bottom: 3px solid #f65e48;
    }

    .tabbable .nav-tabs {
        overflow-x: auto;
        overflow-y:hidden;
        flex-wrap: nowrap;
        border-bottom: 1px solid rgba(58, 106, 98, 0.31);
    }
    .tabbable .nav-tabs .nav-link {
        white-space: nowrap;
    }

    a:focus {
        color: red;
        background-color: red;

    }
    </style>