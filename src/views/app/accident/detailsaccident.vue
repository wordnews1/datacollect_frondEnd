<template>

  <b-overlay :show="show" rounded="sm">

    <b-modal id="openvehicule" :title="$t('add_vehicle')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_vehicle")}} </h5>
      </template>

      <template #default="{  }">
        <b-row style="margin-bottom: 20px">
          <div class="col-md-12">

            <vue-upload-multiple-image
                :data-images="vehicle.vehicleImages"
                idUpload="myIdUpload1"
            ></vue-upload-multiple-image>

          </div>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Numéro Véhicule')"
              label-for="input-1"
          >

            <b-form-input disabled

                v-model="vehicle.vehicleAccidentNumber"
                type="text"
            ></b-form-input>


          </b-form-group>

          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Plaque d\'immatriculation ')"
              label-for="input-1"
          >

            <b-form-input disabled
                v-uppercase

                v-model="vehicle.plate"
                type="text"
            ></b-form-input>


          </b-form-group>

          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Année modèle du Véhicule')"
              label-for="input-1"
          >

            <b-form-input disabled

                v-model="vehicle.fabricationYear"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Cylindrée')"
              label-for="input-1"
          >

            <b-form-input disabled

                v-model="vehicle.cylinderCapacity"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Marque')"
              label-for="input-1"
          >



            <b-form-select disabled v-model="vehicle.brand">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.brandResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Type de véhicule')"
              label-for="input-1"
          >



            <b-form-select disabled v-model="vehicle.type">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.vehicleTypeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Modèle du Véhicule')"
              label-for="input-1"
          >


            <b-form-select disabled v-model="vehicle.model">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.vehicleModelResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>

          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Fonction spéciale du Véhicule')"
              label-for="input-1"
          >

            <b-form-select disabled v-model="vehicle.specialFunction">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.specialFunctionResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>



          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Manoeuvre du Véhicule')"
              label-for="input-1"
          >



            <b-form-select disabled v-model="vehicle.vehicleAction">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.vehicleActionResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>
        </b-row>


        <p></p>
        <div style="text-align: right">
        </div>

      </template>

    </b-modal>

    <b-modal size="lg" class="test-modal" id="openperson" :title="$t('add_person')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_person")}} </h5>
      </template>

      <template #default="{  }">
        <b-row>
          <div class="col-md-12">

            <vue-upload-multiple-image
                :data-images="person.images"
                idUpload="myIdUpload2"
            ></vue-upload-multiple-image>

          </div>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-12 mb-30"
                         :label="$t('véhicules concerné')"
                         label-for="input-1"
          >


            <b-form-select disabled v-model="person.vehicleAccidentNumber">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in vehicles" :value="option.vehicleAccidentNumber" :key="option.vehicleAccidentNumber">
                {{ option.plate }}
              </option>
            </b-form-select>


          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Numéro de la personne')"
                         label-for="input-1"
          >

            <b-form-input disabled

                v-model="person.personAccidentNumber"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Numéro vehicule lie au pieton')"
                         label-for="input-1"
          >

            <b-form-input disabled
                v-model="person.vehicleLinkedPedestrian"
                type="text"
            ></b-form-input>


          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Prenom')"
                         label-for="input-1"
          >

            <b-form-input disabled

                v-model="person.firstName"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Nom')"
                         label-for="input-1"
          >

            <b-form-input disabled
                v-uppercase

                v-model="person.lastName"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Date de Naissance')"
                         label-for="input-1"
          >
            <date-picker v-model="person.birthDate" valueType="DD/MM/YYYY" ></date-picker>



          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Genre')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.gender">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.genderResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Annee d\'obtention du permis')"
                         label-for="input-1"
          >
            <date-picker v-model="person.drivingLicenceYear" valueType="DD/MM/YYYY"></date-picker>



          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Type d\' usager de la Route')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.roadType">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.personRoadTypeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Manoeuvre du Pieton')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.personAction">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.actionResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Consommation d\' alcool')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.alcoholConsumption">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.alcoholConsumptionResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Consommation de Drogues')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.drugUse">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.personDrugUseResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Rangee')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.range">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.seatingRangeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Place')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.place">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.seatingPlaceResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>



          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Port de Casque')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.wearingHelmet">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.wearingHelmetResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Equipement de Securite')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.occupantRestraintSystem">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.occupantRestraintSystemResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>




          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Status du Test')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.testStatus">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.alcoholTestStatusResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Type de Test')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.testType">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.alcoholTestTypeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>





          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Resultat des tests')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.testResult">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.alcoholTestResultResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Gravite des traumatismes')"
                         label-for="input-1"
          >

            <b-form-select disabled v-model="person.traumaSeverity">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.traumaSeverityResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

        </b-row>


        <p></p>
        <div style="text-align: right">
          <b-button @click="submitperson()" variant="outline-success" style="margin-right: 15px">
            {{$t('ajouter')}}</b-button>
        </div>

      </template>

    </b-modal>

    <b-form :aria-hidden="show ? 'true' : null" @submit.prevent="submitall">

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-44 variant="transparent">
              {{$t('Image Accident')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-44" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

                <vue-upload-multiple-image
                    :data-images="images"
                    idUpload="myIdUpload"
                ></vue-upload-multiple-image>



              </b-row>
            </b-card-body>
          </b-collapse>


        </b-card>

      </div>
      <br/>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('accident')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Type Accident')"
                    label-for="input-1"
                >

                  <!--                  <b-form-input disabled
                  
                                                  v-model="data.accidentType"
                                                  type="text"
                                    ></b-form-input>-->
                  <b-form-select disabled v-model="data.accidentType">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.accidentTypeResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Gravite Accident')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.accidentSeverity">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.accidentSeverityResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>


                </b-form-group>
                <b-form-group
                    class="col-md-3 mb-30"
                    :label="$t('Date Accident')"
                    label-for="input-1"
                >
                  <date-picker v-model="data.accidentDate" valueType="DD/MM/YYYY"></date-picker>

                </b-form-group>
                <b-form-group
                    class="col-md-3 mb-30"
                    :label="$t('Heure Accident')"
                    label-for="input-1"
                >
                  <vue-timepicker v-model="data.accidentTime"></vue-timepicker>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Type d impact')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.impactType">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.impactTypeResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>

                </b-form-group>


                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Conditions climatiques')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.climaticCondition">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.climaticConditionResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Conditions de luminosité')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.brightnessCondition">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.brightnessConditionResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Ville')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.city">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.cityResp" :value="option.id" :key="option.id">
                      {{ option.name }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('municipalité')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.municipality">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.municipalityResp" :value="option.id" :key="option.id">
                      {{ option.name }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('place')"
                    label-for="input-1"
                >
                  <b-form-input disabled


                      v-model="data.place"
                      type="text"
                  ></b-form-input>

                </b-form-group>



              </b-row>



            </b-card-body>
          </b-collapse>

        </b-card>
      </div>
      <p></p>
      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-2 variant="transparent">
              {{$t('route')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-2" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('type de Route')"
                    label-for="input-1"
                >
                  <b-form-select disabled v-model="data.roadType">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.roadTypeResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Categorie de Route')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.roadCategory">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.roadCategoryResp" :value="option.id" :key="option.id">
                      {{ option.name }}
                    </option>
                  </b-form-select>


                </b-form-group><b-form-group
                  class="col-md-6 mb-30"
                  :label="$t('Etat de la Route')"
                  label-for="input-1"
              >
                <b-form-select disabled v-model="data.roadState">
                  <option :value="null" >-- Please select an option --</option>
                  <option v-for="option in respdata.roadStateResp" :value="option.id" :key="option.id">
                    {{ option.value }}
                  </option>
                </b-form-select>


              </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Carrefour')"
                    label-for="input-1"
                >


                  <b-form-select disabled v-model="data.roadIntersection">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.roadIntersectionResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>


                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Obstacles routiers')"
                    label-for="input-1"
                >

                  <b-form-select disabled v-model="data.block">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.blockResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>


                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Type de contrôle de la circulation au carrefour')"
                    label-for="input-1"
                >
                  <b-form-select disabled v-model="data.roadTrafficControl">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.controlResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('virage')"
                    label-for="input-1"
                >
                  <b-form-select disabled v-model="data.virage">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.virageResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>




                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Route avec pente?')"
                    label-for="input-1"
                >
                  <b-form-select disabled v-model="data.roadSlopSection">
                    <option :value="null" >-- Please select an option --</option>
                    <option v-for="option in respdata.roadSlopSectionResp" :value="option.id" :key="option.id">
                      {{ option.value }}
                    </option>
                  </b-form-select>


                </b-form-group>
              </b-row>



            </b-card-body>
          </b-collapse>

        </b-card>
      </div>
      <p></p>
      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-7 variant="transparent">
              {{$t('véhicules')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-7" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-button  @click ="addvehicules()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>



                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'examen'" @onRowclick="onRowclick" @onEditClick="onEditClick" :rows="vehicles" :columns="columnexamen" :isCLoseMenu="true"
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
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-6 variant="transparent">
              {{$t('accidentés')}}</b-button>
          </b-card-header>
          <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-button  @click ="addperson()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'soins'" :rows="persons" @onEditClick="onEditClick" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
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



      <b-button  type="submit"
                 variant="outline-success rights"
                 style="float: right">{{$t('Enregistrer')}}</b-button>



    </b-form>
  </b-overlay>

</template>

<script>

import constants from '../../../plugins/constants'
import ListTable from '../components/List-table2'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueUploadMultipleImage from 'vue-upload-multiple-image'

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
    ListTable,DatePicker,VueTimepicker,VueUploadMultipleImage
  },
  mounted(){
    console.log('rowe',this.rowes)
    //this.ListDossierPatient(this.rowes[0].id)
    this.ListData()

    setTimeout(function () { this.DetailsAccident(this.rowes.id)
    }.bind(this), 2000)


  },
  data() {
    return {
      respdata:{},
      data:{},
      vehicle:{},
      vehicles:[],
      images:[],
      person:{},
      persons:[],
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
      listrauma:[],
      totalPagesoin_:0,
      loadanotherpage:false,
      totalElementsoin:0,
      linksoin:[],
      columnexamen:[
        {
          label: "Id",
          field: "id",
          hidden: false,
        },
        {
          label: "numero du vehicule",
          field: "vehicleAccidentNumber",
          hidden: false,
        },
        {
          label: "Immatriculation",
          field: "plate",
          hidden: false,
        }
        ,{
          label: "Annee de Fabrication",
          field: "fabricationYear",
          hidden: false,
        }
        ,{
          label: "Cylindree",
          field: "cylinderCapacity",
          hidden: false,
        }
        ,{
          label: "actions",
          field: "actions",
          hidden: false,
          html: true,
        }

      ],
      columnoins:[

        {
          label: "CNI",
          field: "cni",
          hidden: false,
        },
        {
          label: "Numero de la Personne",
          field: "personAccidentNumber",
          hidden: false,
        },
        {
          label: "Name",
          field: "firstName",
          hidden: false,
        },
        {
          label: "Annee du permis",
          field: "drivingLicenceYear",
          hidden: false,
        },
        {
          label: "actions",
          field: "actions",
          hidden: false,
          html: true,
        }
      ],
      consumalcohol:'',
      consumdrugs:'',
      personGender:'',
      checkedNames:[],
      poids:'',
      temperature:'',
      tension:'',
      pouls:'',

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
    ...mapGetters(["GETLISTDATA","GETADDACCIDENT","GETDETAILACCIDENT"]),
    someComputed() {
      return `firstName lastName`;
    }
  },
  methods:{

    ...mapActions(["addpolice","ListData","DetailsAccident"]),

    onEditClick(params){

      switch(params.types) {
        case 'examen':

          this.vehicle = params
          this.$bvModal.show('openvehicule')

          break;

        case 'soins':

          this.person = params
          this.$bvModal.show('openperson')

          break;

      }
    },

    timechoose(data){
      console.log('data',data)
    },
    addperson(){
      this.$bvModal.show('openperson')
    },
    addvehicules(){
      this.$bvModal.show('openvehicule')
    },
    submitall(){
      console.log("vehicles",this.rowes.id)
      //if(data.accidentTime)
      //this.data.accidentTime = this.accidentTime.hh +":"+ this.accidentTime.mm
      this.data.road = 0
      //this.$set(this.data, 'id', this.rowes.id);
      this.data.vehicules = this.vehicles
      this.data.persons = this.persons

      this.data.id = this.rowes.id
      console.log("vehicles",this.data)

      this.addpolice(this.data)

    },
    submitperson(){

      //console.log("this.vehicles",this.person.vehicleAccidentNumber)
      //console.log("this.vehicles",this.person.vehicleAccidentNumber==null)
      //return;

      this.$bvModal.hide('openperson')
      this.person.id=0
      this.person.care=0
      this.persons.push(this.person)
      console.log("this.vehicles",this.persons)


      this.person={}
      this.makeToast(this.$t('added'),1)
    },
    submitvehicule(){
      this.$bvModal.hide('openvehicule')
      this.vehicle.vehicleId = 0
      this.vehicles.push(this.vehicle)
      console.log("this.vehicles",this.vehicles)

      this.vehicle={}
      this.makeToast(this.$t('added'),1)
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

                this.openb = false
                this.valeur=''
                this.makeToast(this.$t('added'),1)
                console.log('products_error',response);
                this.listexamen.push(response.data.data.exams)
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
                this.valeur=''
                this.makeToast(this.$t('added'),1)
                console.log('products_error',response);
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
          axios.post(constants.resource_url+'cares/add-injury', soin)
              .then(response =>{
                this.makeToast(this.$t('added'),1)
                console.log('products_error',response);
                this.openb = false
                this.valeur=''
                this.listrauma.push(response.data.data.injuries)

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

    onRowclick(params){
      this.loadanotherpage = true
      let soin = {
        care: this.folder_id,
        item: params.id
      };
      switch(params.types){
        case 'examen':

          axios.post(constants.resource_url+'cares/remove-exam', soin)
              .then(response =>{
                this.listexamen = response.data.data.exams;
                this.loadanotherpage = false
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

          axios.post(constants.resource_url+'cares/remove-treatment', soin)
              .then(response =>{
                this.listsoin = response.data.data.treatments;
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
                this.listrauma = response.data.data.injuries;
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

    GETDETAILACCIDENT(data){

      console.log('datae',data)
      this.data = data
      this.vehicles = data.vehicules
      this.persons = data.persons
      this.images = data.crashImages

      //this.images = data.vehicules[0].images
      console.log('imagesr',this.images)
      /*const reader = new FileReader()
      reader.readAsDataURL(this.images)
      reader.onload = e => {
        this.images = e.target.result
        console.log('imagesr',this.images)
      }*/

      console.log('datae',this.persons)

    },
    GETLISTDATA(data){

      console.log('data',data)
      this.respdata = data

    },
    GETADDACCIDENT(data){

      console.log('data11',data)
      //this.respdata = dataf

      this.makeToast(this.$t('addedp'),1)
      this.$router.push({name: 'accidents'})

    }

  }
  ,
}

</script>
<style scoped >
.cursor-pointer {
  cursor: pointer;
}


.form-control{
  font-size: 0.8rem!important;
}
.custom-select{
  height: calc(2rem )!important;
}
select.form-control{
  height: calc(2rem )!important;
}
.form-group{
  margin-bottom:0.1rem
}

</style>