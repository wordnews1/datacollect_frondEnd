<template>

  <b-overlay :show="show" rounded="sm">

    <b-modal scrollable no-close-on-backdrop   id="choose" size="lg" hide-footer>

      <b-row>
        <b-col style="
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;
  justify-items: center;
">

          <div>
            <div  class="card mb-20">
              <a href="#"  @click="addperson(0)" class="item item-text-wrap item-button-left  taille">
                <i class="i-Add icon"></i> <span class="icons">{{$t('Chauffeur')}}</span>
              </a>
            </div>
          </div>
        </b-col>
        <b-col style="
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;
  justify-items: center;
">

          <div>
            <div  class="card mb-20">
              <a href="#"  @click="addperson(1)" class="item item-text-wrap item-button-left  taille">
                <i class="i-Add icon"></i> <span class="icons">{{$t('Passager')}}</span>
              </a>
            </div>
          </div>
        </b-col>
        <b-col style="
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;
  justify-items: center;
">

          <div>
            <div  class="card mb-20">
              <a href="#"  @click="addperson(2)" class="item item-text-wrap item-button-left  taille">
                <i class="i-Add icon"></i> <span class="icons">{{$t('Pieton')}}</span>
              </a>
            </div>
          </div>
        </b-col>

      </b-row>

    </b-modal>

    <b-modal id="openvehicule" :title="$t('add_vehicle')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_vehicle")}} </h5>
      </template>

      <template #default="{  }">
        <b-row style="margin-bottom: 20px">
          <div class="col-md-12">

            <vue-upload-multiple-image
                dragText="Image du véhicule"
                browseText=""
                primaryText=""
                dropText=""
                @before-remove="fileRemovedVehicles"
                @upload-success="fileAddedVehicles"
                :data-images="vehicle.vehicleImages"
                idUpload="myIdUpload1"
            ></vue-upload-multiple-image>

<!--            <upload-image is="upload-image"
                          :url="forms.create.url"
                          :max_files="5"
                          name="files[]"
                          :resize_enabled="true"
                          :resize_max_width="640"
                          :button_class="'button is-primary'"
                          v-on:upload-image-success="uploadImageSuccess"
            ></upload-image>-->

<!--            <vue-dropzone
                ref="myVueDropzones1"
                :useCustomSlot="true"
                id="dropzones1"
                :options="dropzoneOptions"
                @vdropzone-file-added="fileAddedVehicles"
                @vdropzone-removed-file="removeVehicles"
            ></vue-dropzone>-->


          </div>
        </b-row>
        <b-row>

          <b-form-group
            class="col-md-6 mb-30"
            :label="$t('Numéro Véhicule')"
            label-for="input-1"
        >

                            <b-form-input
                                disabled
                                          v-model="vehicle.vehicleAccidentNumber"
                                          type="text"
                            ></b-form-input>


        </b-form-group>

        <b-form-group
            class="col-md-6 mb-30"
            :label="$t('Plaque d\'immatriculation ')"
            label-for="input-1"
        >

          <b-form-input
              v-uppercase
              @input="suggestionon"
              v-model="vehicle.plate"
              type="text"
          ></b-form-input>

          <b-list-group v-if="filteredSuggestions.length" style="width:90%;float:inherit;
           position:absolute;z-index:1">

            <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                               @click="selected({item:s})">
              {{s.numImmatriculation}}

            </b-list-group-item>

          </b-list-group>

          <p></p>


        </b-form-group>

        <b-form-group
            class="col-md-6 mb-30"
            :label="$t('Année modèle du Véhicule')"
            label-for="input-1"
        >

          <b-form-input

              v-model="vehicle.fabricationYear"
              type="text"
          ></b-form-input>


        </b-form-group>
        <b-form-group
            class="col-md-6 mb-30"
            :label="$t('Cylindrée')"
            label-for="input-1"
        >

          <b-form-input

              v-model="vehicle.cylinderCapacity"
              type="text"
          ></b-form-input>


        </b-form-group>
        <b-form-group
            class="col-md-6 mb-30"
            :label="$t('Marque')"
            label-for="input-1"
        >



          <b-form-select v-model="vehicle.brand">
            <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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



          <b-form-select v-model="vehicle.type">
            <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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


          <b-form-select v-model="vehicle.model">
            <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

          <b-form-select v-model="vehicle.specialFunction">
            <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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



          <b-form-select v-model="vehicle.vehicleAction">
            <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
            <option v-for="option in respdata.vehicleActionResp" :value="option.id" :key="option.id">
              {{ option.value }}
            </option>
          </b-form-select>


        </b-form-group>
        </b-row>


        <p></p>
        <div style="text-align: right">
          <b-button v-if="operations"  @click="submitvehicule()" variant="outline-success" style="margin-right: 15px">
            {{$t('ajouter')}}</b-button>

          <b-button  v-if="!operations" @click="submiteditvehicule()" variant="outline-success" style="margin-right: 15px">
            {{$t('modifier')}}</b-button>
        </div>


      </template>

    </b-modal>

    <b-modal id="opendocumentperson" :title="$t('add_document')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_document")}} </h5>
      </template>

      <template #default="{  }">
        <b-row style="margin-bottom: 20px">
          <div class="col-md-12">

            <vue-upload-multiple-image
                dragText="Document"
                browseText=""
                primaryText=""
                dropText=""
                @before-remove="fileRemovedDocumentperson"
                @upload-success="fileAddedDocumentperson"
                :data-images="document1.image"
                idUpload="myIdUpload2"
            ></vue-upload-multiple-image>

          </div>
        </b-row>
        <b-row>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Type de Document')"
              label-for="input-1"
          >
            <b-form-select v-model="document1.type">
              <option :value="null" disabled>-- Please select an option --</option>
              <option v-for="option in respdata.documentTypeResp" :value="option.id" :key="option.id">
                {{ option.name }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Identification')"
              label-for="input-1"
          >

            <b-form-input
                v-uppercase
                v-model="document1.identification"
                type="text"
            ></b-form-input>

          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Prenom')"
              label-for="input-1"
          >

            <b-form-input
                v-model="document1.recipientFirstname"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Nom')"
              label-for="input-1"
          >

            <b-form-input
                v-model="document1.recipientLastname"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Date de Delivrance')"
                         label-for="input-1"
          >
            <date-picker v-model="document1.issueDate" format="DD/MM/YYYY"  valueType="DD/MM/YYYY" ></date-picker>

          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Date dexpiration')"
                         label-for="input-1"
          >
            <date-picker v-model="document1.expireAt" format="DD/MM/YYYY"  valueType="DD/MM/YYYY" ></date-picker>

          </b-form-group>

        </b-row>


        <p></p>
        <div style="text-align: right">
          <b-button v-if="operations"  @click="submitdocumentperson()" variant="outline-success" style="margin-right: 15px">
            {{$t('ajouter')}}</b-button>

          <b-button  v-if="!operations" @click="submiteditdocumentperson()" variant="outline-success" style="margin-right: 15px">
            {{$t('modifier')}}</b-button>
        </div>


      </template>

    </b-modal>

    <b-modal id="opendocument" :title="$t('add_document')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_document")}} </h5>
      </template>

      <template #default="{  }">
        <b-row style="margin-bottom: 20px">
          <div class="col-md-12">

            <vue-upload-multiple-image
                dragText="Document"
                browseText=""
                primaryText=""
                dropText=""
                @before-remove="fileRemovedDocument"
                @upload-success="fileAddedDocument"
                :data-images="document.image"
                idUpload="myIdUpload1"
            ></vue-upload-multiple-image>

          </div>
        </b-row>
        <b-row>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Type de Document')"
              label-for="input-1"
          >
            <b-form-select v-model="document.type">
              <option :value="null" disabled>-- Please select an option --</option>
              <option v-for="option in respdata.documentTypeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>

          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Identification')"
              label-for="input-1"
          >

            <b-form-input
                v-uppercase
                v-model="document.identification"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Prenom')"
              label-for="input-1"
          >

            <b-form-input
                v-model="document.recipientFirstname"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Nom')"
              label-for="input-1"
          >

            <b-form-input
                v-model="document.recipientLastname"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Date de Delivrance')"
                         label-for="input-1"
          >
            <date-picker v-model="document.issueDate" format="DD/MM/YYYY"  valueType="DD/MM/YYYY" ></date-picker>

          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Date dexpiration')"
                         label-for="input-1"
          >
            <date-picker v-model="document.expireAt" format="DD/MM/YYYY"  valueType="DD/MM/YYYY" ></date-picker>

          </b-form-group>

        </b-row>


        <p></p>
        <div style="text-align: right">
          <b-button v-if="operations"  @click="submitdocument()" variant="outline-success" style="margin-right: 15px">
            {{$t('ajouter')}}</b-button>

          <b-button  v-if="!operations" @click="submiteditdocumentvehicule()" variant="outline-success" style="margin-right: 15px">
            {{$t('modifier')}}</b-button>
        </div>


      </template>

    </b-modal>

    <b-modal size="lg" class="test-modal" id="openperson" :title="$t('add_person')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_person")}} </h5>
      </template>

      <template #default="{  }">
        <b-row style="margin-bottom: 20px">
          <div class="col-md-12">

            <vue-upload-multiple-image
                dragText="Image des accidentés"
                browseText=""
                primaryText=""
                dropText=""
                @before-remove="fileRemovedPersons"
                @upload-success="fileAddedPersons"
                :data-images="person.images"
                idUpload="myIdUpload2"
            ></vue-upload-multiple-image>

<!--            <vue-dropzone
                ref="myVueDropzones"
                :useCustomSlot="true"
                id="dropzones"
                :options="dropzoneOptions"
                @vdropzone-file-added="fileAddedPersons"
            ></vue-dropzone>-->

          </div>
        </b-row>
        <b-row>
          <b-form-group  style="margin-bottom: 10px"
              class="col-md-12 mb-30"
              :label="$t('véhicules concerné')"
              label-for="input-1"
          >


            <b-form-select @change="getSelectedItem" v-model="person.vehicleAccidentNumber">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in vehicles" :value="option.vehicleAccidentNumber" :key="option.vehicleAccidentNumber">
                {{ option.plate }}
              </option>
            </b-form-select>


          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Profession')"
              label-for="input-1"
          >


            <b-form-select  v-model="person.profession">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.professionResp" :value="option.id" :key="option.id">
                {{ option.name }}
              </option>
            </b-form-select>


          </b-form-group>

        <b-form-group  style="margin-bottom: 10px"
            class="col-md-6 mb-30"
            :label="$t('Numéro de la personne')"
            label-for="input-1"
        >

                            <b-form-input
                                disabled

                                          v-model="person.personAccidentNumber"
                                          type="text"
                            ></b-form-input>


        </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Numéro vehicule lie au pieton')"
                         label-for="input-1"
          >

            <b-form-input
                disabled
                v-model="person.vehicleLinkedPedestrian"
                type="text"
            ></b-form-input>


          </b-form-group>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('CNI')"
              label-for="input-1"
          >

            <b-form-input
                v-uppercase

                v-model="data.cni"
                type="text"
            ></b-form-input>


          </b-form-group>

        <b-form-group  style="margin-bottom: 10px"
            class="col-md-6 mb-30"
            :label="$t('Prenom')"
            label-for="input-1"
        >

          <b-form-input

              v-model="person.firstName"
              type="text"
          ></b-form-input>


        </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
            class="col-md-6 mb-30"
            :label="$t('Nom')"
            label-for="input-1"
        >

          <b-form-input
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
            <date-picker v-model="person.birthDate" format="DD/MM/YYYY"  valueType="DD/MM/YYYY" ></date-picker>

          </b-form-group>

          <b-form-group
              v-if="nopermisdisabled"
              class="col-md-6 mb-30"
              :label="$t('Numero Permis')"
              label-for="input-1"
          >
            <b-form-input
                          v-model="person.nopermis"
                          type="text"
            ></b-form-input>

          </b-form-group>


          <b-form-group
              v-if="typepermisdisabled"
              style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Type de Permis')"
                         label-for="input-1"
          >

            <b-form-select v-model="person.typepermis"  >
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in permises" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Sexe')"
              label-for="input-1"
          >

            <b-form-select v-model="person.gender">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.genderResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>
          <b-form-group
              v-if="drivingLicenceYeardisabled"
              style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Annee d\'obtention du permis')"
              label-for="input-1"
          >
            <date-picker v-model="person.drivingLicenceYear"  format="DD/MM/YYYY"  valueType="DD/MM/YYYY"></date-picker>



          </b-form-group>

          <b-form-group  style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Type d\' usager de la Route')"
              label-for="input-1"
          >

            <b-form-select v-model="person.roadType">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.personRoadTypeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>
          <b-form-group
              v-if="personActiondisabled"
              style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Manoeuvre du Pieton')"
              label-for="input-1"
          >

            <b-form-select v-model="person.personAction">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.alcoholConsumption">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.drugUse">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.personDrugUseResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group
              v-if="seatingrangedisabled"
              style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Rangee')"
              label-for="input-1"
          >

            <b-form-select v-model="person.range">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.seatingRangeResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group
              v-if="seatingplacedisabled"
              style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Place')"
              label-for="input-1"
          >

            <b-form-select v-model="person.place" >
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.wearingHelmet">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.wearingHelmetResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

          <b-form-group
              v-if="occupantRestraintSystemdisabled"
                        style="margin-bottom: 10px"
              class="col-md-6 mb-30"
              :label="$t('Equipement de Securite')"
              label-for="input-1"
          >

            <b-form-select v-model="person.occupantRestraintSystem">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.testStatus">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.testType">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.testResult">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
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

            <b-form-select v-model="person.traumaSeverity">
              <option :value="null" disabled>&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.traumaSeverityResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>

          </b-form-group>

        </b-row>


        <p></p>
        <div style="text-align: right">
          <b-button v-if="operations" @click="submitperson()" variant="outline-success" style="margin-right: 15px">
            {{$t('ajouter')}}</b-button>

          <b-button v-if="!operations" @click="submiteditperson()" variant="outline-success" style="margin-right: 15px">
            {{$t('modifier')}}</b-button>
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
                    dragText="Image Accident"
                    browseText=""
                    primaryText=""
                    dropText=""
                    @before-remove="fileRemoved"
                    @upload-success="fileAdded"
                    :data-images="imagetest"
                    idUpload="myIdUpload"
                ></vue-upload-multiple-image>

<!--                <vue-dropzone
                    ref="myVueDropzone"
                    :useCustomSlot="true"
                    id="dropzone"
                    width="500px"
                    :options="dropzoneOptions"
                    @vdropzone-file-added="fileAdded"
                ></vue-dropzone>-->

              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>

      </div>
      <br/>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" @click="modalShown" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('Carte GPS')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

              <b-form-group
                  class="col-md-6 mb-30"
                  :label="$t('longitude')"
                  label-for="input-1"
              >
                <b-form-input


                    v-model="data.longitude"
                    type="text"
                ></b-form-input>

              </b-form-group>
              <b-form-group
                  class="col-md-6 mb-30"
                  :label="$t('latitude')"
                  label-for="input-1"
              >
                <b-form-input

                    v-model="data.latitude"
                    type="text"
                ></b-form-input>

              </b-form-group>
              </b-row>
              <div class="foobar1">
                  <l-map ref="myMap"  :zoom="zoom" :center="center" @click="addMarker">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker v-for="(marker, index) in markerLatLng" :lat-lng="marker" :key="marker"  @click="removeMarker(index)"></l-marker>

                  </l-map>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <br/>

      </div>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-11 variant="transparent">
              {{$t('accident')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-11" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
<!--                <l-map ref="myMap" style="height: 300px" @ready="doSomethingOnReady()"></l-map>-->

                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Causes')"
                    label-for="input-1"
                >
                  <vue-multi-select
                      v-model="data.causes"
                      search
                      historyButton
                      :filters="filters"
                      :options="options"
                      :selectOptions="respdata.directCauseResp">
                    <template v-slot:option="{option}">
                      <span>{{option.name}}</span>
                    </template>

                  </vue-multi-select>


                </b-form-group>

                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Type Accident')"
                    label-for="input-1"
                >

<!--                  <b-form-input

                                v-model="data.accidentType"
                                type="text"
                  ></b-form-input>-->
                  <b-form-select v-model="data.accidentType">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.accidentSeverity">
                    <option :value="null" disabled>-- Please select an option --</option>
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
                <date-picker v-model="data.accidentDate" format="DD/MM/YYYY"  valueType="DD/MM/YYYY"></date-picker>

              </b-form-group>
                <b-form-group
                    class="col-md-3 mb-30"
                    :label="$t('Heure Accident')"
                    label-for="input-1"
                >
                   <vue-timepicker v-model="accidentTime" format="hh:mm" ></vue-timepicker>


                </b-form-group>
                <b-form-group
                  class="col-md-6 mb-30"
                  :label="$t('Type d impact')"
                  label-for="input-1"
              >

                <b-form-select v-model="data.impactType">
                  <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.climaticCondition">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.brightnessCondition">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.city">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.municipality">
                    <option :value="null" disabled>-- Please select an option --</option>
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
                  <b-form-input
                      

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
                  <b-form-select v-model="data.roadType" :disabled="!roadTypedisabled">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.roadCategory">
                    <option :value="null" disabled>-- Please select an option --</option>
                    <option v-for="option in respdata.roadCategoryResp" :value="option.id" :key="option.id">
                      {{ option.name }}
                    </option>
                  </b-form-select>


                </b-form-group><b-form-group
                  class="col-md-6 mb-30"
                  :label="$t('Etat de la Route')"
                  label-for="input-1"
              >
                <b-form-select v-model="data.roadState">
                  <option :value="null" disabled>-- Please select an option --</option>
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


                  <b-form-select v-model="data.roadIntersection">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                  <b-form-select v-model="data.block">
                    <option :value="null" disabled>-- Please select an option --</option>
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
                  <b-form-select v-model="data.roadTrafficControl">
                    <option :value="null" disabled>-- Please select an option --</option>
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
                  <b-form-select v-model="data.virage">
                    <option :value="null" disabled>-- Please select an option --</option>
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
                  <b-form-select v-model="data.roadSlopSection">
                    <option :value="null" disabled>-- Please select an option --</option>
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

                <b-button   v-if="seen==true"  @click ="addvehicules()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                <b-button v-if="seen==false" @click ="retour()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('retour')}}</b-button>
                <b-button v-if="seen==false" @click ="addocument()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm">

                    <div v-if="seen==true">
                    <ListTable :type="'examen'" @onEditClick="onEditClick" @onRowclick="onRowclick" :rows="vehicles" :columns="columnexamen" :isCLoseMenu="true"
                               :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                               @deleteProps="deleteProps" @editProps="editProps" @onDocumentClick="onDocumentClick" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>
                    </div>
                    <div  v-if="seen==false" >
                      <ListTable :type="'document'"  @onEditClick="onEditClick" @onRowclick="onRowclick" :rows="documents" :columns="columndocument" :isCLoseMenu="true"
                                 :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                 @deleteProps="deleteProps" @editProps="editProps" @onDocumentClick="onDocumentClick" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>
                    </div>

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
            <b-button class="card-title mb-0" block href="#"
                      v-b-toggle.accordion-6 variant="transparent">
              {{$t('accidentés')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-6" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-button  v-if="seen2==true" @click ="choose()"  variant="success"
                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                <b-button  v-if="seen2==false" @click ="retour2()"  variant="primary"
                          style="position: relative;right: 0;margin-right: 10px;">{{$t('retour')}}</b-button>

                <b-button v-if="seen2==false" @click ="addocumentpersons()"  variant="success"
                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>


                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >
                  <div v-if="seen2">
                    <ListTable v-if="seen2==true"  :type="'soins'" :rows="persons" :columns="columnoins" @onRowclick="onRowclick" :isCLoseMenu="true"
                               :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                               @deleteProps="deleteProps" @onDocumentClick="onDocumentClick" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>

                  </div>
                    <div v-if="seen2==false">
                      <ListTable :type="'document'" :rows="documents1" :columns="columndocument" @onRowclick="onRowclick" :isCLoseMenu="true"
                                 :totalPage="totalPagesoin_" :totalElement="totalElementsoin" :links="linksoin"
                                 @deleteProps="deleteProps" @onDocumentClick="onDocumentClick" @editProps="editProps" @loadpage="loadpage" @selectionChanged="clickRow"></ListTable>

                    </div>

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

import VueUploadMultipleImage from 'vue-upload-multiple-image'

import L from 'leaflet';
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';
import constants from '../../../plugins/constants'
import ListTable from '../components/List-table2'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import "leaflet/dist/leaflet.css"

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
    ListTable,DatePicker,VueTimepicker, LMap,
    LTileLayer,
    LMarker,vueMultiSelect,VueUploadMultipleImage
  },

  mounted(){
    console.log('rowe',this.rowes)

    //this.ListDossierPatient(this.rowes[0].id)
    this.ListData()
    //this.$refs.myMap.mapObject._onResize();


  },
  data() {
    return {
      vehicleId:0,
      permises:[
        {id:1,
        value:"A"},
        {id:2,
          value:"B"},
        {id:3,
          value:"B1"},
        {id:4,
          value:"C"},
        {id:5,
          value:"D"}
      ],
      operations:true,
      seen:true,
      seen2:true,

      occupantRestraintSystemdisabled:true,
      personActiondisabled:true,
      roadTypedisabled:true,

      nopermisdisabled:true,
      typepermisdisabled:true,
      drivingLicenceYeardisabled:true,
      seatingrangedisabled:true,
      seatingplacedisabled:true,
      forms:{
        create:{url:"",confirm:"confirmer"},

      },
      images:[],
      images1:[],
      images2:[],
      filters: [{
        nameAll: 'Select all',
        nameNotAll: 'Deselect all',
        func() {
          return true;
        },
      }, {
        nameAll: 'select <= 10',
        nameNotAll: 'Deselect <= 10',
        func(elem) {
          return elem;
        },
      }],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 10,
        headers: { "My-Awesome-Header": "header value" }
      },
      options: {
        multi: true,
        groups: false,
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '',
      zoom: 1,
      center: [51.505, -0.159],
      markerLatLng: [L.latLng(6.84, -346.50)],
      respdata:{},
      data:{},
      vehicle:{},
      imagetest2:{},
      imagetest:[],
      imagepersons:[],
      imagevehicles:[],
      vehicles:[],
      person:{},
      persons:[],
      documents:[],
      documents1:[],
      document:{},
      document1:{},
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
          label: "vehicle",
          field: "vehicleImages",
          hidden: true,
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

      columndocument:[

        {
          label: "Id document",
          field: "identification",
          hidden: false,
        },
        {
          label: "Prenom",
          field: "recipientFirstname",
          hidden: false,
        },
        {
          label: "Nom",
          field: "recipientLastname",
          hidden: false,
        },
        {
          label: "Date",
          field: "issueDate",
          hidden: false,
        },
        {
          label: "Date d'expiration",
          field: "expireAt",
          hidden: false,
        },
        {
          label: "Document_id",
          field: "vehicleId",
          hidden: true,
        },
        {
          label: "type",
          field: "type",
          hidden: false,
        }
      ],
      columnoins:[

        {
          label: "Numero de la Personne",
          field: "personAccidentNumber",
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
    ...mapGetters(["GETLISTDATA","GETADDACCIDENT"]),
    someComputed() {
      return `firstName lastName`;
    }
  },
  methods:{
    onEditClick(params){

      console.log('savechange', params);


      switch(params.types) {
        case 'examen':
          this.vehicle = params

          console.log('savechange', this.images1);
          console.log('savechange', this.vehicle);
          this.$bvModal.show('openvehicule')
          this.operations=false

          break;
        case 'soins':
          this.person = params
          this.$bvModal.show('openperson')
          this.operations=false

          break;

      }

    },

    fileRemovedVehicles(index, done, fileList) {

      console.log('data', done, index, fileList)
      this.images1.splice(index, 1)
      this.vehicle.vehicleImages = this.images1
    },
    fileRemovedDocument(index, done, fileList) {

      console.log('data', done, index, fileList)
      this.images3.splice(index, 1)
      this.document.image = this.images3
    },
    fileRemovedDocumentperson(index, done, fileList) {

      console.log('data', done, index, fileList)
      this.images4.splice(index, 1)
      this.document1.image = this.images4
    },
    fileRemovedPersons(index, done, fileList) {

      console.log('data', done, index, fileList)
      this.images2.splice(index, 1)
      this.person.images = this.images2
    },
    fileRemoveds(index, done, fileList) {
      console.log('data', done, index, fileList)
      this.imagetest.splice(index, 1);
    },
    uploadImageSuccess(files){
      console.log('files',files)
    },
    suggestionon(value) {

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
      this.openb = true

      axios.get(constants.resource_url_visit+'public/search/cartegrise/assurance/'+value)
          .then(response =>{

            this.openb = false
            this.filteredSuggestions = response.data.data

            // this.$bvModal.hide('openassociate')

            //this.containerClass = 'container';
            //this.trauma={}
          }).catch(function(error) {
        console.log('products_error',error);
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(error);

        //commit("setError", error);

      });
      }, 1000000000);

    },
    modalShown() {
      setTimeout(() => {
        console.log('clear')
        //mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();

      }, 100);
    },
    uploadImageSuccess1(formData, index, fileList){
      console.log('data', formData, index, fileList)
    },

    handleImages(files){

      console.log('files',files)
      this.images = files

    },
    fileAdded(formData, index, fileList) {

      // this.imagetest.push(files)
      let formdata = new FormData();

      formdata.append('image',formData.get("file"))

      console.log('data', formData, index, fileList)
      axios.post(constants.resource_url+'accidents/save-crash-image',formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
      )
          .then(list => {

            if(list.data.success){
              //build object path
              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.imagetest.push(objet)

            }else{
              this.makeToast(this.$t('erreur lors de l\'ajout de l\'image'),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });

    },

    fileRemoved(index, done, fileList) {

      console.log('data', done, index, fileList)

      let size = this.images[index].path + ''
      let sizes = size.split('/')


      //let formdata = new FormData();

      //let si = ((sizes)[sizes.length-1]).split('.')
      /*formdata.append('name',si[0])
      formdata.append('accidentId',this.data.id)*/

      let send={}
      send.name = (sizes)[sizes.length-1]
      send.id = this.data.id

      console.log('datae', send)

      //console.log('data', formData, index, fileList)
      axios.post(constants.resource_url+'accidents/delete-crash-image',send,
          {
            headers: {
              'Content-Type': 'application/json'
            }}
      )

          .then(list => {

            if(list.data.success){

              this.images.splice(index, 1)

              this.makeToast(this.$t('Image supprime avec success'),1)

            }else{
              this.makeToast(this.$t('erreur lors de la suppression de l\'image'),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });

    },

    fileAddedVehicles(formData, index, fileList){

      let formdata = new FormData();

      formdata.append('image',formData.get("file"))

      console.log('data', formData, index, fileList)
      axios.post(constants.resource_url+'accidents/save-vehicle-image',formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
      )
          .then(list => {

            if(list.data.success){
              //

              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.images1.push(objet)
              this.vehicle.vehicleImages = this.images1


              console.log('images1',this.images1)

            }else{
              this.makeToast(this.$t('erreur lors de l\'ajout de l\'image'),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });
    },

    fileAddedDocument(formData, index, fileList){

      let formdata = new FormData();

      formdata.append('image',formData.get("file"))

      console.log('data', formData, index, fileList)
      axios.post(constants.resource_url+'accidents/save-vehicle-document-image',formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
      )
          .then(list => {

            if(list.data.success){
              //

              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.images3.push(objet)
              this.document.image = this.images3

              console.log('images3',this.images3)

            }else{
              this.makeToast(this.$t('erreur lors de l\'ajout de l\'image'),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });
    },
    fileAddedDocumentperson(formData, index, fileList){

      let formdata = new FormData();

      formdata.append('image',formData.get("file"))

      console.log('data', formData, index, fileList)
      axios.post(constants.resource_url+'accidents/save-person-image',formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
      )
          .then(list => {

            if(list.data.success){
              //

              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.images4.push(objet)
              this.document1.image = this.images4

              console.log('images3',this.images4)

            }else{
              this.makeToast(this.$t('erreur lors de l\'ajout de l\'image'),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });
    },
    removeVehicles(thisFile){
      this.$refs.myVueDropzones1.removeFile(thisFile)
      console.log("File removed!")
    },

    fileAddedPersons(formData, index, fileList){

      let formdata = new FormData();

      formdata.append('image',formData.get("file"))
      console.log('data', formData, index, fileList)
      axios.post(constants.resource_url+'accidents/save-person-image',formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
      )
          .then(list => {

            if(list.data.success){
              //
              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name

              this.images2.push(objet)
              this.person.images = this.images2

            }else{
              this.makeToast(this.$t("erreur lors de l'ajout de l'image"),0)
            }

            console.log('care',list.data.data)
          })
          .catch(function(error) {
            console.log('products_error',error);
            // Handle Errors here.
            // var errorCode = error.code;

          });
    },

    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    addMarker(event) {
      console.log('event',event)

      this.markerLatLng=[]
      this.markerLatLng.push(event.latlng);
      this.data.latitude = event.latlng.lat
      this.data.longitude = event.latlng.lng
    },

    ...mapActions(["addpolice","ListData"]),
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject
    },

    getSelectedItem(params){
      this.person.vehicleLinkedPedestrian = params

      console.log('paf',params)
    },
    addperson(value){


      this.intelligenceformperson(value)
      this.$bvModal.hide('choose')
      this.$bvModal.show('openperson')
      this.operations=true
      this.person.personAccidentNumber = this.persons.length + 1
      this.person.vehicleLinkedPedestrian = 1
    },

    intelligenceformperson(value){

      switch (value){
        case 0:
            //activez rangee,place, les donnees du permis
            this.seatingrangedisabled=true
            this.roadTypedisabled=true
            this.person.roadType = 1

            this.occupantRestraintSystemdisabled=true
            this.personActiondisabled=false

            this.seatingplacedisabled=true
            this.person.place = 1
            this.person.range = 1
             console.log('wearing',this.respdata.wearingHelmetResp[this.getidbycode(this.respdata.wearingHelmetResp,3)].id)

            this.person.wearingHelmet = this.respdata.wearingHelmetResp[this.getidbycode(this.respdata.wearingHelmetResp,3)].id

            this.nopermisdisabled=true
            this.typepermisdisabled=true
            this.drivingLicenceYeardisabled=true

          this.person.personAction = this.respdata.actionResp[this.getidbycode(this.respdata.actionResp,9)].id


          break;
        case 1:
          //activer rangee,place. desactiver tout relatif au permis
          this.seatingrangedisabled=true
          this.seatingplacedisabled=true
          this.nopermisdisabled=false
          this.typepermisdisabled=false
          this.drivingLicenceYeardisabled=false

          this.roadTypedisabled=true
          this.person.roadType = 2
          this.person.personAction = this.respdata.actionResp[this.getidbycode(this.respdata.actionResp,9)].id

          this.occupantRestraintSystemdisabled=true
          this.personActiondisabled=false
          break;
        case 2:
          //desactiver rangee,place,permiss
          this.seatingrangedisabled=false
          this.seatingplacedisabled=false
          this.nopermisdisabled=false
          this.typepermisdisabled=false
          this.drivingLicenceYeardisabled=false

          this.roadTypedisabled=true
          this.person.roadType = 3

          this.person.occupantRestraintSystem = this.respdata.occupantRestraintSystemResp[this.getidbycode(this.respdata.occupantRestraintSystemResp,9)].id
          this.occupantRestraintSystemdisabled=false
          this.personActiondisabled=true
          break;

      }
    },
    retour(){
      this.seen = true
      this.vehicle={}
    },
    retour2(){
      this.seen2 = true
      this.person={}
    },
    addocument(){
      this.$bvModal.show('opendocument')
      this.operations=true
    },
    addocumentpersons(){
      this.$bvModal.show('opendocumentperson')
      this.operations=true
    },
    addvehicules(){
      this.$bvModal.show('openvehicule')
      this.operations=true
      this.vehicle.vehicleAccidentNumber = this.vehicles.length + 1
    },

    getidbycode(liste,code){

      return liste.map(function(item) { return item.code; }).indexOf(code);
    },

    submitall(){
      //console.log("vehicles",item)
      this.data.accidentTime = this.accidentTime.hh +":"+ this.accidentTime.mm
      this.data.road = 0
      this.data.vehicules = this.vehicles
      this.data.persons = this.persons
      this.data.crashImages = this.imagetest
      this.data.id = 0
      console.log("vehicles",this.images)

      let formdata = new FormData();

      formdata.append('accidentReq',JSON.stringify(this.data))
      //console.log('append',this.images.length)
      // formdata.append('images',this.imagetest)
      // formdata.append('imagesvehicles',this.vehicle.vehicleImages)
      // formdata.append('imagespersons',this.person.images)

      /*const reader = new FileReader()
            reader.readAsDataURL(this.file)
            reader.onload = e => {
                this.image = e.target.result
                console.log(this.image)
            }*/

      this.addpolice(formdata)

    },
    choose(){
      this.$bvModal.show('choose')
    },
    submitperson(){

      //console.log("this.vehicles",this.person.vehicleAccidentNumber)
      //console.log("this.vehicles",this.person.vehicleAccidentNumber==null)
      //return;

      this.$bvModal.hide('openperson')
      this.person.id=0
      this.person.care=0
      //this.person.images=this.imagepersons
      //this.imagepersons = []
      this.persons.push(this.person)
      console.log("this.vehicles",this.persons)

      this.person={}
      this.makeToast(this.$t('added'),1)

    },
    submiteditvehicule(){
      this.$bvModal.hide('openvehicule')


      this.vehicles.splice(this.checkvehicule(this.vehicles,this.vehicle.vehicleAccidentNumber), 1,  this.vehicle)

      this.vehicle={}
      this.makeToast(this.$t('added'),1)
    },
    submitvehicule(){

      this.$bvModal.hide('openvehicule')
      this.vehicle.vehicleId = 0

      //this.vehicle.vehicleImages = this.imagevehicles
      this.vehicles.push(this.vehicle)

      console.log("this.vehicles",this.vehicles)
      console.log("this.vehicles1",this.images1)
      //this.imagevehicles = []

      this.vehicle={}
      this.makeToast(this.$t('added'),1)

    },
    submiteditdocumentvehicule(){

      this.operations=false

      this.$bvModal.hide('opendocument')

      this.documents.splice(this.checkdocument(this.documents,this.document.identification), 1,  this.document)

      this.document={}
      this.makeToast(this.$t('added'),1)

    },
    submitdocument(){

      this.$bvModal.hide('opendocument')
      this.document.vehicleId = this.vehicleId

      this.documents.push(this.document)
      this.vehicle.documents = this.documents

      this.document={}
      this.makeToast(this.$t('added'),1)

    },
    submitdocumentperson(){
      this.$bvModal.hide('opendocumentperson')
      this.document1.vehicleId = this.vehicleId

      this.documents1.push(this.document1)
      this.person.documents = this.documents1
      this.document1={}
      this.makeToast(this.$t('added'),1)
    },
    selected(value){
      this.filteredSuggestions = []
      this.vehicle.plate = value.item.numImmatriculation
      this.vehicle.fabricationYear= value.item.dateDelivrance
      this.vehicle.fabricationYear= value.item.vehicule.cylindre
      this.vehicle.fabricationYear= value.item.vehicule.marqueVehicule
      this.vehicle.fabricationYear= value.item.vehicule.typeVehicule
      this.vehicle.fabricationYear= value.item.dateDelivrance

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

    savechange(data) {

      console.log('savechange', data);
    },
    removelist(contact,indexIds){
      contact.splice(indexIds, 1);
      contact.sort();
    },

    onDocumentClick(value){

      console.log('savechange', value);
      console.log('savechange', value.types);

      if(value.types=='examen'){

        this.seen=!this.seen;

        this.vehicle = this.vehicles[this.checkvehicule(this.vehicles,value.vehicleAccidentNumber)]


        console.log('documents',this.vehicle)
        this.vehicleId = this.vehicle.vehicleAccidentNumber
        //filtrer la liste des documents
        console.log('documents',this.documents)
        console.log('documents',this.documents.filter(document => document.vehicleId === this.vehicleId))
        console.log('documents',this.vehicleId)

        this.documents = this.documents.filter(document => document.vehicleId === this.vehicleId);

      }else{

        this.seen2=!this.seen2;
        let id = value.vgt_id
        this.person = this.persons[id]
        this.vehicleId = this.person.personAccidentNumber
        //filtrer la liste des documents
        this.documents1 = this.documents1.filter(document => document.vehicleId === this.vehicleId);

      }



      console.log('savechange', value);

    },

    onRowclick(params){
      this.loadanotherpage = true
      console.log('paramis',params)

      switch(params.types){
        case 'examen':
          this.removelist(this.vehicles,this.checkId(this.vehicles,params.id))
          break;
        case 'soins':
          this.removelist(this.persons,this.checkId(this.persons,params.id))
          break;

      }
      this.loadanotherpage = false

    },
    checkId(obj, id) {

      return obj.map(function(item) { return item.id; }).indexOf(id);

    },
    checkvehicule(obj, id) {

      return obj.map(function(item) { return item.vehicleAccidentNumber; }).indexOf(id);

    },
    checkperson(obj, id) {

      return obj.map(function(item) { return item.personAccidentNumber; }).indexOf(id);

    },
    checkdocument(obj, id) {

      return obj.map(function(item) { return item.identification; }).indexOf(id);

    },
    submiteditdocumentperson(){
      this.operations=false

      this.$bvModal.hide('opendocumentperson')

      this.documents1.splice(this.checkdocument(this.documents1,this.document1.identification), 1,  this.document1)

      this.document1={}
      this.makeToast(this.$t('added'),1)
    },
    submiteditperson(){
      this.operations=false

      this.$bvModal.hide('openperson')

      this.persons.splice(this.checkperson(this.persons,this.person.personAccidentNumber), 1,  this.person)

      this.person={}
      this.makeToast(this.$t('added'),1)
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
    GETLISTDATA(data){

      console.log('data',data)
      this.respdata = data

    },
    GETADDACCIDENT(data){

      console.log('data',data)
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
.foobar1{
  width: 100%;
  height: 300px;
}

/* style="height: 300px;width: 1104px"*/
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
.taille{
  border-radius: 25px;
  width: 95px;
  height: 80px;
  font-weight: bold;
  font-family: Calibri, "Helvetica Neue", Helvetica, sans-serif;
  background: #e8eaed;
  cursor: pointer;

}
.taille:hover{
  border-radius: 25px;
  width: 95px;
  height: 80px;
  font-weight: bold;
  font-family: Calibri, "Helvetica Neue", Helvetica, sans-serif;
  background: #9fc0e7;
  cursor: pointer;

}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-70%, -100%);
  width: 10px;
  height: 10px;
  display: block;
}

.icons {
  position: relative;
  top: 50%;
  left: 50%;
  height: 50%;
  text-align: center;
  width: 50px;
  font-size: 11px;
  transform: translate(-45%, 10%);
  display: block;
}

</style>