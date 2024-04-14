export const createUserValidationSchema = {
    username  : {
        isLength : {
            options :{
                min : 5,
                max : 32
            },
            errorMessage : "Username must be at least 5 char and max 32 char"
        },

        isString : {
            errorMessage : "Enter a valid String"
        },
        notEmpty : {
            errorMessage : "Username cant be empty"
        }
    },


    filter : {
        notEmpty: "Please  provide filter type",
        isString : "Please enter valid string values",

    }



}