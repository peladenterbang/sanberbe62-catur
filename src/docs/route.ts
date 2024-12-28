import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import fs from "fs";
import path from "path";

export default function docs(app: Express) {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerOutput, {
          customCss: css,
        })
      );
}

const css = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../node_modules/swagger-ui-dist/swagger-ui.css"
    ),
    "utf-8"
  );