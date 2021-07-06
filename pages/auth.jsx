import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios' 
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext, useEffect } from 'react'

// contexts
import { DashContext } from '../contexts/DashContext.js'

// conponents
import Student from '../components/svg/Student'


export default function Login() {
	const router = useRouter()
	const { register, handleSubmit, watch, errors } = useForm();

	// login btn loader
	const [loginLoader, setLoginLoader] = useState("loader")
	const [loginLoaderTxt, setLoginLoaderTxt] = useState("loginTxtnIco")

	// using the context
	const { dashItems, setDashItems } = useContext(DashContext)

	  // media queries
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 451px)'
  })

  const isMobile = useMediaQuery({
    query: '(max-device-width: 450px)'
  })

  const onLoginShowLoader = () => {
  	setLoginLoaderTxt("loginTxtnIco hideLoginTxtnIco")
  	setLoginLoader("loader showLoginLoader")
  }

  const onLoginHideLoader = () => {
  	setLoginLoaderTxt(" loginTxtnIco")
  	setLoginLoader("loader")
  }


  const onSubmit = (data, e) => {
  	onLoginShowLoader()

  	axios.post(process.env.BACKEND_BASEURL + "/auth", {
  		studentID: data.studentID,
  		password: data.password

  	}).then( async (res) => {
  		console.log(res.data)
  		toast.success("Logging In..", { autoClose: 2000 });
  		onLoginHideLoader()
  		setTimeout(() => router.push("/"), 2000)
  	})
  	.catch((err) => {
  		onLoginHideLoader()
  		if(err.response.status == 401) { toast.error("Invalid Credentials", { autoClose: 3000 })}
  	})
  }

  useEffect(() => {
  	// Prefetch the dashboard page
    router.prefetch('/')

  }, [])

	return (
		<div className="login">
			<ToastContainer />
			
			<div className="content_wrapper">
				<div className="header">
					<Student />
					Student Portal
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" {...register('studentID', { required: true })} placeholder="Student ID" />
					<input type="password" current-password="true" {...register('password', { required: true })}  placeholder="Password" />
					<button><p className={loginLoaderTxt}>Login</p><i className={`fad fa-sign-in ${loginLoaderTxt}`}></i><div className={loginLoader}></div></button>
				</form>
			</div>

		</div>
	)
}