import './dash.css'
import axios from "axios"
import React, {useEffect, useRef,useState} from "react"
import Form from 'react-bootstrap/Form'
import  Navbar  from "react-bootstrap/Navbar"
import  Container  from "react-bootstrap/Container"
import {  useNavigate } from "react-router-dom"
import {UserAuth} from '../Context/AuthContext'


import { Alert, Button } from 'react-bootstrap'
export default function Dash() {
    
    const [loading, setLoading]=useState(false)
    const [subm, setSubm]=useState (false)

    const userNameTwitter=useRef()
    const keyWords=useRef()
    const navigate=useNavigate()
    const {logout,currentUser,token } =UserAuth();

    useEffect(()=>{getUserD(token)},[])

    const getUserD= async (token)=>{
        const res = await axios.get('http://localhost:5000/dash', {
			headers: {
				authorization: "Bearer "+token,
                Uid:currentUser.uid
			}
		})
        if( res.data.keyWord==null && userNameTwitter.current.value==null ){
            keyWords.current.value=""
            userNameTwitter.current.value=""
        }else{
            keyWords.current.value=res.data.keyWord
            userNameTwitter.current.value= res.data.twitterUserName
        }
    }
    const addInfo=async ()=>{
        setLoading(true)
        const res = await axios.post('http://localhost:5000/dash', {
            disabled:false,
            keyWord:keyWords.current.value,
            twitterUserName:userNameTwitter.current.value,
            userEmail:currentUser.email,
        },
			{headers:{
				authorization: "Bearer "+token,
                uid:currentUser.uid}
			});
        if(res.status===200){
            setSubm(true)
        }
        setLoading(false)
    }

    const handleLogout=async()=>{
        try{
            await logout()
            navigate('/login')
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className='d-flex flex-column align-items-center justify-content-center  ml-auto mr-auto top-50 min-vh-100'>

            <Navbar bg="dark" className="navbar fixed-top navbar-default" style={{'top':'0'}}>
                <Container>
                    <Navbar.Brand href="#home" className="text-light">BishTwit</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="text-light">
                            Signed In As: {currentUser.email}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                <Button className='mb-2 'onClick={handleLogout} style={{'marginRight':'20px'}}>Log Out</Button>
            </Navbar>
            <p>Add in the twitter user you want.<br/> Then add the keywords seperated by a space to track the word.</p>
            <div className='d-flex align-items-center justify-content-center  ml-auto mr-auto top-50 mainCard '>
                
                <Form className='mb-3 mt-3'>
                    {subm && <Alert variant='success'>Succesfully Submitted</Alert>}
                    <Form.Group className="mb-3" >
                        <Form.Label>Twitter UserName</Form.Label>
                        <Form.Control type="email" placeholder="user name" ref={userNameTwitter}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>KeyWord to Track</Form.Label>
                        <Form.Control as="textarea" rows={9} cols={10}ref={keyWords} />
                    </Form.Group>
                    <Button onClick={addInfo}>Submit</Button>
                </Form>
            </div>
        </div>   
    )

}