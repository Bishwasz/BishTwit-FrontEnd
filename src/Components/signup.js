import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { UserAuth } from "../Context/AuthContext"
import { Link, useNavigate } from "react-router-dom"


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  
  const navigate= useNavigate()

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')

  const {createUser}=UserAuth()

  const handleSubmit= async(e)=> {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError('')
      setLoading(true)
      await createUser(emailRef.current.value, passwordRef.current.value)
      
      navigate('/login')
      
    } catch(err) {
      setError(`Failed to SignUp ${err}`)
    }
    setLoading(false)    
  }

  return (
    < div className="d-flex align-items-center justify-content-center "style={{'flexDirection':'column','minHeight':'400px'}}>
      <Card className="w-25 position-relative " style={{'top':'100px','minHeight':'400px'}}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100"  type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mb-3" >
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Card>

    </div>
  )
}
