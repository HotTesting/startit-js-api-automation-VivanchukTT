    export const loginSchema = {
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
   