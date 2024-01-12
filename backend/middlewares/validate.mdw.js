// import { validationResult } from "express-validator";

// const Validate = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         let error = {};
//         errors.array().map((err) => (error[err.param] = err.msg));
//         return res.status(422).json({ error });
//     }
//     next();
// };
// export default Validate;


import Ajv from "ajv";


export default function (schema) {
    return function validate(req,res,next){
        const ajv = new Ajv()
        const valid = ajv.validate(schema, req.body)
        if(!valid){
            console.log(ajv.errors);
            return res.status(400).json(ajv.errors)
        }
        next();
    }
}