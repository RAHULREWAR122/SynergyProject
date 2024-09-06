import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function UserDetails({users}) {
   // i use here useLocation hook to get data from previous page
    const location = useLocation();
   //  get data 
    const  data = location.state || {};
    const navigate = useNavigate();
   //  i take users data as props to find details and match id  
    const findUserDetails = users.find((u)=>u.id === data.id)
   
    //here i check if findUserDetails is not present or data id is not available which we take from as a state of previous page    
    useEffect(()=>{
       if(!findUserDetails && !data.id){
         // if findUserDetails && data.id is not available then send user to "/" page
         navigate("/")   
       }  
    },[data, findUserDetails])
    

   //  return JSX
  return (<>
       <button onClick={()=>navigate(-1)} className='px-4 py-2 bg-green-500 text-white rounded-lg'>Back</button>
    <div className='h-full w-full md:py-6 md:px-10 p-2 flex justify-center items-center'>
      <div className='border shadow-lg hover:shadow-2xl transition-all duration-200 h-full w-[300px] p-4 flex flex-col justify-between gap-2'>
             <h2>name : {data?.name}</h2>
             <p>Email : {data?.email}</p>
             <p>Mobile : {data?.phone}</p>
             <p>Website : {data?.website}</p>
             
             <div>
             <h3 className='underline'>Address</h3>
             <p>City : {data?.address?.city}</p>
             <p>Street : {data?.address?.street}</p>
             <p>ZipCode : {data?.address?.zipcode}</p>
            </div>
             
             <div>
             <h3 className='underline'>Company</h3>
             <p>City : {data?.company?.name}</p>
             <p>CatchPhrase : {data?.company?.catchPhrase}</p>
            </div>

        </div>
         
    </div>
    </> )
}

export default UserDetails