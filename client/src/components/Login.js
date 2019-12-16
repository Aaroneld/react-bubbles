import React, { useState } from "react";
import { axiosWithAuth } from '../axiosAuth';
import styled from 'styled-components';

const Container = styled.section`
    position: absolute
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    padding: 10%;
    
    
    
    form {
        display: flex;
        flex-flow: column;
        margin: auto;
        width: 100%;
        padding: 6% 4%;
        border: 2px solid black;

        input {
            margin-bottom: 2%;
            padding: 5% 0 .5% 0;
            width: 50vw;
            align-self: center;
        }
        button {
            background: black;
            color: white;
            border: none;
            outline: none;
            padding 4%;
            margin-top: 3%;
            &:hover {
                background: white;
                color: black;
                border: 1px solid black;
            }
        }
    }
`;

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({ username: 'Lambda School', 
                                                    password: 'i<3Lambd4'});

    const handleSubmit = e => {

        e.preventDefault();
        axiosWithAuth().post("http://localhost:5000/api/login", credentials)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.payload);
            props.history.push('/bubblepage');
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleChange = e => {

        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

  return (
    <Container>

      <form onSubmit={handleSubmit}>
          <input
          onChange={handleChange}
          name="username"
          placeholder="Lambda School"></input>
          <input
          onChange={handleChange}
          name="password"
          placeholder="i<3Lambd4"></input>
          <button type="submit">Login</button>
      </form>
    </Container>
  );
};

export default Login;
