<template>

    <b-modal scrollable no-close-on-backdrop id="bilan" size="lg" hide-footer>

        <template >
            <div >
            <div class="container" id="bilanMe">
                <div class="card" >
                    <div class="card-header">
                        <h3 style="display: flex; align-items: center; justify-content: center" class="center">{{$t('close_box')}}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row mb-4">

                                <div class="col-md-3"><blockquote><footer>Ouvert par:</footer><p>Tchiks Jules</p></blockquote></div>
                                <div class="col-md-3"><blockquote><footer>
                                    Encaisse</footer><p>0</p>
                                </blockquote></div>
                                <div class="col-md-4"><blockquote><footer>Temps ouverture</footer>
                                <p>2020-11-02 02:03:20</p></blockquote></div>
                            <div class="col-md-2">
                                <img src="../../../assets/images/caisses.svg" alt="" />
                            </div>
                            <blockquote><h3>Resume Paiements</h3></blockquote>

                                <h6 class="mb-3"></h6>

                            </div>
                        <div class="table-responsive-sm">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th class="center">Type de Paiement</th>
                                    <th>Montant Net</th>
                                    <th>Montant Encaisse</th>
                                    <th>Notes</th>
                                </tr>
                                </thead>
                                <tbody>
                                <!--<tr class="item" v-if="!encaissements==null">
                                    <td>{{$t('no_data')}}</td>
                                </tr>-->

                                <tr v-for="item in data.data" :key="item.operationDeCaisseId" class="item" >
                                    <td class="center">{{item.libelle}}</td>
                                    <td class="left">{{item.montant}}</td>
                                    <td class="left">*</td>
                                    <td class="left">Commanditaire: <b>Maxime Dyna</b></td>

                                </tr>

                                </tbody>
                            </table>
                        </div>

                            <p></p>
                        <span style="display: flex; align-items: center; justify-content: center">SATELLITE NGONO, agreement No 0111/MINT Sis Zone portuaire BP 14000 Douala. </span><br>
                    </div>
                </div>
            </div>
                <p></p>
                <div style="text-align: right">
                    <b-button  variant="outline-success" @click="prints('pdf')" style="margin-right: 15px">Pdf</b-button>

                    <b-button  variant="outline-success" @click="prints('print')" style="margin-right: 15px">{{$t('print')}}</b-button>

                </div>
            </div>

        </template>

    </b-modal>

</template>

<script>
    /*import html2pdf from 'html2pdf.js'*/

    export default {
        name: "bilan",
        props: {
            data:Object
        },
        data(){
            return {

            }
        },
        methods:{
            prints(){
                this.$emit('print');
            }
        },
        mounted(){
            //console.log('listproductys',this.listproducts)
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