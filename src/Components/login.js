import React, {useEffect, useRef,useState} from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserAuth } from "../Context/AuthContext"

export default function Login() {
    const [loading, setLoading]=useState(false)
    const emailRef=useRef()
    const passwordRef=useRef()
    const {loginUser, token, currentUser}=UserAuth()

    const [error, setError]=useState("")
    
    const navigate= useNavigate()

    useEffect(()=>{
        if (token){
            sendToken(token)
        }
    },[token])

    const sendToken=async (token)=>{
        const res = await axios.post('http://localhost:5000/login', {
			headers: {
				authorization: "Bearer "+token,
                Uid:currentUser.uid
			},
		});
    }

    async function summit(e){
        e.preventDefault()
        try{
            setLoading(true)
            await loginUser(emailRef.current.value, passwordRef.current.value)
            navigate('/dash')
        } catch(err){
            console.log(err)
            setError("Failed to login")
        }
        setLoading(false)
    }

    return(
        <div className="d-flex align-items-center justify-content-center "style={{'flexDirection':'column','minHeight':'400px'}}>

            <Card className="w-25 position-relative " style={{'top':'100px','minHeight':'400px'}}>
                <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={summit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef}required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                    Log In
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <p to="/forgot-password">Forgot Password?</p>
                </div>
                </Card.Body>
                <div className="w-100 text-center mb-4">
                    Need an account? <Link to="/">Sign Up</Link>
                </div>
            </Card>

        </div>
    )
}