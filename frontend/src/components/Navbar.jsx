// import { NavLink } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <nav>
//       <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
//       <NavLink to="/history" className={({isActive}) => isActive ? 'active' : ''}>History</NavLink>
//       <NavLink to="/research" className={({isActive}) => isActive ? 'active' : ''}>Research</NavLink>
//       <NavLink to="/login" className={({isActive}) => isActive ? 'active' : ''}>Login</NavLink>
//     </nav>
//   )
// }
// import { NavLink, useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import AOS from 'aos'
// import 'aos/dist/aos.css'

// export default function Navbar() {
//   const navigate = useNavigate()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     setIsLoggedIn(!!token)

//     // Initialize AOS
//     AOS.init({ duration: 600, once: true, easing: 'ease-in-out' })
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     setIsLoggedIn(false)
//     navigate('/login')
//     AOS.refresh() // refresh for updated navbar
//   }

//   return (
//     <nav style={{ display: 'flex', gap: '16px', padding: '12px' }}>
//       <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''} data-aos="fade-down">Home</NavLink>
//       <NavLink to="/history" className={({isActive}) => isActive ? 'active' : ''} data-aos="fade-down" data-aos-delay="100">History</NavLink>
//       <NavLink to="/research" className={({isActive}) => isActive ? 'active' : ''} data-aos="fade-down" data-aos-delay="200">Research</NavLink>

//       {isLoggedIn ? (
//         <button 
//           onClick={handleLogout} 
//           style={{ marginLeft: 'auto', cursor: 'pointer' }}
//           data-aos="fade-down" 
//           data-aos-delay="300"
//         >
//           Logout
//         </button>
//       ) : (
//         <NavLink 
//           to="/login" 
//           className={({isActive}) => isActive ? 'active' : ''} 
//           style={{ marginLeft: 'auto' }}
//           data-aos="fade-down" 
//           data-aos-delay="300"
//         >
//           Login
//         </NavLink>
//       )}
//     </nav>
//   )
// }
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Navbar() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 600, once: true, easing: 'ease-in-out' })

    // Function to check login state
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'))

    checkLogin() // initial check
    window.addEventListener('loginChange', checkLogin) // listen for login/logout events

    return () => window.removeEventListener('loginChange', checkLogin)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
    window.dispatchEvent(new Event('loginChange')) // notify login change
    AOS.refresh() // refresh AOS for animations
  }

  return (
    <nav style={{ display: 'flex', gap: '16px', padding: '12px', alignItems: 'center' }}>
      <NavLink 
        to="/" 
        end 
        className={({isActive}) => isActive ? 'active' : ''} 
        data-aos="fade-down"
      >
        Home
      </NavLink>
      <NavLink 
        to="/history" 
        className={({isActive}) => isActive ? 'active' : ''} 
        data-aos="fade-down" 
        data-aos-delay="100"
      >
        History
      </NavLink>
      <NavLink 
        to="/research" 
        className={({isActive}) => isActive ? 'active' : ''} 
        data-aos="fade-down" 
        data-aos-delay="200"
      >
        Research
      </NavLink>

      {isLoggedIn ? (
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          data-aos="fade-down" 
          data-aos-delay="300"
        >
          Logout
        </button>
      ) : (
        <NavLink 
          to="/login" 
          className={({isActive}) => isActive ? 'active' : ''} 
          style={{ marginLeft: 'auto' }}
          data-aos="fade-down" 
          data-aos-delay="300"
        >
          Login
        </NavLink>
      )}
    </nav>
  )
}
