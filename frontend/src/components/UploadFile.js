import React, { useState } from "react";
import '../CSS/uploadFile.css'
import { Input } from "reactstrap";
import { Button } from "reactstrap";
import axios from "axios";
// const img=require('./up2.png')

const Axios=axios.create();

function UploadFile({image,setImage,setUserName})
{
  
    const handleUserName=()=>{
        setUserName()
    }
    const handleImage=(event)=>
    {
        console.log(event.target.files[0]);
        // console.log(event);
        const file = event.target.files[0];
        const formData=new FormData();
        formData.append("file",file);
        formData.append("upload_preset","my-uploads")
        formData.append("API_SECRET", "N6vRi9M2b8Tfwsesw1CLLQzzeHA");
        Axios.post("https://api.cloudinary.com/v1_1/dofftzsmf/image/upload",formData)
        .then((res)=>{
            setImage(res.data.url);
        }).catch((err)=>console.log(err));
    }
    return (<>
    <div className="row mt-2" style={{height:"0%"}}>
       
        <div className="col-2" >
        </div>
        <div className="ml-3 col-2 col-md-6 col-sm-12 mainCotnainer mt-1" >
     
            <img src={image} height={"130vh"} width={"150vw"} style={{borderRadius:"100%",marginLeft:"4vw"}}/>
            <Input  className="mt-4 pr" type="file" onChange={(event)=>handleImage(event)}/>
            
        </div>
    </div>
    </>)
}
export default UploadFile;