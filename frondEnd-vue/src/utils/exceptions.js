export class ExceptionAPI extends Error {
    constructor(responseData) {
        super("Erreur API");
        this.data = responseData;
    }
}

export class ExceptionNoResponse extends Error {
    constructor(request) {
        super("Aucune réponse du serveur");
        this.request = request;
    }
}

export class ExceptionNoRequest extends Error {
    constructor(message) {
        super("Erreur dans la requête");
        this.message = message;
    }
}
