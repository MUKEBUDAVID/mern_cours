const express=require("express");
const useCtrl=require("../controllers/User");
const   router=express.Router();



router.post("/signup",useCtrl.signUp);
router.post("/login",useCtrl.login);






module.exports=router;