import { useState, useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion } from "framer-motion";

// components
import Nav from '../components/Nav'

export default function Grades() {
	const [pageLoading, setPageLoading] = useState(false)

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

	useEffect(() => {
		setPageLoading(true)

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
								<p>Grades</p>	
							</div>
						</>
					}
				</motion.div>
			}
		</>
	)
}