import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import  registerSchema  from "../schemas/index.js";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";



function Update() {
    const params=useParams()
    console.log(params.id);
    const [userData,setUserData]=useState("")

  const onSubmit = async (value, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const { values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const response = await axios.post(
      `http://localhost:8000/authentication/update/${params.id}`,
      body
    );
    alert(response.data.message);
   
    };
    const fetchData=async ()=>{
    
        const response1=await axios.get(`http://localhost:8000/authentication/user/${params.id}`)
        setUserData(response1.data);
    }
    useEffect(()=>{
            fetchData()
    },[])
  return (
    <div className="">
      <Container className="w-25 mt-5">
        <Row>
          <Col xs={12} sm={12} className="formparent">
            <div class="form-box" >
              <form class="form text-center bg-light" onSubmit={handleSubmit}>
                <span class="title">Update</span>
                
                <div class="form-container ">
                  <input
                    type="text"
                    placeholder="User Name"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={userData.username}
                    className={
                      errors.username && touched.username
                        ? "input border border-danger form-control "
                        : "input form-control border border-success"
                    }
                  />
                  {errors.username && touched.username && (
                    <p className="text-start text-danger">{errors.username}</p>
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={userData.email}
                    className={
                      errors.email && touched.email
                        ? "input border border-danger form-control "
                        : "input border border-success form-control"
                    }
                  />
                  {errors.email && touched.email && (
                    <p className="text-start text-danger">{errors.email}</p>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={userData.password}
                    className={
                      errors.password && touched.password
                        ? "input border border-danger form-control"
                        : "input border border-success form-control"
                    }
                  />
                  {errors.password && touched.password && (
                    <p className="text-start text-danger">{errors.password}</p>
                  )}
                </div>
                <button >Sign up</button>
              </form>
              
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Update;
