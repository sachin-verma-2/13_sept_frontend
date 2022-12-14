// import React, { Component, useEffect, useState } from "react";
// import axios from "axios";
// import AdminNav from "./AdminNav";
// import './Employee.css'
// import { fetchApplicants } from "../../../Store/applicantSlice";
// import { useDispatch, useSelector } from "react-redux";
// import FileDownload from "js-file-download"
// import { add } from '../../../Store/employeeSlice'
// import { removeApplicant } from "../../../Store/applicantSlice";

// function ViewJobApplicant() {
  
//   const dispatch = useDispatch();
//   const { data: Applicant, status } = useSelector((state) => state.applicants);
//   const [app, setApp] = useState(Applicant)
//   // useEffect(() => {
//   //   dispatch(fetchApplicants());
//   // }, [])
//   const handleJobs=(e)=>{
//     // e.preventDefault();
//     dispatch(fetchApplicants());
//     setApp(Applicant)
//   }
//   const handleShortlist = (id) => {
//     // e.preventDefault();
//     alert("mail sent to id " + id)
//     console.log("shortlist button clicked");
//   }
//   const handleReject = (id) => {
//     // e.preventDefault();
//     alert(id + " is Rejected")
//     // dispatch(removeApplicant(id))
//     const newData= app.filter((item)=>item._id!==id)
//     setApp(newData)
//   }
//   const handleResume = (e) => {
//     e.preventDefault()
//     axios('http://localhost:9000/download', {
//       method: "GET",
//       responseType: "blob",
//     })
//       .then((response) => {
//         FileDownload(response.data, "Resume.pdf")
//       })
//       .catch((error) => {
//         console.log(error);

//       });

//   };
//   const handleAccept = (id) => {
//     alert(id._id + " is Accepted");
//     dispatch(add(id))
//   };
//   // if (status === STATUSES.LOADING){
//   //   return <h2>LOADING....</h2>
//   // }
//   return (
//     <div>
//       <AdminNav />
//       <h1>Applications</h1>
//       <button className="btn btn-success" onClick={(e)=>handleJobs(e)}>All My Jobs</button>
//       {
//         app.map((item) => (
//           <div className=' shadow-lg mb-3 col mx-3 my-1 p-2 d-flex gap-1'>
//             <div className='col-3 bg-info'>
//               <img style={{ width: '83%', height: "82%" }} className='my-4 align-items-center rounded-circle' src="https://www.gstatic.com/webp/gallery/1.sm.jpg" alt="image not found"></img>
//             </div>
//             <div className='col-6 bg-warning'>
//               <h1 className='d-flex m-1 p-1'>Name: {item.title}</h1>
//               <h2 className='d-flex m-1 p-1'>Phone:{item.maxApplicants}</h2>
//               <h2 className='d-flex m-1 p-1'>Email:{item.maxPositions}</h2>
//               <h2 className='d-flex m-1 p-1'>Job: {item.duration}</h2>
//             </div>
//             <div className='col-3 bg-dark'>
//               <button onClick={(e) => handleResume(e)} style={{ width: '90%', height: '20%' }} className='my-2 p-3 btn btn-primary'>Download Resume</button>
//               <div className='h-50'>
//                 <button onClick={() => handleShortlist(item._id)} style={{ width: '45%', height: '80%' }} className='my-2 mx-1 p-3 btn btn-warning'>Shortlist</button>
//                 <button onClick={() => handleReject(item._id)} style={{ width: '45%', height: '80%' }} className='my-2 mx-1 p-3 btn btn-danger'>Reject</button>
//               </div>
//               <button onClick={() => handleAccept(item)} style={{ width: '90%', height: '20%' }} className='my-2 p-3 btn btn-success'>Accept</button>
//             </div>
//           </div>
//         ))
//       }
//     </div>
//   )
// }


// export default ViewJobApplicant;



import React, { Component, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import { apiPath } from "../utils/Consts";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import * as ReactBootstrap from 'react-bootstrap'
import './Employee.css'
import  FileDownload  from "js-file-download"
import { useEffect } from "react";
import { fetchApplicants } from "../../../Store/applicantSlice";


 import { add } from '../../../Store/employeeSlice'
 import { removeApplicant } from "../../../Store/applicantSlice";

function ViewJobApplicant() {
  const Applicant=[{
  }]
  const [data,setdata]=useState([])
  console.log('hello everyone')
  const dispatch = useDispatch();
  const { data: status } = useSelector((state) => state.applicants);
 
  // useEffect(() => {
  //   dispatch(fetchApplicants());
  // }, [])

  const handleShortlist = (id) => {
    // e.preventDefault();
    alert("mail sent to id " + id)
    console.log("shortlist button clicked");
  }
  const handleReject = (id) => {
    // e.preventDefault();
    alert(id + " is Rejected")
    // dispatch(removeApplicant(id))
    const newData= data.filter((item)=>item._id!==id)
    setdata(newData)
  }
  useEffect(()=>
{
    axios.get('http://localhost:9000/apply/applicant').then((res)=>{
      setdata(res.data)
    console.log(res)}).catch((e)=>console.log(e))
},[])
  
  const handleResume = (e) => {
    e.preventDefault()
   axios('http://localhost:9000/download', {
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        FileDownload(response.data,"Resume.pdf")
      })
      .catch((error) => {
        console.log(error);
        
      });
  
      
};
const handleAccept = (id) => {
  alert(id._id + " is Accepted");
  dispatch(add(id))
  const newData= data.filter((item)=>item._id!==id._id)
  setdata(newData)
};
  return (
    <div className="back-image">
      {console.log(data)}
      <AdminNav />
      <h1 className='itemsHeader'>Applications</h1>

{
  data.map((item)=>(
    <div className=' shadow-lg mb-3 col mx-3 my-1 p-2 d-flex gap-1'>
           <div className='col-3 bg-info'>
              <img style={{ width: '83%', height: "82%" }} className='my-4 align-items-center rounded-circle' src="data:image/jpeg;base64,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" alt="image not found"></img>
            </div>
            <div className='col-6 employee-div'>
            <h1 className='d-flex m-1 p-1'>Name: {item.name}</h1>
          <h1 className='d-flex m-1 p-1'>Title: {item.title}</h1>
          <h1 className='d-flex m-1 p-1'>Email: {item.email}</h1>
            </div>
            <div className='col-3 bg-dark'>
              <button onClick={(e) => handleResume(e)} style={{ width: '90%', height: '20%' }} className='my-2 p-3 btn btn-primary'>Download Resume</button>
              <div className='h-50'>
                <button onClick={() => handleShortlist(item._id)} style={{ width: '45%', height: '80%' }} className='my-2 mx-1 p-3 btn btn-warning'>Shortlist</button>
                <button onClick={() => handleReject(item._id)} style={{ width: '45%', height: '80%' }} className='my-2 mx-1 p-3 btn btn-danger'>Reject</button>
              </div>
              <button onClick={() => handleAccept(item)} style={{ width: '90%', height: '20%' }} className='my-2 p-3 btn btn-success'>Accept</button>
            </div>
          </div>
        ))
}
    </div>
  )
}


export default ViewJobApplicant;




