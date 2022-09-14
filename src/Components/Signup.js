import React,{useState} from 'react'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

export const Signup = () => {

    const history = useHistory();

    const [name, setName]=useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                Name: name,
                Surname: surname,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Name</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setName(e.target.value)} value={name}></input>
                <br></br>
                <label>Surname</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setSurname(e.target.value)} value={surname}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account Login
                    <Link to="login" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md'>SIGN UP</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
    )
}
