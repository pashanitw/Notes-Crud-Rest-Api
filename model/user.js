var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var NoteCollectionSchema=new Schema({
    id:String,
    createdAt:Date,
    updatedAt:Date
});
var UserSchema=new Schema({
    name:String,
    email:String,
    userName:String,
    noteCollection:[NoteCollectionSchema]
});
exports.UserModel=mongoose.model("UserModel",UserSchema);
exports.NoteCollectionModel=mongoose.model("NoteCollectionModel",NoteCollectionSchema);