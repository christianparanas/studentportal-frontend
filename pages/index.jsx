import Head from 'next/head'
import Image from 'next/image'
import { useState, useRef, useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

// contexts
import { DashContext } from '../contexts/DashContext.js'

// components
import Nav from '../components/Nav'

// svgs
import Book from '../components/svg/Book'
import Ruler from '../components/svg/Ruler'
import Graph from '../components/svg/Graph'
import Peso from '../components/svg/Peso'


export default function Home() {
  const { dashItems, setDashItems } = useContext(DashContext)
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false);


  // media queries
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 451px)'
  })

  const isMobile = useMediaQuery({
    query: '(max-device-width: 450px)'
  })

  useEffect(() => {
    console.log(dashItems)

    if(dashItems.length == 0) { 
      router.push("/auth") 
    } else {
      setPageLoading(true)
    }

  }, [])




  return (
    <>
      {pageLoading && (
        <div className="home">
          <Head>
            <title>Student Dashboard</title>
            <link rel="icon" href="https://apps.evsu.edu.ph/assets/img/favicon.ico" />
          </Head>

          {isDesktopOrLaptop && 
            <div className="desktop_under_construct">
              <p>Hi, currently this website is only available for mobile user with 450 pixels screen and below. Thank you.</p>
            </div>
          }

          {isMobile && 
            <>
              <Nav page={1} />
              <div className="dash_wrapper">
                
                <div className="header">
                  <h3>Dashboard</h3>
                  <h5>SY: 2020-2021 SEM: 1</h5>
                </div>
                <div className="dash_items">
                  <div className="dash_item">
                    <Book />
                    <div className="dash_item_details">
                      {dashItems ? (<h1>{dashItems[0]}</h1>) : (<h1>0</h1>)}
                      <div>Subject/s Enrolled</div>
                      <div>View Schedule <i className="fad fa-eye"></i></div>
                    </div>
                  </div>
                  <div className="dash_item">
                    <Ruler />
                    <div className="dash_item_details">
                      {dashItems ? (<h1>{dashItems[1]}</h1>) : (<h1>0</h1>)}
                      <div>Total Unit/s</div>
                      <div>View Schedule <i className="fad fa-eye"></i></div>
                    </div>
                  </div>
                  <div className="dash_item">
                    <Graph />
                    <div className="dash_item_details">
                      {dashItems ? (<h1>{dashItems[2]}</h1>) : (<h1>0</h1>)}
                      <div>GPA</div>
                      <div>View Grades <i className="fad fa-eye"></i></div>
                    </div>
                  </div>
                  <div className="dash_item">
                    <Peso />
                    <div className="dash_item_details">
                      {dashItems ? (<h1>{dashItems[3]}</h1>) : (<h1>0</h1>)}
                      <div>Balance</div>
                      <div>View Assessment <i className="fad fa-eye"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      )}
    </>
  )
}
