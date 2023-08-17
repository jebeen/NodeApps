const express = require('express');
const router = express.Router()
const {
  loadIndex,
  getLogin,
  handleForm,
  getProducts,
  fetchProducts,
  uploadImage,
  processForm } = require('../controllers/controller');

const validationRule1= require('../middlewares/user-validation-rule');

router.get('/', loadIndex);
router.get("/login", getLogin);
router.post("/handleForm", handleForm);
router.get("/products", getProducts);
router.get("/getproducts", fetchProducts);
router.post("/upload", uploadImage);
router.post("/process-form", validationRule1.rules, processForm);

module.exports = router;
