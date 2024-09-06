import { useEffect, useState } from 'react';
import List from './Components/List/List';
import { fetchUsers } from './Api/api';
import Loader from './Components/Loader/Loader';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import UserDetails from './Components/Details/UserDetails';


function App() {
  // state for storing user data 
  const [users, setUsers] = useState();
    // we keep loader true
   const [loading , setLoading] = useState(true)
  // use useEffect hook for fetch user when component render 
   useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
       console.log(usersList)
      if(usersList){
           setUsers(usersList);
           setLoading(false)
         }else{
           setLoading(true)
         }
    };
    getUsers();
  }, []);
   
  // default loader true 
  if(loading && !users){
     return <Loader/>
  }
  
  return (
    <div className="App font-[poppins] min-h-[100vh]  w-[100%] py-6 px-10 gap-4  flex justify-evenly items-center flex-wrap">
    {/* setup routes */}
    <Router>
       <Routes>
        {/* default path "/" */}
       <Route path="/" element={<List users={users} setUsers={setUsers}/>} />
       {/* when user click to details then navigate to details page according to id and we send here users data to check user id is present or not */}
       <Route path="/detail/:id" element={<UserDetails users={users}/>} />
       </Routes>
    </Router>
    
     </div>
  );
}

export default App;
