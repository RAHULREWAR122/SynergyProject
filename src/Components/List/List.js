import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../Api/api';
import { useNavigate } from 'react-router-dom';

const List = ({users, setUsers}) => {
    // default keep user details empty  
    const [newUser, setNewUser] = useState({
       name: '',
       email: '',
       phone: ''
    });
    // edit user state
    const [editingUser, setEditingUser] = useState(null);
    // when user click to edit or add new user button then show form button
    const [showForm , setShowForm] = useState(false);  
     
    // we use navigate to navigate user details page when user click to details button
    const navigate = useNavigate();
   
    // function for handle submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      // first we check which req user send edit or other if edit then show popup form with data which we want to update/edit 
       if(editingUser){
        const updatedUser = await updateUser(editingUser.id, newUser);
        // use ternary operator and set user with updated data , we take here id which data we need to update 
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
       
      }else{
        // if req is not edit user then we create new user data 
        const createdUser = await createUser(newUser);
        // set new details of user
        setUsers([...users, createdUser]);
      }
      // after submit keep form inputs data empty
      setNewUser({ name: '', email: '', phone: '' });
      // keep form popup false
      setShowForm(false)
      // keep edit user null 
      setEditingUser(null);
    };
  
    // Edit user
    const handleEdit = (user) => {
      setEditingUser(user);
      setShowForm(true)
      // if user click to edit user then we give data in inputs with data which user want to update
      setNewUser({ name: user.name, email: user.email, phone: user.phone });
    };
  
    // Delete user
    const handleDelete = async (id) => {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    };
   
    // navigate to details page with id and here we send user data with state this is more safe like we fetch there user data using id form params so i use here state for send data 
    const handleUserDetails = (user)=>{
      navigate(`/detail/${user?.id}` , {state : user})
    }
     

    // return JSX
    return (
      <div className="mx-auto p-6 ">
        <h1 className="text-4xl font-bold text-center mb-8">Users List</h1>  
        <div className='flex justify-end py-2 items-center '>
        <button onClick={()=>setShowForm(true)} className='text-[18px] bg-green-500 px-4 py-2 rounded-lg text-white'>Add new user</button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {users.map(user => (
            <div  key={user.id} className="shadow-lg  hover:shadow-2xl duration-300 transition-all flex justify-between flex-col rounded-lg p-6  md:w-[280px] w-full min-h-[250px] text-center ">
              <div className="mb-4 ">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Name : {user.name}</h3>
                <p className="text-gray-600 mb-2">Email : {user.email}</p>
                <p className="text-gray-600">Mob. : {user.phone}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={()=>handleUserDetails(user)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Details 
                </button>
              </div>
            </div>
          ))}
        </div>
  
      {showForm && <div className='fixed left-0 top-0 bg-[#818e9876]  backdrop-blur-[3px]  h-[100%] w-[100%] flex justify-center items-center'>
         <div className='relative bg-white p-4 rounded-lg shadow-xl overflow-hidden'>
        <button onClick={()=>setShowForm(false)} className='absolute bg-red-600 text-white p-4 top-[-4px] right-[-4px] text-[18px] font-semibold hover:bg-red-700 transition-all duration-300 rounded-lg'>X</button>
        <h2 className="text-2xl font-bold text-center mt-12">
        {editingUser ? 'Edit User' : 'Create New User'}
      </h2>
    
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 md:w-full w-[300px] max-w-[450px]">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          minLength={10}
          maxLength={10}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {editingUser ? 'Update User' : 'Create User'}
        </button>
      </form>
       </div>
     </div>
     }
        
      </div>
    );
};

export default List;
