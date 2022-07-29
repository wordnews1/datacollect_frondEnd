<template>

    <b-modal scrollable no-close-on-backdrop   id="tests" size="lg" hide-footer>

        <template >

            <div class="container" >

                <div  class="card" id="printMe">

                    <div class="card-header">
                        <h3 style="display: flex; align-items: center; justify-content: center" class="center">{{$t('Recu')}}</h3>

                        <br>
                        <!--<strong><b>SATELLITE NGONO</b></strong><p></p>-->
                        <span class="float-left"> <strong><!--numero de Ticket-->{{$t('num_ticket')}}:</strong>
                            <!--110011121252-->{{encaissements.numTicket==null?null:encaissements.numTicket}}</span>

                        <span class="float-right"> <strong>{{encaissements.dateVente| momentes}}<!--{{dates}}--></strong> </span><br>
                        <div>
                            <strong class="float-right">{{encaissements.nomClient}}</strong>
                        </div><br>
                        <div class="float-right">
                            {{encaissements.numClient}}
                        </div><br>
                        <div  class="float-right"> {{encaissements.lieuDeNaiss}}</div>

                    </div>
                    <div class="card-body">

                        <div class="table-responsive-sm">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th class="center">#</th>
                                    <th>{{$t('Désignation')}}</th>
                                    <th>{{$t('Prix')}}</th>
                                </tr>
                                </thead>

                                <tbody>

                                <tr class="item" v-if="!encaissements==null">
                                    <td>{{$t('no_data')}}</td>
                                </tr>

                                <tr class="item" v-else v-for="(item,index) in encaissements.produits"  :key="index">
                                    <td class="center">{{index+1}}</td>
                                    <td class="left"><b>Vehicule: </b> {{item.immatriculation}}; {{item.description}}  {{item.cat}}</td>
                                    <td class="left">{{item.prix|currencys(codepays,devise)}}</td>

                                </tr>

                                </tbody>

                            </table>
                        </div>

                        <div class="row">
                            <div class="col-lg-4 col-sm-5">

                            </div>

                            <div class="col-lg-7 col-sm-7 ml-auto">
                                <table class="table table-clear table-bordered">
                                    <tbody>

                                    <tr>
                                        <td class="left">
                                            <strong>{{$t('amount_tax')}}</strong>
                                        </td>
                                        <td class="right">{{encaissements.totalHT|currencys(codepays,devise)}}<!--12.500--></td>
                                    </tr>

                                    <tr>
                                        <td class="left">
                                            <strong>{{$t('T.V.A')}} (19,25%)</strong>
                                        </td>
                                        <td class="right">{{(encaissements.total - encaissements.totalHT)|currencys(codepays,devise)}}</td>
                                    </tr>

                                    <tr>
                                        <td class="left">
                                            <strong>{{$t('TTCAmount')}}</strong>
                                        </td>
                                        <td class="right">{{encaissements.total|currencys(codepays,devise)}}<!--25.000--></td>
                                    </tr>

                                   <!-- <tr v-if="encaissements.operationCaisse.montant>0">
                                        <td class="left">
                                            <strong>{{$t('Montant_Encaisse')}}</strong>
                                        </td>
                                        <td class="right">{{encaissements.operationCaisse.montant|currencys(codepays,devise)}}&lt;!&ndash;25.000&ndash;&gt;</td>
                                    </tr>-->

                                    </tbody>
                                </table>

                            </div>

                        </div>
                        <div class="row" v-if="encaissements.total>0">

                            <span  style="margin-left: 15px">{{$t('Net_a_Payer')}}:</span><span>{{encaissements.lettre}}</span><br>

                        </div>
                        <br>
                        <!--align-items: center; justify-content: center"-->
                        <span style="display: flex;margin-top: 15px;margin-left: 30px;"
                              v-html="country"> </span><br>
                    </div>
                </div>
                <p></p>
                <div style="text-align: right">
                    <b-button  @click="cancels()" class="lefts" variant="outline-danger" style="margin-right: 15px">{{$t('Annuler')}}</b-button>
                    <b-button  variant="outline-success" @click="prints()" style="margin-right: 15px">{{$t('print')}}</b-button>
                </div>


            </div>

        </template>

    </b-modal>

</template>

<script>
    import moment from 'moment'
    export default {
        name: "salesreceipt",
        props: {
            encaissements:Object,
            field:String,
            invoice_tax:Number,
            dates:new Date().toLocaleString(),
            codepays:String,
            devise:String,
            country:String


        },

        data(){
            return {

            }
        },
        filters:{
            momentes: function (date) {
                return moment(date).format('yyyy-MM-DD HH:mm');
            },
            currencys:function (value,codepays,devise) {

                return new Intl.NumberFormat(codepays, { style: 'currency', currency: devise }).format(value);
            }
        },
        methods:{
            prints(){
                this.$emit('print');
            },
            cancels(){
                this.$emit('cancels');
            }},
        mounted(){

            console.log('listproductys',this.listproducts)
        },
        computed: {
            /*total() {
                return this.items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
            }*/
        },

    }

</script>
<style scoped>

    .lefts{
        position: relative;left: 0;margin-left: 10px;
    }

    .invoice-box {
        width: 500px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
    }

    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }

    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }

    .invoice-box table tr td:nth-child(n + 2) {
        text-align: right;
    }

    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }

    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }

    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }

    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
    }

    .invoice-box table tr.item.last td {
        border-bottom: none;
    }

    .invoice-box table tr.item input {
        padding-left: 5px;
    }

    .invoice-box table tr.item td:first-child input {
        margin-left: -5px;
        width: 100%;
    }
    .headings {
        background-color: rgba(89, 80, 98, 0.2);
        font-weight: 700;
    }


    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }

    .invoice-box input[type="number"] {
        width: 60px;
    }

    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }

        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }

    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
        sans-serif;
    }

    .rtl table {
        text-align: right;
    }

    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
</style>