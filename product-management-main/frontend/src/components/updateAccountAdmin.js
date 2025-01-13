import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
const UpdateAccountGeneralAdmin =()=>{
    const {id} = useParams('id');
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:3002/api/users/${id}`)
                if(response){
                    const responseData = response.data;
                    setNewUser(responseData);
                }
            }catch(error){
                console.error('something went wrong',error);
            }};
            fetchData();
      }, [])
    
      
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3002/api/users/${id}`, newUser);
            navigate(`/admin/users`);
        }catch(error){
            console.error("Error Updating User:",error);
        }
    };
    return(
        <div className="">
            <h1 className="">Update </h1>
            <div className="">
                <br/>
                <div className="">
                    <label className="">nom</label><br/><br/>
                    <input
                        className=''
                        type="text"
                        name="nom"
                        value={newUser.nom}
                        onChange={handleChange}
                        requiredplaceholder="entrer lr nom"
                        
                    />
                </div><br/>
                <div className="">
                    <label className="">prenom</label><br/><br/>
                    <input
                    className=''
                        type="text"
                        name="prenom"
                        value={newUser.prenom}
                        onChange={handleChange}
                        requiredplaceholder="entrer le prenom"
                        
                    />
                </div><br/>
                <div className="">
                    <label className="">Email</label><br/><br/>
                    <input
                    className=''
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                        requiredplaceholder="enter email"
                        
                    />
                </div><br/>
                <div className="">
                    <label className=''>New Password</label><br/><br/>
                    <input
                        className=''
                        type="password"
                        name="password"
                        onChange={handleChange}
                        requiredplaceholder="entrer le mot de passe"
                        
                    />
                </div><br/>
                <button className="" type="submit" onClick={handleSubmit}>
                    Update Account
                </button>
                <br/><br/>
            </div>
            
        </div>    
    );
};
export default UpdateAccountGeneralAdmin;