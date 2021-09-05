import { Container } from "typedi";
import { Router } from "express";
import { check } from "express-validator";

import { CommonMiddlwares } from "../../../../../shared/middlewares/common-middlewares";
import { validateFields } from "../../../../../shared/middlewares/validate-fields";
import { ProductController } from "./product.controller";

const coommonMiddlewares = Container.get(CommonMiddlwares);
const productController = Container.get(ProductController);

const router = Router();

router.post(
  "/:hotelId",
  [
    coommonMiddlewares.validateJWT,
    check("code", "code is required").not().isEmpty(),
    check("name", "name is required").not().isEmpty(),
    check("brand", "brand is required").not().isEmpty(),
    //check('details', 'details is required').not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    validateFields,
  ],
  productController.createProduct
);

router.get(
  "/:hotelId",
  [coommonMiddlewares.validateJWT, validateFields],
  productController.getProducts
);

router.put(
  "/:hotelId/:productId",
  [
    coommonMiddlewares.validateJWT,
    check("code", "code is required").not().isEmpty(),
    check("name", "name is required").not().isEmpty(),
    check("brand", "brand is required").not().isEmpty(),
    //check('details', 'details is required').not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    validateFields,
  ],
  productController.updateProduct
);

router.delete(
  "/:hotelId/:productId",
  [coommonMiddlewares.validateJWT, validateFields],
  productController.removeProduct
);

export default router;
