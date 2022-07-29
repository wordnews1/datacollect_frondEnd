<template>
    <div>
        <b-form-input

                autocomplete="off"
                type="text"
                v-uppercase
                @input="searchPartners({val:msg,type:type})"
                v-model="userInput"
                placeholder=""
                ref="client"
                size="sm"
                @erase="deleteText"

        ></b-form-input>

        <!--<b-form-select
                v-if="filteredSuggestions.length"
                style="width:235px!important;"
        >

            <b-form-select-option v-for="(s,i) in filteredSuggestions" :key="i"
                                  @click="selected({item:s,msg:msg})">

                {{s[optionsKey]}} &#45;&#45; <b>{{s[optionsKey1]}}</b></b-form-select-option>

        </b-form-select>-->

            <b-list-group v-if="filteredSuggestions.length" style="float:inherit;position:absolute;z-index:1">

                <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                                   @click="selected({item:s,msg:msg})">{{s[optionsKey]}} -- <b>{{s[optionsKey1]}}</b>

                </b-list-group-item>

            </b-list-group>

    <!--@click="removeCatProducts(data)"-->
    </div>
</template>

<script>
    //import Vue from 'vue'

    import useAutocomplete from '../../../store/modules/useAutocomplete'

    //import { initialState } from '../../../plugins/functions'
    export default {
        name:"AutoComplete",
        //props: ['msg', 'bus','type','options','optionsKey','optionsKey1'],
        props:{

            msg:String,
            type:String,
            options:Array,
            optionsKey:String,
            optionsKey1:String
        },

        setup({options,optionsKey,optionsKey1}){
            return {
                ...useAutocomplete(options,optionsKey,optionsKey1)
            }
        },
        data(){
                return {}
        },
        methods:{
            resetWindow: function (){

                this.deleteText('contacts')
                this.deleteText('clients')
                this.deleteText('vendeurs')
            },

            change(value){
                console.log('change',value)

                //this.$emit("save-change",this.options);
            },
            loadData: function(_clear){

                if(_clear){
                this.$emit("save-option",{});
                this.userInput = ""
            }else{

                this.$emit("save-options",{userInput:this.userInput,msg:this.msg});
            }


        },

            initcontacts:function(){
                this.userInput=''
            },

    }
    }

</script>

<style scoped>
    </style>