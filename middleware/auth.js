const jwt =require("jsonwebtoken");


module.exports=(req,res,next)=>{
     try{
       const token= req.headers.authorization.plit(" ")[1];
       const decodeToken=jwt.verify(token,"RANDOM_TOKEN_SECRE");
       const userId=decodeToken.userId;

    req.auth={ userId }
      



     }catch(error){

        res.status(401).json({error})

     }

}