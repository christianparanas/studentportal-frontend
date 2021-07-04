import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios' 
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react'

// contexts
import { DashContext } from '../contexts/DashContext.js'

// conponents
import Student from '../components/svg/Student'


export default function Login() {
	const router = useRouter()
	const { register, handleSubmit, watch, errors } = useForm();

	// using the context
	const { dashItems, setDashItems } = useContext(DashContext)

	  // media queries
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 451px)'
  })

  const isMobile = useMediaQuery({
    query: '(max-device-width: 450px)'
  })


  const onSubmit = (data, e) => {
  	axios.post(process.env.BACKEND_BASEURL + "/login", {
  		studentID: data.studentID,
  		password: data.password

  	}).then( async (res) => {
  		console.log(res.data)
  		await setDashItems(res.data.dashItems)
  		toast.success("Logging In..", { autoClose: 3000 });
  		setTimeout(() => router.push("/"), 3000)
  	})
  	.catch((err) => {
  		if(err.response.status == 401) { toast.error("Invalid Credentials", { autoClose: 3000 })}
  	})
  }

	return (
		<div className="login">
			<ToastContainer />

			{isDesktopOrLaptop && 
        <div className="desktop_under_construct">
          <p>Hi, currently this website is only available for mobile user with 450 pixels screen and below. Thank you.</p>
        </div>
      }
			
			<div className="content_wrapper">
				<div className="header">
					<Student />
					Student Portal
				</div>


				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" {...register('studentID', { required: true })} placeholder="Student ID" />
					<input type="password" current-password="true" {...register('password', { required: true })}  placeholder="Password" />
					<button>Login <i className="fad fa-sign-in"></i></button>
				</form>
			</div>

		</div>
	)
}