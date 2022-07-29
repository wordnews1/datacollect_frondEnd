<template>
    <div class="main-content">
        <breadcumb :page="'Partners'" :folder="'Lists'" />

        <b-row>
            <b-col md="12 mb-30">
                <b-card title="Partners">

                    <registerPartnersFull></registerPartnersFull>

                </b-card>
            </b-col>

        </b-row>
    </div>
</template>
<script>
    import registerPartnersFull from "../components/registerpartnersfull"
    export default {
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: "Basic Forms"
        },
        components:{registerPartnersFull},
        data() {
            return {
                date:new Date(),
                submitStatus: null,
                cni:'',
                nom: '',
                prenom: '',
                phone: '',
                status: false,
                birthday:null,
                passport:'',
                permi_de_conduire:'',
                show: false
            };
        }
    };
</script>
