var express=require("express");
var router=express.Router();
var notesModel=require('../model/notes');
var objectAssign=require('object-assign');
var userModel=require('../model/user').UserModel;
var noteCollectionModel=require('../model/user').NoteCollectionModel;

router.get('/:id',function(req,res){
    var response;
    notesModel.findById(req.params.id,function(err,data){
        if(err){
            response= {error:true,message:"not found"}
        }else{
            response={error:false,data:data}
        }
        return res.json(response)
    })
});
router.get('/',function(req,res){
    var response;
    notesModel.find({},function(err,data){
        if(err){
            response= {error:true,message:"not found"}
        }else{
            response={error:false,data:data}
        }
        return res.json(response)
    })
});


router.post('/',function(req,res){
    var response;
    var notes=new notesModel(
    {
        title:req.body.title,
        favourite:req.body.favourite,
        data:req.body.data,
        author:"pasha"
    }
);

    notes.save(function(err,data){
        if(err){
         response={error:true,message:"error in saving"}
        }else{
            var noteCollection=new noteCollectionModel({
                id:data._id,
                createdAt:data.createdAt,
                updatedAt:data.updatedAt
            });
            userModel.findById("56ab4ea772e529000c83a8b6",function(err,user){
                user.noteCollection.push(noteCollection)
                user.save(function(err){
                    response={error:false,message:"saved success"}
                    return res.json(response);
                })
            });
        }

    })
});
router.put('/:id',function(req,res){
    var id=req.params.id;
    var response;
    notesModel.findById(id,function(err,data){
        if(err){
            response={error:true,message:"unable to edit"}
        }else{
            data=objectAssign(data,req.body);
            data.save(function(err){
                if(err){
                    response={error:true,message:"unable to edit"}
                }else{
                    response={error:false,message:"done editing"}
                }
                return res.json(response);
            })
        }
    })
});

router.delete('/',function(req,res){
    var response;
    notesModel.remove({},function(err){
        if(err){
            response={error:true,message:"unable to edit"}
        }else{
            response={error:false,message:"All Deleted"}
        }
        return res.json(response);
    })
});
router.delete('/:id',function(req,res){
    var response;
    notesModel.remove(req.params.id,function(err){
        if(err){
            response={error:true,message:"unable to delete"}
        }else{
            response={error:false,message:"Deleted Note"}
        }
        return res.json(response)
    })
});
module.exports=router;
