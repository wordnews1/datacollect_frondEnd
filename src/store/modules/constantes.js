

const state = {

    sales_model:[
        {
            label: "numerovente",
            field: "facture",
        },
        {
            label: "client",
            field: "client",
        },
        {
            label: "Contact",
            field: "contact",
        },
        {
            label: "Vendeur",
            field: "vendeur",
        },
        {
            label: "Montant Encaisse",
            field: "montantEncaisse",
        },
        {
            label: "Montant Total",
            field: "montantTotal"
        },
        {
            label: "Date",
            field: "date",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "MMM Do yy"
        },
        {
            label: "Statut",
            field: "statut",
            html: true
        },

    ],
    customer_model:[
        {
            label: "Numero Id",
            field: "cni",
        },
        {
            label: "Nom",
            field: "nom",
        },
        {
            label: "Prenom",
            field: "prenom",
        },
        {
            label: "Email",
            field: "email",
        },
        {
            label: "Telephone",
            field: "tel",
        },
        {
            label: "Description",
            field: "description",
        },
        {
            label: "createdDate",
            field: "date",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "yyyy-mm-dd"
        }
    ],
    adresses_model:[

        {
            label: "Nom",
            field: "nom",
        },
        {
            label: "Pays",
            field: "pays",
        },
        {
            label: "Ville",
            field: "ville",
        },
        {
            label: "createdDate",
            field: "date",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "yyyy-mm-dd"
        }
    ],
    cg_model:[

        {
            label: "Immatriculation",
            field: "numImmatriculation",
        },
        {
            label: "Date debut Validite",
            field: "dateDebutValid",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "yyyy-mm-dd"
        },
        {
            label: "Date Fin Validite",
            field: "dateFinValid",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "yyyy-mm-dd"
        },
        {
            label: "Montant Paye",
            field: "montantPaye"
        },
        {
            label: "Proprietaire Vehicule",
            field: "proprietaireVehicule.partenaire.nom"
        },
        {
            label: "Numero Id Proprietaire",
            field: "proprietaireVehicule.partenaire.cni"
        },
        {
            label: "createdDate",
            field: "date",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "yyyy-mm-dd"
        }
    ],
    vehicules_model:[

        {
            label: "marque Vehicule",
            field: "marqueVehicule.libelle",
        },
        {
            label: "type Vehicule",
            field: "typeVehicule",
        },
        {
            label: "carrosserie",
            field: "carrosserie",
        },
        {
            label: "place Assise",
            field: "placeAssise",
        },
        {
            label: "Poids total a vide",
            field: "poidsVide",
        },
        {
            label: "charge Utile",
            field: "chargeUtile",
        },
        {
            label: "poids Total Plein",
            field: "poidsTotalCha",
        },
        {
            label: "Date Premiere circulation",
            field: "premiereMiseEnCirculation",
            type: "date",
            dateInputFormat: "yyyy-mm-dd",
            dateOutputFormat: "yyyy-mm-dd"
        }
    ],

};

const actions = {

};

const getters = {



}

const mutations = {

};


export default {
    state,getters,actions,mutations
}