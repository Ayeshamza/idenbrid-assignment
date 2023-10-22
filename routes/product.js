const {
  updateProduct,
  deleteProduct,
  addProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product.controller");
const imageUpload = require("../middlewares/image.middleware");

const router = require("express").Router();

router.post("/", imageUpload.array("image"), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.patch("/:id", imageUpload.array("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
