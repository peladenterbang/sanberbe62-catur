import express from "express";
import authController from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import productController from "../controller/product.controller";
import categoryController from "../controller/category.controller";
import orderController from "../controller/order.controller";
import orderDetailController from "../controller/orderDetail.controller";

const router = express.Router();

// auth router
router.post("/auth/register", authController.register)
router.post("/auth/login", authController.login)
router.get("/auth/my-profile",authMiddleware,authController.myProfile)
router.put("/auth/edit-profile",authMiddleware,authController.updateProfile)
router.delete("/auth/delete-profile",authMiddleware,authController.deleteUser)

// product router
router.post("/product",productController.create)
router.get("/products", productController.getProducts)
router.get("/product",productController.getProductByID)
router.put("/product", productController.updateProduct)
router.delete("/product", productController.deleteProduct)

// category router
router.get("/categories",categoryController.getAll)
router.post("/category",categoryController.create)
router.delete("/category",categoryController.delete)

// order 
router.get("/order",authMiddleware, orderController.getMyOrder)
router.post("/order", authMiddleware, orderController.create)
router.put("/order",authMiddleware,orderController.update)
router.delete("/order", authMiddleware, orderController.remove)



export default router;