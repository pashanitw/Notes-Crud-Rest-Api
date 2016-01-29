var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var NotesSchema=new Schema({
  title:{type:String,default:"No Title"},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    favourite:{type:Boolean,default:false},
    data:String,
    shared:[String],
    author:String
});
NotesSchema.pre('save',function(next){
   this.updatedAt=new Date();
    next()
});
module.exports=mongoose.model("NotesModel",NotesSchema);
