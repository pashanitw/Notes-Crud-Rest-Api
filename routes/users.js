var express = require('express');
var router = express.Router();
var userModel=require('../model/user').UserModel;
var NoteCollectionModel=require('../model/user').NoteCollectionModel;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var response={};
    userModel.find({},function(err,data){
        if(err){
            response={"error":true,message:"Error in fetching data"}
        }else{
            response={"error":false,message:data};
            console.log("data is",data);
        }
        res.json(response)
    })
});

router.post('/',function(req,res){
    var user=new userModel({
       name:req.body.name,
       email:req.body.email,
       userName:req.body.userName
   });
    var response={};
    user.save(function(err,data){
        if(err){
            response={"error":true,message:"error in saving database"}
        } else{
            console.log("data is",data);
            response={"error":false,message:"Data added"}

        }
        return res.json(response)
    });
});
router.get('/:id',function(req,res){
    var response={};
    userModel.findById(req.params.id,function(err,data){
        if(err){
            response={error:true,message:"error in fetching data"}
        }else{
            response={error:false,message:data}
            console.log("data is",data)
        }
        return res.json(response)
    })
});
router.put('/:id',function(req,res){
    var response={};
    userModel.findById(req.params.id,function(err,data){
        data.userEmail=req.body.userEmail;
        data.password=req.body.password;
        data.save(function(err,data){
            if(err){
                response={error:true,message:"error in editing"}
            }else{
                response={error:false,message:"data modified"}
            }
            res.json(response)
        })
    })
});
router.delete('/:id',function(req,res){
    var response={};
   userModel.findById(req.params.id,function(err,data){
       if(err){
           response={error:true,message:"error in finding"}
       }
       userModel.remove(req.params.id,function(err){
           if(err){
               response={error:true,message:"error in finding"}
           }else{
               response={error:false,message:"deleted entry"}
           }
           res.json(response)
       })
   })
});

router.delete('/',function(req,res){
userModel.remove({},function(err){
    var response={}
    if(err){
        response={error:true,message:"error in deleting"}
    }else{
        response={error:false,message:"All deleted"}
    }
    res.json(response)
})
});

module.exports = router;
