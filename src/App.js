// Simple React app to add users to a list
import React, {useState, Fragment} from 'react';
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  // state management for users list with an empty array as default value
  const [usersList, setUsersList] = useState([]);

  // handler to add users, updating setUsersList state with new user object & randomly generated id
  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, {name: uName, age: uAge, id: Math.random().toString()}];
    })
  }


  return (
      <Fragment>
        <AddUser onAddUser={addUserHandler}/>
        <UsersList users={usersList}/>
      </Fragment>
  );
}

export default App;
