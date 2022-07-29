<template>

    <b-row>
        <!-- column-one -->

        <b-col :md="3" class="mb-30" v-for="(item,index) in rows_kanban" :key="item.columnname">
            <b-list-group >
        <!---->
          <b-list-group-item v-bind:style="{ 'background-color': colors[index] }">{{item.columnname}}
              <b-badge variant="primary badge-square-info  m-1">{{item.number}}</b-badge></b-list-group-item>


            </b-list-group>

                <b-row style="margin-top: 5px">
                    <b-col md="12">
                        <draggable
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                        >
                            <transition-group
                                    type="transition"
                                    :name="!drag ? 'flip-list' : null"
                            >
                                <b-card
                                        class="mb-30 cursor-pointer"
                                        v-for="element in item.visites"
                                        :key="element.ref"
                                >
                                    <div class="d-flex justify-content-between">
                                        <h6 class="text-muted mb-1">{{ element.ref }}
                                            <b-badge pill variant="light m-2">{{element.contreVisite?'CV':''}}</b-badge></h6>
                                        <!--<a href>-->
                                        <!--<i class="nav-icon i-Pen-2"></i>-->
                                        <!--</a>-->
                                    </div>

                                </b-card>
                            </transition-group>
                        </draggable>
                    </b-col>
                </b-row>

          <!--  </b-card>-->
        </b-col>


    </b-row>

</template>

<script>
    import draggable from "vuedraggable";
    export default {

        display: "ListKanban",
        props:{
            rows_kanban:Array,
            nbre:Number
        },

        mounted(){
            this.colors = this.$store.state.visits.colors
        },

        data(){
            return {
                drag:true,
                colore:'#003473',
                colors:["#003473"]
            }
        },

        components: {
            draggable
        },

        methods: {

        },

        computed: {

            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            sizes(){

                return (12/this.nbre)
            }

        }

    };
</script>


<style scoped>

    .mb-30{
        margin-bottom: 10px !important;
    }

    .list-group-item{
        margin:0;

    }


</style>
