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
      schemas: {
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
        CreateProductRequest: {
          productName: "Banteng",
          description: "PDIP Banteng",
          price : 100000,
          qty : 100,
          categoryId : "677055db62c0eb72eb8eaceb"
        },
        getOneProduct: {
          _id: "676ca003e371709d06cf67c4"
        },
        UpdateProductRequest : {
          _id: "676ca003e371709d06cf67c4",
          productName: "kacang biru",
          description: "kacang hijau bermutu",
          price : 15000,
          qty : 10,
          categoryId: "676c9ee46bd92298f91a2556"
        },
        CreateCategoryRequest:{
          categoryName: "buku"
        },
        CreateOrderRequest: {
            grandTotal: 1,
            orderItems: [
              {
                name: "Lenovo",
                productId: "6770565f62c0eb72eb8eacf5",
                price: 20000000,
                quantity: 3
              }
            ],
            status: "completed"
        },
      },
    },
  };


const outputFile = "./swagger_output.json";
const endpointsFiles = ["../router/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);