export default class Customer {
    /*firstName = null;
    lastName = "";
    categorie = "";
    type = "";
    reference = "";
    nom_client = "";
    date = "";
    statut = "";
    contactId = "";*/


    /*0 info
    1 success
    2 warning

    3 error
    4 critique*/
    constructor(contactId, categorie,type,reference,client,date,statut)
    {
        this._contactId = contactId;
        this._categorie = categorie;
        this._type = type;
        this._reference = reference;
        this._client = client;
        this._date = date;
        this._statut = statut;
    }

    get contactId() {
        return this._contactId;
    }

    set contactId(value) {
        this._contactId = value;
    }

    get categorie() {
        return this._categorie;
    }

    set categorie(value) {
        this._categorie = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get reference() {
        return this._reference;
    }

    set reference(value) {
        this._reference = value;
    }

    get client() {
        return this._client;
    }

    set client(value) {
        this._client = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get statut() {
        return this._statut;
    }

    set statut(value) {
        this._statut = value;
    }
}