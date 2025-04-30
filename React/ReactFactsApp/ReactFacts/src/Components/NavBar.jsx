import './NavBar.css'
import reactLogo from '../assets/react_logo_dark.svg'

export default function NavBar() {
    return (
        <nav className="nav-bar">
			<div className="logo-and-heading">
            <img src={reactLogo} alt="React_Logo" className="react-logo"/>
            <a href="/" ><span className="page-heading">React Facts</span></a>
			</div>
            <ul className="nav-list">
				<a href="/" className="nav-list-item">Pricing</a>
				<a href="/" className="nav-list-item">About</a>
				<a href="/" className="nav-list-item">Contact</a>
            </ul>
        </nav>
    )
}

/* import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
} */