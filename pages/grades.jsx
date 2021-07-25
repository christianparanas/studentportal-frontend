import { useState, useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion } from "framer-motion";
import axios from 'axios'

// components
import Nav from '../components/Nav'

export default function Grades() {
	const [pageLoading, setPageLoading] = useState(false)
	const [gradesArr, setGradesArr] = useState([])

	// framer motion config
	const container = {
	  hidden: { opacity: 1, scale: 0 },
	  visible: {
	    opacity: 1,
	    scale: 1,
	    transition: {
	      delayChildren: 0.3,
	      staggerChildren: 0.2
	    }
	  }
	};

	const containerMotion = {
	  hidden: { y: 10, opacity: 0 },
	  visible: {
	    y: 0,
	    opacity: 1
	  }
	};

	// media queries
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 451px)'
  })

  const isMobile = useMediaQuery({
    query: '(max-device-width: 450px)'
  })

  const loadGrades = () => {
  	axios.get(process.env.BACKEND_BASEURL + "/grades")
  		.then(res => {
  			setGradesArr(res.data.data)
  		})
  		.catch(err => {
  			console.log(err)
  		})
  }

	useEffect(() => {
		setPageLoading(true)
		loadGrades()
	}, [])

	return (
		<>
			{pageLoading && 
				<motion.div
					variants={containerMotion}
			    initial="hidden"
			    animate="visible"
				>
					{isMobile && 
						<>
							<Nav page={4} />

							<div className="grades_wrapper">
								{gradesArr.map((value, key) => {
									return (
										<div className="grades_panel" key={key}>
											<div className="head">{value.head}</div>
											<div className="content">
												{value.con.map((val, keyy) => {
													return (
														<div className="outer" key={keyy}>
															{val['z'].map((vall, keyyy) => {
																return (
																	<div className="inner" key={keyyy}>
																		{vall}
																	</div>
																)
															})}
														</div>
													)
												})}
											</div>
										</div>
									)
								})}
							</div>
						</>
					}
				</motion.div>
			}
		</>
	)
}