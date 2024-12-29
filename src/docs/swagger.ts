import swaggerAutogen from "swagger-autogen";
import { Express } from "express";


const doc = {
    info: {
      version: "v0.0.1",
      title: "Dokumentasi API Sanbercode 62",
      description: "Dokumentasi API Sanbercode Tugas Final",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      authSchemas: {
        LoginRequest: {
          email: "joni2024@yopmail.com",
          password: "123412341",
        },
        RegisterRequest: {
          fullName: "joni joni",
          username: "joni2024",
          email: "joni2024@yopmail.com",
          password: "123412341",
          confirmPassword: "123412341",
        },
        UpdateProfileRequest: {
          fullName: "joni joni",
          username: "joni2024",
          email: "joni2024@yopmail.com",
          password: "123412341",
          confirmPassword: "123412341",
        },
      },
      productSchemas:{
        
      }
    },
  };


const outputFile = "./swagger_output.json";
const endpointsFiles = ["../router/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);