const Thing =require("../models/Thing.js")



 exports.getAllStuff=(req,res)=>{
 
  Thing.find()
  .then(((things)=>{ res.status(200).json(things ) }))
  .catch((error)=>{ res.status(400).json({error})})
 
    
 
 };


 exports.getOneThin=(req,res)=>{
 
 
  Thing.findOne({_id: req.params.id})
  .then(((thing)=>{ res.status(200).json(thing ) }))
  .catch((error)=>{ res.status(404).json({error})})
 
    
 
 };



exports.createThing=(req,res)=>{


  /// on supprime id pour utilise celui de la bd
  delete req.body._id;

  const thing=new Thing({
    ...req.body
  })

  thing.save().then(()=>{

    res.status(201).json({message:"objet cree"})
  }).catch((error)=>{ res.status(400).json({error})})


}

exports.modifyThing=(req,res)=>{

Thing.updateOne({_id:req.params.id},{...req.body,_id: req.params.id})
.then(()=> res.status(200).json({message:"objet modifier !"}))
.catch((error)=> res.status(400).json({error}))
 

}


exports.deleteThing =(req,res)=>{

  Thing.deleteOne({_id:req.params.id})
.then(()=> res.status(200).json({message:"objet supprime !"}))
.catch((error)=> res.status(400).json({error}))
}