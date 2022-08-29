import Vue from 'vue'
import VueRouter from 'vue-router'
//import authenticate from "../auth/authenticate";
//import store from 'plugin-vuejs-keycloak'
//import security from 'plugin-vuejs-keycloak/security'
Vue.use(VueRouter)


const routes = [
    {
        path: "/",
        component: () => import("../views/app"), //webpackChunkName app  redirect: "/app/box",

        children: [
            {


                path: "/app",
                component: () => import("../views/app/caisses"),
                children: [
                    {
                        name:"box",
                        path: "box",
                        component: () => import("../views/app/caisses/box")
                    },

                    {
                        path: "visit/start",
                        name:"visit_start",
                        component: () => import("../views/app/visit/form_start_inspection"),
                        props: true
                    },
                    {
                        path: "signin",
                        name:"st_signin",
                        component: () => import("../views/app/visit/signin"),
                        props: true
                    },

                    {
                        path: "cg",
                        name:"cg",
                        component: () => import("../views/app/cg/list"),
                        props:true
                    },
                    {
                        path: "ticket/list",
                        name:"ticket_list",
                        component: () => import("../views/app/caisses/ticket_list"),
                        props:true
                    },
                    {
                        name:"hospital",
                        path: "hospital",
                        component: () => import("../views/app/hopital/list")
                    },
                    {
                        name:"soins",
                        path: "soins",
                        component: () => import("../views/app/hopital/soins")
                    },
                    {
                        name:"exams",
                        path: "exams",
                        component: () => import("../views/app/hopital/examens")
                    },
                    {
                        name:"detailsaccident",
                        path: "detailsaccident",
                        component: () => import("../views/app/accident/detailsaccident"),
                        props: true
                    },
                    {
                        name:"croquis",
                        path: "croquis",
                        component: () => import("../views/app/accident/croquis2"),
                        props: true
                    },
                    {
                        name:"genererpv",
                        path: "genererpv",
                        component: () => import("../views/app/accident/genererpv"),
                        props: true
                    },
                    {
                        name:"traumatisme",
                        path: "traumatisme",
                        component: () => import("../views/app/hopital/traumatisme")
                    },
                    {
                        name:"addpatient",
                        path: "addpatient",
                        component: () => import("../views/app/hopital/add_patients")
                    },
                    {
                        name:"addaccident",
                        path: "addaccident",
                        component: () => import("../views/app/accident/addaccident")
                    },
                    {
                        name:"editaccident",
                        path: "editaccident",
                        component: () => import("../views/app/accident/edit_accident"),
                        props: true
                    },
                    {
                        name:"billing",
                        path: "billing",
                        component: () => import("../views/app/hopital/billing"),
                        props: true
                    },
                    {
                        name:"pv",
                        path: "pv",
                        component: () => import("../views/app/accident/pv"),
                        props: true
                    },
                    {
                        name:"accidents",
                        path: "accidents",
                        component: () => import("../views/app/accident/accidents")
                    },
                    {
                        name:"dossier",
                        path: "dossier",
                        component: () => import("../views/app/hopital/dossierpatient"),
                        props:true
                    },
                    {
                        name:"editdossier",
                        path: "editdossier",
                        component: () => import("../views/app/hopital/edit_dossierpatient"),
                        props:true
                    },

                    {
                        path: "list",
                        redirect: "/app/list/visit",
                        component: () => import("../views/app/products/index"),
                        children: [
                            {
                                path: "visit",
                                name:"visit_list",
                                component: () => import("../views/app/visit/list"),
                                props: true
                            },
                            {
                                path: "visit",
                                name:"visit_inspect",
                                component: () => import("../views/app/visit/list"),
                                props: true
                            },
                            {
                                path: "approbation",
                                name:"approbation_list",
                                component: () => import("../views/app/visit/list"),
                                props: true
                            },
                            {
                                path: "allvisit",
                                name:"allvisit_list",
                                component: () => import("../views/app/visit/all_list"),
                                props: true
                            },
                            {
                                path: "allvisitend",
                                name:"allvisit_list_end",
                                component: () => import("../views/app/visit/visit_finish"),
                                props: true
                            },
                            {
                                path: "catproducts",
                                name:"catproducts_list",
                                component: () => import("../views/app/catproducts/list"),
                                props: true
                            },
                            {
                                path: "products",
                                name:"products_list",
                                component: () => import("../views/app/products/list"),
                                props: true
                            },
                            {
                                path: "customer",
                                name:"customer_list",
                                component: () => import("../views/app/partners/list"),
                                props: true
                            },
                            {
                                path: "contact",
                                name:"contact_list",
                                component: () => import("../views/app/partners/list"),
                                props: true
                            },
                            {
                                path: "partners",
                                name:"partners_list",
                                component: () => import("../views/app/partners/list"),
                                props:true

                            },
                            {
                                path: "sales",
                                name:"sales_list",
                                component: () => import("../views/app/partners/list"),
                                props:true

                            },
                            {
                                path: "reglement",
                                name:"reglement_list",
                                component: () => import("../views/app/partners/list"),
                                props:true

                            },
                            {
                                path: "adress",
                                name:"adress_list",
                                component: () => import("../views/app/partners/list"),
                                props:true

                            },
                            {
                                path: "cg",
                                name:"cg_list",
                                component: () => import("../views/app/partners/list"),
                                props:true

                            },
                            {
                                path: "vehicules",
                                name:"vehicule_list",
                                component: () => import("../views/app/partners/list"),
                                props:true

                            }
                        ]
                    }
                    ]
            }
            ]

    },
]


const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresRoute)) {

    if(Vue.prototype.$keycloak.authenticated){
        if(Vue.prototype.$keycloak.tokenParsed.realm_access.roles[0] === 'caissier'){
            next();
        }else{
            alert('You are not allowed to go Admin section')
        }
    }
    else {
        alert('You are not authenticated')
    }
    }else{
        next()

    }
})

export default router
