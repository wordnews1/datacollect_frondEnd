<template>

  <b-overlay :show="show" rounded="sm">

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

    <b-overlay :show="openb" rounded="sm" >

      <b-modal id="openassociate" :title="$t('open_box')" hide-footer>

        <template #modal-header="{}">
          <!-- Emulate built in modal header close button action -->
          <h5>{{$t("Associer le dossier patient d'un accidenté")}} </h5>
        </template>

        <template #default="{  }">

          <b-form-input
              v-model="valeur"
              @input="suggestionon(valeur)"
              type="text"
              :placeholder="$t('valeur')"
          ></b-form-input>



          <b-list-group v-if="filteredSuggestions.length" style="width:90%;float:inherit;position:absolute;z-index:1">

            <b-list-group-item v-for="(s,i) in filteredSuggestions" :key="i"
                               @click="selected({item:s})">

              Cni: {{s["cni"]}}<br/>
              {{s[optionsKey]}} {{s["prenom"]}}<br/>
              <!--              Date Accident: {{s["dateNaiss"]}}-->
            </b-list-group-item>

          </b-list-group>

          <p></p>
          <div style="text-align: right">
            <b-button @click="addelements()" v-if="rowe[0].care==0" variant="outline-success" style="margin-right: 15px">
              {{$t('associer')}}</b-button>
            <b-button @click="addelements()" v-if="rowe[0].care!=0" variant="outline-success" style="margin-right: 15px">
              {{$t('enlever')}}</b-button>
          </div>

        </template>

      </b-modal>

    </b-overlay>

    <b-modal id="openvehicule" :title="$t('add_vehicle')" hide-footer>

      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>{{$t("add_vehicle")}} </h5>
      </template>

      <template #default="{}">

        <b-row>
          <div class="col-md-12">

            <vue-upload-multiple-image
                dragText="'Image du Vehicule'"
                browseText=""
                primaryText=""
                dropText=""
                @upload-success="fileAddedVehicles"
                @before-remove="fileRemovedVehicles"
                :data-images="vehicle.vehicleImages"
                idUpload="myIdUpload1"
            ></vue-upload-multiple-image>

          </div>
          <b-form-group
              class="col-md-6 mb-30"
              :label="$t('Numéro Véhicule')"
              label-for="input-1"
          >

            <b-form-input

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

                v-model="vehicle.plate"
                type="text"
            ></b-form-input>


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



            <b-form-select  v-model="vehicle.brand">
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

            <b-form-select  v-model="vehicle.type">
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


            <b-form-select  v-model="vehicle.model">
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

            <b-form-select  v-model="vehicle.specialFunction">
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



            <b-form-select  v-model="vehicle.vehicleAction">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
              <option v-for="option in respdata.vehicleActionResp" :value="option.id" :key="option.id">
                {{ option.value }}
              </option>
            </b-form-select>


          </b-form-group>
        </b-row>


        <p></p>
        <div style="text-align: right">
          <b-button v-if="operations" @click="submitvehicule()" variant="outline-success" style="margin-right: 15px">
            {{$t('ajouter')}}</b-button>
          <b-button v-if="!operations"  @click="submiteditvehicule()" variant="outline-success" style="margin-right: 15px">
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
        <b-row>
          <div class="col-md-12">

            <vue-upload-multiple-image
                dragText="Image des accidentés"
                browseText=""
                primaryText=""
                dropText=""
                @upload-success="fileAddedPersons"
                @before-remove="fileRemovedPersons"
                :data-images="person.images"
                idUpload="myIdUpload2"
            ></vue-upload-multiple-image>


          </div>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-12 mb-30"
                         :label="$t('véhicules concerné')"
                         label-for="input-1"
          >


            <b-form-select @change="getSelectedItem" v-model="person.vehicleAccidentNumber">
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

            <b-form-input

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
                v-model="person.vehicleLinkedPedestrian"
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
            <date-picker v-model="person.birthDate" valueType="DD/MM/YYYY" ></date-picker>



          </b-form-group>
          <b-form-group  style="margin-bottom: 10px"
                         class="col-md-6 mb-30"
                         :label="$t('Genre')"
                         label-for="input-1"
          >

            <b-form-select  v-model="person.gender">
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

            <b-form-select  v-model="person.roadType">
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

            <b-form-select  v-model="person.personAction">
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

            <b-form-select  v-model="person.alcoholConsumption">
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

            <b-form-select  v-model="person.drugUse">
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

            <b-form-select  v-model="person.range">
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

            <b-form-select  v-model="person.place">
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

            <b-form-select  v-model="person.wearingHelmet">
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

            <b-form-select  v-model="person.occupantRestraintSystem">
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

            <b-form-select  v-model="person.testStatus">
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

            <b-form-select  v-model="person.testType">
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

            <b-form-select  v-model="person.testResult">
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

            <b-form-select  v-model="person.traumaSeverity">
              <option :value="null" >&#45;&#45; Please select an option &#45;&#45;</option>
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
                    @upload-success="fileAdded"
                    @before-remove="fileRemoved"
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
            <b-button class="card-title mb-0" @click="modalShown()" block href="#" v-b-toggle.accordion-1 variant="transparent">
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
                  <b-form-input disabled


                                v-model="data.longitude"
                                type="text"
                  ></b-form-input>

                </b-form-group>
                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('latitude')"
                    label-for="input-1"
                >
                  <b-form-input disabled

                                v-model="data.latitude"
                                type="text"
                  ></b-form-input>

                </b-form-group>
              </b-row>
              <l-map ref="myMap" style="height: 300px;width: 1104px" :zoom="zoom" :center="center" @click="addMarker">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker v-for="(marker, index) in markerLatLng" :lat-lng="marker" :key="marker"  @click="removeMarker(index)"></l-marker>

              </l-map>
            </b-card-body>
          </b-collapse>
        </b-card>

        <br/>

      </div>

      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1"  role="tab">
            <b-button class="card-title mb-0" block href="#" v-b-toggle.accordion-1 variant="transparent">
              {{$t('accident')}}</b-button>
          </b-card-header>

          <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>

                <DropZone
                    :maxFiles="Number(10000000000)"
                    url="http://localhost:5000/item"
                    :uploadOnDrop="true"
                    :multipleUpload="true"
                    :parallelUpload="3"
                    @addedFile="onFileAdd"
                />

                <b-form-group
                    class="col-md-6 mb-30"
                    :label="$t('Type Accident')"
                    label-for="input-1"
                >

                  <!--                  <b-form-input

                                                  v-model="data.accidentType"
                                                  type="text"
                                    ></b-form-input>-->
                  <b-form-select  v-model="data.accidentType">
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

                  <b-form-select  v-model="data.accidentSeverity">
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

                  <b-form-select  v-model="data.impactType">
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

                  <b-form-select  v-model="data.climaticCondition">
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

                  <b-form-select  v-model="data.brightnessCondition">
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

                  <b-form-select  v-model="data.city">
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

                  <b-form-select  v-model="data.municipality">
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
                    :label="$t('type de Route')"
                    label-for="input-1"
                >
                  <b-form-select  v-model="data.roadType">
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

                  <b-form-select  v-model="data.roadCategory">
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
                <b-form-select  v-model="data.roadState">
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


                  <b-form-select  v-model="data.roadIntersection">
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

                  <b-form-select  v-model="data.block">
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
                  <b-form-select  v-model="data.roadTrafficControl">
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
                  <b-form-select  v-model="data.virage">
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
                  <b-form-select  v-model="data.roadSlopSection">
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
                <b-button   v-if="seen==true"  @click ="addvehicules()"  variant="success"
                            style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                <b-button v-if="seen==false" @click ="retour()"  variant="success"
                          style="position: relative;right: 0;margin-right: 10px;">{{$t('retour')}}</b-button>
                <b-button v-if="seen==false" @click ="addocument()"  variant="success"
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
                <b-button  v-if="seen2==true" @click ="choose()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                <b-button  v-if="seen2==false" @click ="retour2()"  variant="primary"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('retour')}}</b-button>

                <b-button v-if="seen2==false" @click ="addocumentpersons()"  variant="success"
                          style="position: relative;right: 0;margin-right: 10px;">{{$t('add')}}</b-button>

                <b-button  v-if="rowe.length==1 && rowe[0].care==0" @click ="associer()"  variant="success"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('associer')}}</b-button>

                <b-button  v-if="rowe.length==1 && rowe[0].care!=0" @click ="desassocier()"  variant="danger"
                           style="position: relative;right: 0;margin-right: 10px;">{{$t('desassocier')}}</b-button>

                <b-col md="12">
                  <b-overlay :show="loadanotherpage" rounded="sm" >

                    <ListTable :type="'soins'" :rows="persons" :columns="columnoins" @onEditClick="onEditClick" @onRowclick="onRowclick" :isCLoseMenu="true"
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
                 style="float: right">{{$t('Soumettre')}}</b-button>



    </b-form>

  </b-overlay>

</template>

<script>

import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import constants from '../../../plugins/constants'
import ListTable from '../components/List-table2'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

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
    ListTable,DatePicker,VueTimepicker,vueMultiSelect,VueUploadMultipleImage
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
      documents:[],
      documents1:[],
      document:{},
      document1:{},
    images:[],
    images1:[],
      images2:[],
      images3:[],
      images4:[],
      images5:[],

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
      options: {
        multi: true,
        groups: false,
      },
      rowe:{},
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
      respdata:{},
      data:{},
      vehicle:{},
      vehicles:[],
      person:{},
      persons:[],
      valeur:'',
      valeur1:{},
      filteredSuggestions:[],
      types:"",
      optionsKey:"nom",
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
    ...mapGetters(["GETLISTDATA","GETADDACCIDENT","GETDETAILACCIDENT"]),
    someComputed() {
      return `firstName lastName`;
    }
  },
  methods:{

    getidbycode(liste,code){

      return liste.map(function(item) { return item.code; }).indexOf(code);
    },

    submiteditdocumentvehicule(){

      this.operations=false

      this.$bvModal.hide('opendocument')

      this.documents.splice(this.checkdocument(this.documents,this.document.identification), 1,  this.document)

      this.document={}
      this.makeToast(this.$t('added'),1)

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

    getdate: function() {
      const today = new Date();
      let day = today.getDate()<10?'0'+today.getDate():today.getDate() ;
      let month = today.getMonth()<10?'0'+today.getMonth():today.getMonth() ;
      const date = day+'/'+month+'/'+today.getFullYear() ;

      const time = today.getHours() + ":" + today.getMinutes() ;//+ ":" + today.getSeconds();
      console.log('date',date +' '+ time)
      return date +' '+ time;
      //this.timestamp = dateTime;
    },
    choose(){
      this.$bvModal.show('choose')
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
    addperson(value){

      this.intelligenceformperson(value)
      this.$bvModal.hide('choose')
      this.$bvModal.show('openperson')
      this.operations=true
      this.person.personAccidentNumber = this.persons.length + 1
      this.person.vehicleLinkedPedestrian = 1
    },

    ...mapActions(["addpolice","ListData","DetailsAccident"]),
    modalShown() {
      setTimeout(() => {
        console.log('clear')
        //mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();

      }, 100);
    },
    getSelectedItem(params){
      this.person.vehicleLinkedPedestrian = params

      console.log('paf',params)
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
              //this.imagevehicles.push(list.data.data)
              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.vehicle.vehicleImages.push(objet)

              // this.vehicle.vehicleImages.push(list.data.data.name)

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
              //this.imagepersons.push(list.data.data)

              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.person.images.push(objet)
              //this.person.images.push(list.data.data.name)

              this.images4.push(list.data.data)
              this.images5.push(list.data.data.name)

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
    onFileAdd(files){

      console.log('files122',files)
    },
    fileRemovedVehicles(index, done, fileList) {


      console.log('data', (index), done, fileList)
      console.log('data', this.vehicle.vehicleImages[index].path)
      let size = this.vehicle.vehicleImages[index].path + ''
      let sizes = size.split('/')


      /* let formdata = new FormData();
       formdata.append('name',(sizes)[sizes.length-1])
       formdata.append('vehicleId',this.vehicle.id)*/



      let send={}
      send.name = (sizes)[sizes.length-1]
      send.id = this.vehicle.id

      axios.post(constants.resource_url+'accidents/delete-vehicle-image',send,
          {
            headers: {
              'Content-Type': 'application/json'
            }}
      )
          .then(list => {

            if(list.data.success){
              this.vehicle.vehicleImages.splice(index, 1);

              this.makeToast(this.$t('Image supprime avec success'),1)

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
    fileRemovedPersons(index, done, fileList) {

      console.log('data', (index), done, fileList)
      //console.log('data', this.vehicle.vehicleImages[index].path)

      let size = this.person.images[index].path + ''
      let sizes = size.split('/')


      /*let formdata = new FormData();
      formdata.append('name',(sizes)[sizes.length-1])
      formdata.append('personId',this.person.id)*/


      let send={}
      send.name = (sizes)[sizes.length-1]
      send.id = this.person.id


      axios.post(constants.resource_url+'accidents/delete-person-image',send,
          {
            headers: {
              'Content-Type': 'application/json'
            }}
      )
          .then(list => {

            if(list.data.success){

              this.person.images.splice(index,1)

              this.makeToast(this.$t('Image supprime avec success'),1)

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
              //
              /* this.images.push(list.data.data)

               this.images1.push(list.data.data.name)*/

              let objet={}
              objet.path = list.data.data.path
              objet.name = list.data.data.name
              this.images.push(objet)

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

    addelements(value) {

      console.log('selected2', value)
      console.log('selected2', this.valeur)
      this.openb = true

      let soin = {
        careId: this.valeur1.item.id,
        personAccidentId: this.rowe[0].id
      };

      axios.post(constants.resource_url+'accidents/join-person-accident', soin)
          .then(response =>{

            if(response.data.success){

              this.valeur=''
              this.rowe[0].care=1

              this.makeToast(this.$t('added'),1)
              console.log('products_error',response);
              this.$bvModal.hide('openassociate')
            }else{
              if(response.data.status=='202'){
                this.makeToast('ce dossier patient a déja été associé a un accidenté', 0)
              }else {
                this.makeToast(this.$t('error'), 0)
              }
            }
            this.openb = false

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

      /*let soin = {
        care: this.folder_id,
        item: this.valeur1.item.id
      };*/
    },

    timechoose(data){
      console.log('data',data)
    },
   /* addperson(){
      this.$bvModal.show('openperson')
    },*/
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
    submitall(){

      this.show=true
      console.log("vehicles",this.rowes.id)


      //if(data.accidentTime)
      //this.data.accidentTime = this.accidentTime.hh +":"+ this.accidentTime.mm
      this.data.road = 0
      //this.$set(this.data, 'id', this.rowes.id);
      this.data.vehicules = this.vehicles
      this.data.persons = this.persons

      this.data.crashImages = this.images

      this.data.id = this.rowes.id
      console.log("vehicles",this.data)

      let formdata = new FormData();

      formdata.append('accidentReq',JSON.stringify(this.data))

      this.addpolice(formdata)

    },
    submitperson(){

      //console.log("this.vehicles",this.person.vehicleAccidentNumber)
      //console.log("this.vehicles",this.person.vehicleAccidentNumber==null)
      //return;

      this.operations=true
      this.$bvModal.hide('openperson')
      this.person.id=0
      this.person.care=0
      this.persons.push(this.person)
      console.log("this.vehicles",this.persons)


      this.person={}
      this.makeToast(this.$t('added'),1)
    },
    submiteditperson(){
      this.operations=false

      this.$bvModal.hide('openvehicule')

      this.persons.splice(this.checkId(this.persons,this.person.id), 1,  this.person)

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
    submiteditdocumentperson(){
      this.operations=false

      this.$bvModal.hide('opendocumentperson')

      this.documents1.splice(this.checkdocument(this.documents1,this.document1.identification), 1,  this.document1)

      this.document1={}
      this.makeToast(this.$t('added'),1)
    },
    submiteditvehicule(){

      this.$bvModal.hide('openvehicule')
      //this.vehicle.vehicleId = 0
      //this.vehicles.push(this.vehicle)
      console.log("this.vehicles",this.vehicles)

      this.vehicles.splice(this.checkId(this.vehicles,this.vehicle.id), 1,  this.vehicle)

      this.vehicle={}
      this.makeToast(this.$t('added'),1)


    },
    checkId(obj, id) {

      return obj.map(function(item) { return item.id; }).indexOf(id);

    },
    selected(value){
      this.filteredSuggestions = []
      this.valeur = value.item.nom+' '+value.item.prenom
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


    suggestionon(value) {
      this.openb = true

      console.log('suggestionon', value)
      //this.openb = true
      let params = {};
      params["name"] = value

      axios.get(constants.resource_url+'cares/search', {params})
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

    },
    savechange(data) {

      console.log('savechange', data);
    },

    onEditClick(params){

      console.log('savechange', params);


      switch(params.types) {
        case 'examen':
          this.vehicle = params
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

    removelist(contact,indexIds){
      contact.splice(indexIds, 1);
      contact.sort();
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
    associer(){

      this.$bvModal.show('openassociate')
    },
    desassocier(){

      // this.$bvModal.show('openassociate')
      this.loadanotherpage = true

      let soin = {
        careId: this.rowe.care,
        personAccidentId: this.rowe[0].id
      };

      axios.post(constants.resource_url+'accidents/unjoin-person-accident', soin)
          .then(response =>{

            if(response.data.success){

              //  this.valeur=''
              this.rowe[0].care=0
              this.loadanotherpage = false

              this.makeToast(this.$t('desassocier avec success'),1)
              console.log('products_error',response);
              //this.$bvModal.hide('openassociate')
            }else{
              this.makeToast(this.$t('error'),0)
            }
            this.openb = false

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
    },
    clickRow(value){

      this.rowe=value
      console.log('loadpage',this.rowe)

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

      data.crashImages.map(function(value) {
        this.images1.push(value.name)
      });

      data.vehicules.vehicleImages.map(function(value) {
        this.images3.push(value.name)
      });

      data.person.images.map(function(value) {
        this.images5.push(value.name)
      });



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