const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMonngoose=require('passport-local-mongoose');


const user=new Schema({

    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    profile:{
        type:String,
        default:'https://res.cloudinary.com/dofftzsmf/image/upload/v1685886734/UserProfile/Social_Media_Chatting_Online_Blank_Profile_Picture_Head_And_Body_Icon_People_Standing_Icon_Grey_Background_generated_fa3o0b.jpg',
    },
    username:{
        type:String,
        default:"NONE",
        unique:true
        
    },
    followedColleges:[],
    createdColleges:[]
},{
    timestamps: true
})

user.plugin(passportLocalMonngoose);

module.exports=mongoose.model('user',user);