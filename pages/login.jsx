
import Student from '../components/svg/Student'

import { useMediaQuery } from 'react-responsive'



export default function Login() {

	  // media queries
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 451px)'
  })

  const isMobile = useMediaQuery({
    query: '(max-device-width: 450px)'
  })

	return (
		<div className="login">

			{isDesktopOrLaptop && 
        <div className="desktop_under_construct">
          <p>Hi, currently this website is only available for mobile user with 450 pixels screen and below. Thank you.</p>
        </div>
      }
			
			{isMobile && 
				<div className="content_wrapper">
					<div className="header">
						<Student />
						Student Portal
					</div>


					<form action="">
						<input type="text" placeholder="Student ID" />
						<input type="password" placeholder="Password" />
						<button>Login <i className="fad fa-sign-in"></i></button>
					</form>
				</div>
			}



		</div>
	)
}