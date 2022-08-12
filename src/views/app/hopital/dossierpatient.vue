
<template>

    <b-overlay :show="show" rounded="sm">

      <b-modal id="opencontacts" :title="$t('add_contact')" hide-footer>

        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t("add_contact")}} </h5>
        </template>

        <template #default="{  }">
          <b-row>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('CNI')"
                label-for="input-1"
            >

              <b-form-input
                  v-uppercase

                  v-model="contact.cni"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('nom')"
                label-for="input-1"
            >

              <b-form-input
                  v-uppercase
                  v-model="contact.firstName"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('prenom')"
                label-for="input-1"
            >

              <b-form-input
                  v-model="contact.lastName"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('phone')"
                label-for="input-1"
            >

              <b-form-input

                  v-model="contact.phone"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group  style="margin-bottom: 10px"
                           class="col-md-6 mb-30"
                           :label="$t('Genre')"
                           label-for="input-1"
            >

              <b-form-select v-model="contact.gender">
                <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
                <option v-for="option in sexes" :value="option.id" :key="option.id">
                  {{ option.value }}
                </option>
              </b-form-select>


            </b-form-group>


          </b-row>


          <p></p>
          <div style="text-align: right">
            <b-button @click="submitcontact()" variant="outline-success" style="margin-right: 15px">
              {{$t('ajouter')}}</b-button>
          </div>

        </template>

      </b-modal>

      <b-modal id="opencontacts1" :title="$t('add_contact')" hide-footer>

        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t("add_contact")}} </h5>
        </template>

        <template #default="{  }">
          <b-row>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('CNI')"
                label-for="input-1"
            >

              <b-form-input
                  v-uppercase

                  v-model="contact.cni"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('nom')"
                label-for="input-1"
            >

              <b-form-input
                  v-uppercase
                  v-model="contact.firstName"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('prenom')"
                label-for="input-1"
            >

              <b-form-input
                  v-model="contact.lastName"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group
                class="col-md-6 mb-30"
                :label="$t('phone')"
                label-for="input-1"
            >

              <b-form-input

                  v-model="contact.phone"
                  type="text"
              ></b-form-input>


            </b-form-group>
            <b-form-group  style="margin-bottom: 10px"
                           class="col-md-6 mb-30"
                           :label="$t('Genre')"
                           label-for="input-1"
            >

              <b-form-select v-model="contact.gender">
                <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
                <option v-for="option in sexes" :value="option.id" :key="option.id">
                  {{ option.value }}
                </option>
              </b-form-select>


            </b-form-group>


          </b-row>


          <p></p>
          <div style="text-align: right">
            <b-button @click="submiteditcontact()" variant="outline-success" style="margin-right: 15px">
              {{$t('modifier')}}</b-button>
          </div>

        </template>

      </b-modal>

        <b-overlay :show="openb" rounded="sm" >

            <b-modal id="confirmopenAccount" :title="$t('open_box')" hide-footer>

                <template #modal-header="{}">
                    <!-- Emulate built in modal header close button action -->
                    <h5>{{$t('Ajouter')}} </h5>
                </template>

                <template #default="{  }">

                    <b-form-input

                            v-model="valeur"
                            @input="suggestionon(valeur)"
                            type="text"
                            :placeholder="$t('valeur')"
                    ></b-form-input>

                  <b-list-group v-if="filteredSuggestions.length" style="float:inherit;position:absolute;z-index:1">

                    <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                                       @click="selected({item:s})">
                      {{s[optionsKey]}}

                    </b-list-group-item>

                  </b-list-group>

                    <p></p>
                    <div style="text-align: right">
                        <b-button @click="addelement()" variant="outline-success" style="margin-right: 15px">
                          {{$t('ajouter')}}</b-button>
                    </div>

                </template>

            </b-modal>

        </b-overlay>

        <b-form :aria-hidden="show ? 'true' : null" >

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
                            {{$t('basic_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('cnis')"
                                            label-for="input-1"
                                    >

                                        <b-form-input disabled

                                                v-model.trim="$v.cni.$model"
                                                type="number"
                                                :placeholder="$t('cni')"
                                        ></b-form-input>

                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.cni.minLength"
                                        >{{$t('validator_cni')}}
                                            {{ $v.cni.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('prenom_label')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="prenom"
                                                type="text"
                                                :placeholder="$t('prenom')"
                                        ></b-form-input>

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('birthday')"
                                            label-for="input-1"
                                    >
                                      <date-picker v-model="birthday" format="YYYY-MM-DD"  valueType="YYYY-MM-DD" ></date-picker>
<!--                                        <b-form-datepicker id="example-datepicker"  v-model="birthday" class="mb-2"></b-form-datepicker>-->

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('permi')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="permi_de_conduire"
                                                type="number"
                                                :placeholder="$t('permis')"
                                        ></b-form-input>

                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('nom_label')"
                                            label-for="input-1"
                                    >

                                        <b-form-input
                                                disabled

                                                v-model.trim="$v.nom.$model"
                                                type="text"
                                                :placeholder="$t('prooftag')"
                                        ></b-form-input>
                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.nom.minLength"
                                        >{{$t('validator_nom')}}
                                            {{ $v.nom.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >


                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('tel')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="phone"
                                                disabled
                                                type="number"
                                                :placeholder="$t('tels')"
                                        ></b-form-input>

                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.phone.minLength"
                                        >{{$t('validator_phone')}}
                                            {{ $v.phone.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >
                                        <b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.phone.maxLength"
                                        >{{$t('validator_phone_max')}}
                                            {{ $v.phone.$params.maxLength.max }} {{$t('letters')}}  .</b-alert
                                        >

                                    </b-form-group>





                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('passports')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="passport"
                                                type="number"
                                                :placeholder="$t('passport')"
                                        ></b-form-input>

                                    </b-form-group>
                                    <label>Sexe: </label>
                                    <b-form-select
                                            :label="$t('Genre')"
                                            id="sexe"
                                            name="personGender"
                                            v-model="personGender"
                                    >

                                        <option value="0">
                                            Homme
                                        </option>

                                        <option value="1">
                                            Femme
                                        </option>

                                    </b-form-select>
                                </b-col>
                            </b-row>



                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>
            <p></p>
            <div role="tablist">

                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-5 variant="transparent">
                            {{$t('acc_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-5" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>

                                <b-col md="6">

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('crashacc')"
                                            label-for="input-1"
                                    >
                                        <b-form-datepicker id="example-datepicker"  v-model="crashacc" class="mb-2"></b-form-datepicker>

                                    </b-form-group>
                                    <b-form-group :label="$t('consumalcohol')">


                                        <b-checkbox
                                            disabled
                                            v-model="consumalcohol"
                                            class="mb-5 right_header"
                                        >
                                            Oui
                                        </b-checkbox>

                                        <b-checkbox
                                                disabled
                                                v-model="consumalcohols"
                                                class="mb-5 right_header"
                                        >
                                            Non
                                        </b-checkbox>


                                    </b-form-group>




                                </b-col>
                                <b-col md="6">

                                    <b-form-group :label="$t('persontrauma')">
                                        <select
                                                class="form-control"
                                                name="persontrauma"
                                                v-model="persontrauma"
                                        >

                                          <option value="1">
                                            Traumatisme Mortel
                                          </option>

                                          <option value="2">
                                            Traumatisme Grave/sérieux
                                          </option>
                                          <option value="3">
                                            Traumatisme Léger/Mineur
                                          </option>
                                          <option value="4">
                                            pas de Traumatisme
                                          </option>
                                          <option value="5">
                                            Inconnu
                                          </option>


                                        </select>
                                    </b-form-group>


                                    <b-form-group :label="$t('consumdrugs')">

                                        <b-checkbox
                                                disabled
                                                v-model="consumdrugs"
                                                class="mb-5"
                                        >
                                            Oui
                                        </b-checkbox>

                                        <b-checkbox
                                                disabled
                                                v-model="consumdrugse"
                                                class="mb-5 right_header"
                                        >
                                            Non
                                        </b-checkbox>



                                    </b-form-group>


                                </b-col>
                            </b-row>



                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>
            <p></p>

            <!--<div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-2 variant="transparent">
                            {{$t('adress_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-2" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('pays')"
                                            label-for="input-1"
                                    >

                                        <b-form-select
                                                id="input-3"
                                                v-model="pays"
                                                :options="countrys"
                                                required
                                        ></b-form-select>

                                        &lt;!&ndash;<b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.cni.minLength"
                                        >{{$t('validator_cni')}}
                                            {{ $v.cni.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >&ndash;&gt;

                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('rue')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="rue"
                                                type="text"
                                                :placeholder="$t('rue')"
                                        ></b-form-input>

                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('zip_other')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="zip_other"
                                                type="number"
                                                :placeholder="$t('zip_other')"
                                        ></b-form-input>

                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('towns')"
                                            label-for="input-1"
                                    >

                                        <b-form-select
                                                id="input-3"
                                                v-model="town"
                                                :options="towns"
                                                required
                                        ></b-form-select>
                                        &lt;!&ndash;<b-alert
                                                show
                                                variant="danger"
                                                class="error col-md-12 mt-1"
                                                v-if="!$v.nom.minLength"
                                        >{{$t('validator_nom')}}
                                            {{ $v.nom.$params.minLength.min }} {{$t('letters')}}  .</b-alert
                                        >&ndash;&gt;


                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('zip')"
                                            label-for="input-1"
                                    >
                                        <b-form-input

                                                v-model="zip"
                                                type="number"
                                                :placeholder="$t('zip')"
                                        ></b-form-input>


                                    </b-form-group>


                                </b-col>
                            </b-row>

                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>
            <p></p>-->
            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-3 variant="transparent">
                            {{$t('desc_inf')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-3" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>

                            <wysiwyg v-model="content" />

                        </b-card-body>
                    </b-collapse>

                </b-card>
            </div>

            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-4 variant="transparent">
                            {{$t('param_med')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-4" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>

                                <b-col md="6">

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('poids')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="poids"
                                                type="text"
                                                :placeholder="$t('poids')"
                                        ></b-form-input>

                                    </b-form-group>
                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('temperature')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="temperature"
                                                type="text"
                                                :placeholder="$t('temperature')"
                                        ></b-form-input>

                                    </b-form-group>


                                </b-col>
                                <b-col md="6">


                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('tension')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="tension"
                                                type="text"
                                                :placeholder="$t('tension')"
                                        ></b-form-input>


                                    </b-form-group>

                                    <b-form-group
                                            class="col-md-12 mb-30"
                                            :label="$t('pouls')"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                disabled

                                                v-model="pouls"
                                                type="text"
                                                :placeholder="$t('pouls')"
                                        ></b-form-input>

                                    </b-form-group>


                                </b-col>
                            </b-row>
                            <b-row>
                                <br/>

                                <b-col md="12">
                                    <b-form-group :label="$t('param_med_label')">

                                            <br/>
                                            <b-checkbox
                                                md="3"
                                                disabled
                                                    v-model="ashtme"
                                                    class="mb-5"
                                            >
                                                Asthme
                                            </b-checkbox>

                                            <b-checkbox
                                                disabled
                                                    v-model="cardiaque"
                                                    class="mb-5 right_header"
                                            >
                                                Maladie Cardiaque
                                            </b-checkbox>
                                            <br/>
                                            <b-checkbox
                                                disabled
                                                    v-model="epilepsie"
                                                    class="mb-5"
                                            >
                                                epilepsie
                                            </b-checkbox>


                                            <b-checkbox
                                                disabled
                                                    v-model="hypertension"
                                                    class="mb-5 right_header"
                                            >
                                              hypertension

                                            </b-checkbox>
                                            <br/>

                                            <b-checkbox
                                                disabled
                                                    v-model="diabete"
                                                    class="mb-5 "
                                            >
                                                Diabete
                                            </b-checkbox>

                                            <b-checkbox
                                                disabled
                                                    v-model="cancer"
                                                    class="mb-5 right_header"
                                            >
                                                Cancer
                                            </b-checkbox>



                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>

            <p></p>

          <div role="tablist">
            <b-card no-body class="ul-card__border-radius">

              <b-card-header header-tag="header" class="p-1"  role="tab">
                <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-10 variant="transparent">
                  {{$t('contact_patient')}}</b-button>
              </b-card-header>

              <b-collapse id="accordion-10" invisible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-row>
                    <b-button  @click ="addcontact()"  variant="success"
                               style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                    <b-col md="12">
                      <b-overlay :show="loadanotherpage" rounded="sm" >

                        <ListTable :type="'contact'" @onRowclick="onRowclick" @onEditClick="onEditClick" :rows="contacts" :columns="columns" :isCLoseMenu="true"
                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin"
                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                      </b-overlay>
                    </b-col>
                  </b-row>
                  <br/>

                </b-card-body>
              </b-collapse>

            </b-card>
          </div>
          <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
                            {{$t('soins')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-button   @click ="openmodalbox('soins')"  variant="success"
                                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                                <b-col md="12">
                                    <b-overlay :show="loadanotherpage" rounded="sm" >

                                        <ListTable :type="'soins'" :rows="listsoin" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
                                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                                    </b-overlay>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>

            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-7 variant="transparent">
                            {{$t('Examens')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-7" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-button   @click ="openmodalbox('examen')"  variant="success"
                                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                                <b-col md="12">
                                    <b-overlay :show="loadanotherpage" rounded="sm" >

                                        <ListTable :type="'examen'" @onRowclick="onRowclick" :rows="listexamen" :columns="columnexamen" :isCLoseMenu="true"
                                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                                    </b-overlay>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>
            <p></p>

            <div role="tablist">
                <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1"  role="tab">
                        <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-8 variant="transparent">
                            {{$t('traumatisme')}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-8" invisible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-row>
                                <b-button  @click ="openmodalbox('traumatisme')"  variant="success"
                                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                                <b-col md="12">
                                    <b-overlay :show="loadanotherpage" rounded="sm" >

                                        <ListTable :type="'trauma'" @onRowclick="onRowclick" :rows="listrauma" :columns="columntrauma" :isCLoseMenu="true"
                                                   :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                                   @deleteProps="deleteProps" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>


                                    </b-overlay>
                                </b-col>
                            </b-row>
                            <br/>

                        </b-card-body>
                    </b-collapse>


                </b-card>
                <p></p>

            </div>


        </b-form>
    </b-overlay>

</template>

<script>

    import constants from '../../../plugins/constants'
    import ListTable from '../components/List-table2'
    import { required, minLength, maxLength } from "vuelidate/lib/validators";
    // import partnersVue from "../partners/list"
    import axios from 'axios'
    import { mapGetters,mapActions } from "vuex";
    export default {

        name:"dossierpatient",
        props:{
           rowes:Array
        },

        components: {
            ListTable
        },
        mounted(){
            console.log('rowe',this.rowes)
            this.ListDossierPatient(this.rowes[0].id)
            //this.ListDossierPatient(9)
            this.folder_id = this.rowes[0].id

        },
        data() {
            return {
              contacts:[],
              contact:{},
              columns:[

                {
                  label: "CNI",
                  field: "cni",
                  hidden: false,
                },
                {
                  label: "Prenom",
                  field: "firstName",
                  hidden: false,
                },
                {
                  label: "Nom",
                  field: "lastName",
                  hidden: false,
                },
                {
                  label: "Numero de Telephone",
                  field: "phone",
                  hidden: false,
                },
                {
                  label: "actions",
                  field: "actions",
                  html: true
                }
              ],
              valeur:'',
              valeur1:{},
              filteredSuggestions:[],
              type:"",
                optionsKey:"name",
                optionsKey1:"prenom",
                folder_id:0,
                checkEx2Options : [
                    {item: 'oui', name: 'Oui'},
                    {item: 'non', name: 'Non'}
                ],
                crashacc:'',
                listsoin:[],
                listexamen:[],
                listrauma:[],
                totalPagesoin_:0,
                loadanotherpage:false,
                totalElementsoin:0,
                linksoin:[],
              columntrauma:[
                {
                  label: "Id",
                  field: "id",
                  hidden: false,
                },
                {
                  label: "Name",
                  field: "name",
                  hidden: false,
                },

                {
                  label: "actions",
                  field: "actions",
                  hidden: false,
                  html: true,
                }

              ],
                columnexamen:[
                    {
                        label: "Id",
                        field: "id",
                        hidden: false,
                    },
                    {
                        label: "Name",
                        field: "name",
                        hidden: false,
                    },
                  {

                    label: "Status",
                    field: "insuranceVisa",
                    hidden: false,
                  },

                  {
                        label: "actions",
                        field: "actions",
                        hidden: false,
                        html: true,
                    }

                ],
                columnoins:[

                    {
                        label: "Id",
                        field: "id",
                        hidden: false,
                    },
                    {
                        label: "Name",
                        field: "name",
                        hidden: false,
                    },
                    {
                        label: "Price",
                        field: "price",
                        hidden: false,
                    },
                  {

                        label: "Status",
                        field: "insuranceVisa",
                        hidden: false,
                    },
                    {
                        label: "actions",
                        field: "actions",
                        hidden: false,
                        html: true,
                    }
                ],
              tst:true,
                consumalcohol:'',
                consumalcohols:'',
               persontrauma:'',
                consumdrugs:'',
                consumdrugse:'',
                personGender:'',
                checkedNames:[],
                poids:'',
                temperature:'',
                tension:'',
                pouls:'',
                ashtme:'',
                cardiaque:'',
                hypertension:'',
                diabete:'',
                cancer:'',
                epilepsie:'',

                rout:false,
                content:"",
                submitStatus: null,
                cni:'',
                nom: '',
                prenom: '',
                phone: '',
                status: false,
                birthday:null,
                passport:'',
                permi_de_conduire:'',
                show: false,
                countrys:["Afghanistan","Cameroun"],
                towns:["Douala","Yaounde"]
            }
        },
        openb:false,
        validations: {
            cni: {
                required,
                minLength: minLength(9)
            },
            nom: {
                required,
                minLength: minLength(4)
            },
            phone: {
                required,
                minLength: minLength(9),
                maxLength: maxLength(9)
            },
        },
        computed: {
            ...mapGetters(["GetListDossier"]),
        },
        methods:{

            ...mapActions(["ListDossierPatient"]),
          onEditClick(params){

            switch(params.types) {
              case 'contact':
                this.contact = params
                this.$bvModal.show('opencontacts1')

                break;

            }
          },
          checkId(obj, id) {

            return obj.map(function(item) { return item.id; }).indexOf(id);

          },
          removelist(contact,indexIds){
            contact.splice(indexIds, 1);
            contact.sort();
          },
          submitcontact(){

            this.$bvModal.hide('opencontacts')
            this.contacts.push(this.contact)
            this.contact={}
            this.makeToast(this.$t('added'),1)
          },
          submiteditcontact(){

            this.$bvModal.hide('opencontacts1')
            // this.checkId()
            //this.contacts.$set( this.checkId(this.contacts,this.contact.id), this.contact)
            this.contacts.splice(this.checkId(this.contacts,this.contact.id), 1,  this.contact)
            //this.$set(this.data, 'id', this.rowes.id);

            //this.contacts.push(this.contact)
            this.contact={}
            this.makeToast(this.$t('added'),1)
          },
          addcontact(){
            this.$bvModal.show('opencontacts')
          },
          selected(value){
              this.filteredSuggestions = []
              this.valeur = value.item.name
              this.valeur1 = value

              console.log('selected',value)
          },
          makeToast(variant = null,type) {

            switch (type) {
              case 0: type="error"; break;
              case 1: type="success" ; break;
              case 2: type="info"; break;
              case 3: type="warning"; break;

            }

            this.$toasted.show((variant),{type:type})

          },
          addelement(value){

            console.log('selected2',value)
            console.log('selected2',this.valeur)
            this.openb=true
            let soin = {
              care: this.folder_id,
              item: this.valeur1.item.id
            };
            switch(this.type){

              case 'examen':

                axios.post(constants.resource_url+'cares/add-exam', soin)
                    .then(response =>{

                      if(response.data.success){
                        this.openb = false
                        this.valeur=''
                        this.makeToast(this.$t('added'),1)
                        console.log('products_error',response);
                        //this.listexamen.push(response.data.data.exams[response.data.data.exams.length-1])
                        //this.listexamen=response.data.data.exams
                        this.listexamen.push(this.valeur1.item)
                        this.$bvModal.hide('confirmopenAccount')
                      }else{
                        this.makeToast(this.$t('error'),0)
                      }

                      //this.listexamen.push(response.data.data.exams)
                      //this.containerClass = 'container';
                      //this.trauma={}
                    }).catch(function(error) {
                  console.log('products_error',error);
                  // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // console.log(error);

                  //commit("setError", error);

                }); break;
              case 'soins':

                axios.post(constants.resource_url+'cares/add-treatment', soin)
                    .then(response =>{
                      if(response.data.success){
                        this.valeur=''
                        this.makeToast(this.$t('added'),1)
                        // console.log('products_error1',response.data.data.treatments[response.data.data.treatments.length-1]);

                        //this.listsoin.push(response.data.data.treatments[response.data.data.treatments.length-1])
                        //this.listsoin=response.data.data.treatments
                        console.log('products_error1',this.valeur1.item);
                        this.listsoin.push(this.valeur1.item)


                        this.$bvModal.hide('confirmopenAccount')
                        this.openb = false
                      }else{
                        this.makeToast(this.$t('error'),0)
                      }

                    }).catch(function(error) {
                  console.log('products_error',error);
                  // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // console.log(error);

                  //commit("setError", error);

                });break;
              case 'traumatisme':
                axios.post(constants.resource_url+'cares/add-injury', soin)
                    .then(response =>{
                      if(response.data.success){

                        this.makeToast(this.$t('added'),1)
                        console.log('products_error',response);
                        this.openb = false
                        this.valeur=''

                        //this.listrauma.push(response.data.data.injuries[response.data.data.injuries.length-1])
                        //this.listrauma=response.data.data.injuries
                        this.listrauma.push(this.valeur1.item)
                        this.$bvModal.hide('confirmopenAccount')

                      }else{
                        this.makeToast(this.$t('error'),0)
                      }



                    }).catch(function(error) {
                  console.log('products_error',error);
                  // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // console.log(error);

                  //commit("setError", error);

                });break;
            }
          },
            suggestionon(value){
              console.log('suggestionon',value)
              //this.openb = true
              let params = {};
              params["name"] = value
              switch(this.type){

                case 'examen':

                  axios.get(constants.resource_url+'examinations/search', {params})
                      .then(response =>{

                        this.loadanotherpage = false
                        this.filteredSuggestions = response.data.data
                        //this.containerClass = 'container';
                        //this.trauma={}
                      }).catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);

                  }); break;
                case 'soins':

                  axios.get(constants.resource_url+'treatments/search', {params})
                      .then(response =>{
                        this.filteredSuggestions = response.data.data
                        //this.containerClass = 'container';
                        //this.trauma={}
                        this.openb = false
                      }).catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);

                  });break;
                case 'traumatisme':
                  axios.get(constants.resource_url+'injuries/search', {params})
                      .then(response =>{
                        this.filteredSuggestions = response.data.data
                        this.openb = false

                      }).catch(function(error) {
                    console.log('products_error',error);
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(error);

                    //commit("setError", error);

                  });break;
              }

            },
            savechange(data) {

                console.log('savechange', data);
            },
            openmodalbox(value){

              this.type=value
              console.log('savechange', value);
              this.$bvModal.show('confirmopenAccount')
            },
          onRowclick(params){
            this.loadanotherpage = true
            let soin = {
              care: this.folder_id,
              item: params.id
            };
            switch(params.types){
              case 'contact':
                console.log('checkid',this.checkId(this.contacts,params.id))

                this.removelist(this.contacts,this.checkId(this.contacts,params.id))
                this.loadanotherpage = false
                break;
              case 'examen':

                axios.post(constants.resource_url+'cares/remove-exam', soin)
                    .then(response =>{
                      console.log('products_error',response);
                      // this.listexamen = response.data.data.exams;
                      this.removelist(this.listexamen,this.checkId(this.listexamen,soin.item))
                      this.loadanotherpage = false

                    }).catch(function(error) {
                  console.log('products_error',error);
                  // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // console.log(error);

                  //commit("setError", error);

                }); break;
              case 'soins':

                axios.post(constants.resource_url+'cares/remove-treatment', soin)
                    .then(response =>{
                      console.log('checkid',response+ ' '+this.checkId(this.listsoin,params.id))
                      this.removelist(this.listsoin,this.checkId(this.listsoin,soin.item))
                      //this.listsoin = response.data.data.treatments;
                      //this.containerClass = 'container';
                      //this.trauma={}
                      this.loadanotherpage = false
                    }).catch(function(error) {
                  console.log('products_error',error);
                  // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // console.log(error);

                  //commit("setError", error);

                });break;
              case 'trauma':
                axios.post(constants.resource_url+'cares/remove-injury', soin)
                    .then(response =>{

                      console.log('products_error',response);
                      this.removelist(this.listrauma,this.checkId(this.listrauma,soin.item))

                      //this.listrauma = response.data.data.injuries;
                      this.containerClass = 'container';
                      this.trauma={}
                      this.loadanotherpage = false

                    }).catch(function(error) {
                  console.log('products_error',error);
                  // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // console.log(error);

                  //commit("setError", error);

                });break;

            }
            console.log('paramis',params)

          },
            editProps(params){

                console.log('params',params)
            },
            deleteProps(params){

                /* this.$bvModal.show('confirmdelete')
                 this.idd = params.formattedRow.id*/

                console.log('params', params+'params.formattedRow.id');
            },
            deleteprop(){

                //   this.$bvModal.hide('confirmdelete')
                console.log('params','this.idd')

            },

            loadpage(params){

                console.log('loadpage',params)


            },
            clickRow(){
                console.log('loadpage','')
            },
            selectionChanged(){
                console.log('loadpage','')
            },



            makeToastTwo(variant = null) {
                console.log('Successfully Submitted')

                this.$bvToast.toast("Successfully Submitted", {
                    title: `Variant ${variant || "default"}`,
                    variant: variant,
                    solid: true
                });
            },
        },
        watch:{
            GetListDossier(data){
                console.log('data',data)
                this.cni = data.cni!=null?data.cni:'pas renseigne'
                this.nom = data.nom!=null?data.nom:'pas renseigne'
                this.prenom = data.prenom!=null?data.prenom:'pas renseigne'
                this.phone = data.telephone!=null?data.telephone:'pas renseigne'
                this.birthday = data.dateNaiss!=null?data.dateNaiss:'pas renseigne'
                this.passport = data.passport!=null?data.passport:'pas renseigne'
                this.permi_de_conduire = data.permis!=null?data.permis:'pas renseigne'
                this.personGender = data.gender!=null?data.gender:'pas renseigne'

                this.poids = data.parametre.poids!=null?data.parametre.poids:'pas renseigne'
                this.tension = data.parametre.tension!=null?data.parametre.tension:'pas renseigne'
                this.pouls = data.parametre.pouls!=null?data.parametre.pouls:'pas renseigne'
                this.temperature = data.parametre.temperature!=null?data.parametre.temperature:'pas renseigne'
                this.crashacc = data.crashDate!=null?data.crashDate:'pas renseigne'
                this.listsoin = data.treatments
                this.listexamen = data.exams
                this.listrauma = data.injuries
                this.checkedNames = data.parametre.params

              this.ashtme = this.checkedNames.some(data => data === 'ashtme')
              this.cardiaque = this.checkedNames.some(data => data === 'cardiaque')
              this.hypertension = this.checkedNames.some(data => data === 'hypertension')
              this.epilepsie = this.checkedNames.some(data => data === 'epilepsie')
              this.diabete = this.checkedNames.some(data => data === 'diabete')
              this.cancer = this.checkedNames.some(data => data === 'cancer')

              console.log('cardiaque',data.parametre.pouls)
              console.log('cardiaque',data.parametre.pouls)


               this.consumalcohol  = data.accparams.consumalcohol=='oui'?true:false;
               this.consumalcohols  = data.accparams.consumalcohol=='non'?true:false;

               this.consumdrugs  = data.accparams.consumdrugs=='oui'?true:false;

               this.persontrauma  = data.accparams.persontraum;

               this.consumdrugse  = data.accparams.consumdrugs=='non'?true:false;

            }

        }
    ,
    }

</script>
<style scoped>
    .right_header {
        color: #fff;
        margin-left: 30%;
    }

</style>
 