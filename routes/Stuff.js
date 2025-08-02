const express = require("express");
const stuffCtrl = require("../controllers/Stuff.js");
const auth= require("../middleware/auth.js")


const router=express.Router();


router.get("/",auth,stuffCtrl.getAllStuff);

router.get("/:id",auth,stuffCtrl.getOneThin);

router.post("/",auth,stuffCtrl.createThing);

router.put("/:id",auth,stuffCtrl.modifyThing);

router.delete("/:id",auth,stuffCtrl.createThing);

 
module.exports= router