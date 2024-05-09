import React, { useState } from 'react';
import './Components/Form.css';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            //we can use the hashedd password
            alert("Login Successful");
        }
    }

    const validate = () => {
        const validationErrors = {};

        if (!email) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Email is invalid";
        }

        if (!password) {
            validationErrors.password = "Password is required";
        } else if (password.length < 8) {
            validationErrors.password = "Password must be greater than 8";
        }

        return validationErrors;
    }

    return (
        <div className='container'>
            <div className='form_container'>
                <h1>Login Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input type='text' onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <div className='error'>{errors.email}</div>} 
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <div className='error'>{errors.password}</div>}
                    </div>
                    <button>Login</button>
                </form>

                <a href='#'>Sign Up</a>
            </div>
        </div>
    );
}

export default Form;
