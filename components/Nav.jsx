import { useState, useEffect } from 'react'
import { Squeeze  as Hamburger } from 'hamburger-react'
import Student from './svg/Student'

export default function Nav( props ) {
	const [isOpen, setOpen] = useState(false)

	// class vars
	const [sidebar, setSidebar] = useState('nav_sidebar')
	const [clickoutside, setClickoutside] = useState('clickoutside_overlay')


	const [dropOv, setDropOv] = useState('dropBox')
	const [dropIco, setDropIco] = useState("far fa-sort-down")


	const closeSidebar = () => {
		setClickoutside('clickoutside_overlay')
		setSidebar('nav_sidebar')
		setOpen(false)

	}

	const openSidebar = () => {
		setClickoutside('clickoutside_overlay show_clickoutside_overlay')
		setSidebar('nav_sidebar show_nav_sidebar')
	}

	const openDrop = () => {
		if(dropOv == "dropBox") {
			setDropOv("dropBox showDrop")
			setDropIco("far fa-sort-up")
		} else {
			setDropIco("far fa-sort-down")
			setDropOv("dropBox")
		}
		
	}

	useEffect(() => {
		if(isOpen) {
			openSidebar()
		} 

	}, [isOpen])



	return (
		<div className="nav">

			<div className="logo">
				<Student />
				<p>Student Portal</p>
			</div>
			<div className="nav_btns">
				<div className="nav_options">
					<Hamburger toggled={isOpen} toggle={setOpen} />
				</div>
				<div className="nav_options nav_click" onClick={openDrop}>
					<img src="https://apps.evsu.edu.ph/assets/img/students/2018/2018-02022-e121351d79e353eebe8338eab204a2fe.jpg" alt="" />
					christian <i className={dropIco}></i>
				</div>

				<div className={dropOv}>
					<div className="dropImg">
						<img src="https://apps.evsu.edu.ph/assets/img/students/2018/2018-02022-e121351d79e353eebe8338eab204a2fe.jpg" alt="" />
						<p>Christian</p>
					</div>
					<div className="dropOp">
						<div className="op"><i className="fal fa-image-polaroid"></i> Update Photo</div>
						<div className="op"><i className="fal fa-cog"></i> Account Settings</div>
						<div className="op oo"><i className="fal fa-lock"></i> Change Password</div>
						<div className="op out">Logout <i className="fad fa-sign-out"></i> </div>
					</div>
				</div>
			</div>

			<div className={clickoutside} onClick={closeSidebar}></div>
			<div className={sidebar}>
				<div className="header">
					Christian 
				</div>

				<div className="nav_sidebar_options">
					<div className={`nav_sidebar_op ${ props.page == 1 ? 'currentpage' : ''}`}>
						<i className="fal fa-desktop-alt"></i>
					  Dashboard
					</div>
					<div className="nav_sidebar_op">
						<i className="fal fa-gift"></i>
						Free Education
					</div>
					<div className="nav_sidebar_op">
						<i className="fal fa-book-open"></i>
						Subjects Enrolled
					</div>
					<div className="nav_sidebar_op">
						<i className="fal fa-user-graduate"></i>
						Grades
					</div>
					<div className="nav_sidebar_op">
						<i className="fal fa-address-card"></i>
						Assessment
					</div>
					<div className="nav_sidebar_op">
						<i className="fal fa-bookmark"></i>
						Ledger
					</div>
				</div>
			</div>			
		</div>
	)
}