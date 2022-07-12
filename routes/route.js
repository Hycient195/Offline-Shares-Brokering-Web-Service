const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/", controller.list_shares)

router.post("/purchase_share", controller.purchase_share);

router.post("/sell_share", controller.sell_share);

router.get("/find_on", controller.find_share_on_crieterion);

router.get("/find_highest_share_price", controller.find_highest_share_price);

router.get("/find_lowest_share_price", controller.find_lowest_share_price);

router.get("/find_shares_in_range", controller.find_shares_in_range);

module.exports = router;
