import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import schema from "./graphql/GraphQLSchema";
import dotenv from "dotenv";
import ValidationError from './graphql/ValidationError';

dotenv.config();

const app = express();

const PORT = process.env.PORT || "4000";
const db = process.env.MONGODB_URL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    autoIndex: true,
    useCreateIndex: true,
}

mongoose.connect(db, options).then(()=>{
    console.log("Connected to MongoDB");
}).catch(error => console.log(error));

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL( req => {
        return {
            schema,
            context: {
                user: req.user
            },
            graphiql: true,
            formatError: error => {
                if (error.originalError instanceof ValidationError) {
                    return {
                        message: error.mesage,
                        validationErrors: error.originalError && error.originalError.validationErrors,
                    }
                }
                return error
            }
        }
    })
)

app.listen(PORT, ()=> {
    console.log(`Server running at: ${PORT}`)
})