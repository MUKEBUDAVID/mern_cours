const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
exports.signUp=(req,res)=>{

 bcrypt.hash(req.body.password,10)
  .then((hash)=>{
  
    console.log(hash)

    const user=new User({
        email:req.body.email,
        passWord:hash
    })

    user.save() 
    .then(()=> res.status(201).json({message:"utilisateur cree !"}))
    .catch((error)=> res.status(400).json({ error: "Erreur lors de la sauvegarde : " + error.message }))


   })
  .catch((error)=> res.status(500).json({ error: "Erreur de hachage : " + error.message }))

}







exports.login = async (req, res) => {
  try {
    // 1. Recherche de l'utilisateur
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" });
    }

    // 2. Vérification du mot de passe
    const valid = await bcrypt.compare(req.body.password, user.passWord);
    
    if (!valid) {
      return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" });
    }

    // 3. Réponse en cas de succès
    res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        {userId: user._id},
        "RANDOM_TOKEN_SECRE",
        { expiresIn: '24h' }
      ) // Vous devriez générer un vrai token JWT ici
    });



  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};