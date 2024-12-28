import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import fs from "fs";
import path from "path";


const css = fs.readFileSync(
    path.resolve(
      __dirname,
      "./public/swagger-ui.css"
    ),
    "utf-8"
  );

export default function docs(app: Express) {
    app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerOutput, {
          customCss: css,
        })
    );
}