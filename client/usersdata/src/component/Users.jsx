import React, { useEffect, useState } from 'react'
import { Container,Col,Row,Table } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Users() {

  const [users,setUsers]=useState([])
  const [usersCount,setUsersCount]=useState(0)
  const [updateId,setUpdateId]=useState("")
  console.log(updateId);
  const fetchUser=async ()=>{

      try{
          const response=await axios.get('http://localhost:8000/authentication/view')
          setUsers(response.data);
          setUsersCount(response.data.length)
      }
      catch(err)
      {
        throw err
      }
  }

  const deleteUser=async (id)=>{

        try{
              const response=await axios.delete(`http://localhost:8000/authentication/delete/${id}`)
              alert(response.data.message)
              
        }
        catch(err)
        {
          console.log(err);
        }
  }
 

  

  useEffect(()=>{
      fetchUser()
  },[])
  return (
    <div>
       <div>
        <h2 className="text-center mt-5">Users Details</h2>
        <Container fluid>
          <Row>
            <Col md={12}>
              
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>User Name</th>
                    <th>Email</th>
                    
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { users.map(data=>(
                    
                  <tr>
                    <td>{data._id}</td>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    
                    <td><Button variant='contained' onClick={()=>deleteUser(data._id)} sx={{backgroundColor:"red"}}> <DeleteIcon/>Delete</Button>
                   <Link to={`/edit/${data._id}`}> <Button variant='contained' onMouseOver={()=>setUpdateId(data._id)} sx={{backgroundColor:"green"}}> <EditIcon/>Edit</Button></Link>
                    </td>
                  </tr>
                  
                  ))} </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Users