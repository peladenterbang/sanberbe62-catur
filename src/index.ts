import express from "express";
import router from "./router/api";
import bodyParser from "body-parser";
import db from "./utils/database";
import docs from "./docs/route";

const app = express();
const port = 3000;


async function init(){
    try {
        db();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        
        app.use("/api",router);
        docs(app);
        
        app.listen(port, () => {
            console.log(`server start on port ${port}`);
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log(err)
    }
}

init();