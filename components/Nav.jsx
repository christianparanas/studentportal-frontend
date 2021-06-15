import { useState, useEffect } from 'react'
import { Squeeze  as Hamburger } from 'hamburger-react'


export default function Nav( props ) {
	const [isOpen, setOpen] = useState(false)

	// class vars
	const [sidebar, setSidebar] = useState('nav_sidebar')
	const [clickoutside, setClickoutside] = useState('clickoutside_overlay')

	const closeSidebar = () => {
		setClickoutside('clickoutside_overlay')
		setSidebar('nav_sidebar')
		setOpen(false)
	}

	const openSidebar = () => {
		setClickoutside('clickoutside_overlay show_clickoutside_overlay')
		setSidebar('nav_sidebar show_nav_sidebar')
	}

	useEffect(() => {
		if(isOpen) {
			openSidebar()
		} 

	}, [isOpen])



	return (
		<div className="nav">
			
			<div className="nav_btns">
				<div className="nav_options">
					<Hamburger toggled={isOpen} toggle={setOpen} />
				</div>
				<div className="nav_options">
					christian
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