var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/demoDb");
var Schema =   mongoose.Schema;
var UserSchema=new Schema({
    "userEmail":String,
    "password":String
});
module.exports=mongoose.model("userLogin",UserSchema);
