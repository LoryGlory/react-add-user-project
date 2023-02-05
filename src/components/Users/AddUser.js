// Add User component, includes form and input handlers
import React, {useState, useRef} from 'react';
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css';

const AddUser = props => {
  // useRef hooks for name and age input fields
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // state management for error with undefined default value
  const [error, setError] = useState();

  // handler to add users, using above useRef variables to save current values when adding users
  const addUserHandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    // basic validity checking if inputs are empty, adding title and message to error object
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      })
      return;
    }

    // check if entered age is higher than 1, adding title and message to error object
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age ( > 0).'
      })
      return;
    }

    // if no errors occur -> add entered name and age to props in App.js, empty input fields
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  // handler to reset setError state
  const errorHandler = () => {
    setError(null);
  }

  return (
      <div>
        {/* if an error exist, display Modal component, otherwise display form to add users*/}
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
          <form onSubmit={addUserHandler}>
            <label htmlFor="username">User</label>
            <input
                id="username"
                type="text"
                ref={nameInputRef}
            />
            <label htmlFor="age">Age</label>
            <input
                id="age"
                type="number"
                ref={ageInputRef}
            />
            <Button type="submit">Add User</Button>
          </form>
        </Card>
      </div>
  )
}

export default AddUser;