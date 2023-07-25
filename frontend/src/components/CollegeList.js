import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { headers, token, url } from './MainComponent';
import SearchComp from './SearchComp';
import '../CSS/collegeList.css';
// import UploadImage from './UploadImage'


function CollegeList(props) {

    const [clickFollowColleges, setClickFollowColleges] = useState(false);
    const [clickCreatedColleges, setClickCreatedColleges] = useState(true);
    const [followedColleges, setFollowColleges] = useState();
    const [createdColleges, setCreatedColleges] = useState();
    const [user,SetUser]=useState();
    
    // const [clickCreatedColleges,]=useState(false);

    

    useEffect(() => {
        if(token)
        axios.get(`${url}users/followedcolleges`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((res) => {
                setFollowColleges(res.data);
                console.log(res.data)
                setClickFollowColleges(true);
                console.log(res.data)
            })
        axios.get(`${url}users/createdcolleges`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })

        .then((res) => {
            setCreatedColleges(res.data);
            console.log(res.data)
            setClickFollowColleges(true);
            console.log(res.data)
        })
        
        
        axios.get(`${url}users/checkJWTtoken`,{  headers: {'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token}})
        .then((res)=>{

            SetUser(res.data.user);

            // console.log(user)
        }).catch((err)=>console.log(err))
    }, [])



    function getFollowedColleges() {
        if (clickFollowColleges) {

            setClickCreatedColleges(false);

        }

    }

    function getCreatedColleges() {
        if (clickCreatedColleges) {

            setClickFollowColleges(false);

        }

    }
    function handleDelete(collegeId){
        
        axios.delete(`${url}college/${collegeId}`,{headers:headers})
        .then((res)=>{
            console.log(res.data);
            setCreatedColleges(res.data.createdColleges);
            setFollowColleges(res.data.followedColleges)
         })
        .catch((err)=>console.log(err))
        
    }


    return (
        <div style={{width:"100%",height:"100%",backgroundColor:"#DBE2E9"}}>
        <div >
            <div  className='container mt-5 p-0 h-70 \ searchContainer' style={{ backgroundColor: "#f8f9fa", borderRadius: "5px" ,border:'1px solid #000'}}>
                <Tabs defaultActiveKey="followed"
                 id="uncontrolled-tab-example" className="mb-3 nav-tabs">

                    <Tab eventKey="followed" onClick={() => { setClickFollowColleges(true); setClickCreatedColleges(false) }} title="Followed  Colleges">
                        {followedColleges != null && followedColleges != [] && followedColleges != "" && followedColleges?
                        <>
                        {user  && followedColleges.map(college => {


                            // <UploadImage/>
                            return (<div key={college}>
                            <SearchComp  user_id={user._id} 
                             Followed={user.createdColleges}
                             collegeId={college}
                              />
                            </div>)
                            // {console.log("      "+college)}

                        })
                        }</>
                        :
                        <h1 className='text-center 'style={{height:"300px",color:"gray", marginTop:"200px", fontWeight: "bold"}}>No Followed Colleges</h1>
                    }
                    </Tab>
                    <Tab  onClick={() => { setClickFollowColleges(false); setClickCreatedColleges(true)}} eventKey="Created" title="Created Colleges">
                    {createdColleges != null && createdColleges != [] && createdColleges!="" && createdColleges?
                        <>
                        {user && createdColleges.map(college => {
                            return <div key={college}>
                                <SearchComp  created={true} Followed={false} 
                                collegeId={college} handleDelete={handleDelete} />
                            </div>
                        })
                        }</>
                    :
                    <h1 className='text-center ' style={{height:"300px",color:"gray", marginTop:"200px"}}>No Created Colleges</h1>
                }
                    </Tab>

                </Tabs>

            </div>

        </div>
        </div>
    );
}

export default CollegeList;