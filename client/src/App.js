import './App.css';
import {useEffect, useState} from "react";


export default function App() {
    //State Object for User Inputs
    const [inputs, setInputs] = useState({});
    //State Array for Users from DataBase
    const [users, setUsers] = useState(null)

    const serverAddress = "http://localhost:" + process.env.REACT_APP_SERVER_PORT;

    //Runs Once on Load to get Users
    useEffect(() => {
        getUsers()
    }, [])

    //Get Request to retrieve Users in Database
    function getUsers(){
        fetch( serverAddress + "/users")
            .then(res =>
                res.json()
            ).then(data =>
                setUsers(data.item)
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    //Updates State Object for User Inputs on Change
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    //Triggered when Users clicks Submit Button
    //   1. Creates a Post Request to Enter new User into DataBase
    //   2. Calls getUsers to get Updated list of Users
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...inputs})
        };
        fetch(serverAddress + "/users", requestOptions)
            .then(response =>
                response.json()
            )
            .then(()=> {
                getUsers()
            });
    }

    //Triggered When User clicks Delete on User
    //   1. Send A Delete Request with user id
    //   2. Calls getUsers to get Updated list of Users
    const onClick = (user) =>{
        fetch(serverAddress + user._id,
            { method: 'DELETE' })
            .then(()=> getUsers())
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>

                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={inputs.firstName || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={inputs.lastName || ""}
                    onChange={handleChange}
                />
            </div>
            <label>Enter your age:
                <input
                    type="number"
                    name="age"
                    value={inputs.age || ""}
                    onChange={handleChange}
                />
            </label>
            <div>
                <input type="submit" />
            </div>
        </form>
        <div>
            Users:
            {!users ? "Loading..." :

                users.map((user)=>{
                return (
                    <div key={user._id}>
                        First Name: {user.firstName},
                        Last Name: {user.lastName},
                        Age: {user.age}
                        <button onClick={()=> onClick(user)}>Delete</button>
                    </div>
                )
            })}
        </div>
        </>
    )
}

