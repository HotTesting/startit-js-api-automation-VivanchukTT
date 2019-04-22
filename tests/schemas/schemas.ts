export class Schemas {

     loginSchema = {
        type: "object",
        properties: {
            token: {
                type: "string"
            },
            tokenExpires: {
                type: "string"
            },
            id: {
                type: "string"
            }
        }
    };

        boardSchema = {
            type: "object",
            properties:{
               _id: {
                type: "string"
            },
                defaultSwimlaneId: {
                type: "string"
            }
        }
    };
        swimSchema = {
            type: "object",
            properties:{
            _id: {
                type: "string"
            }
        }
    };  
        listSchema = {
            type: "object",
            properties:{
            _id: {
                type: "string"
            }
        }
        };
        cardSchema = {
            type: "object",
            properties:{
            _id: {
                type: "string"
            }
        }
    };
        cardsSchema = {
            type: "array",
            properties:{
            _id: {
                type: "string"
            },
            title: {
                type: "string"
            },
            description: {
                type: "string"
            },
            listId: {
                type: "string"
            }
        }
    };
        listsSchema = {
            type: "array",
            properties:{
            _id: {
                type: "string"
            },
            title: {
                type: "string"
            }
        }
    }; 
        boardsSchema = {
            type: "array",
            properties:{
            _id: {
                type: "string"
            },
            title: {
                type: "string"
            }
        }
        };
}