import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link to="/" className="brand" aria-label="Creatorverse home">
            <span className="brand-mark">✦</span>
            <span>Creatorverse</span>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            <Link to="/">All Creators</Link>
            <Link to="/creators/new" className="nav-button">
              Add Creator
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ShowCreators />} />
            <Route path="/creators" element={<ShowCreators />} />
            <Route path="/creators/new" element={<AddCreator />} />
            <Route path="/creators/:id" element={<ViewCreator />} />
            <Route path="/creators/:id/edit" element={<EditCreator />} />

            {/* Backward-compatible routes from the starter project. */}
            <Route path="/ShowCreators" element={<Navigate to="/" replace />} />
            <Route path="/AddCreator" element={<Navigate to="/creators/new" replace />} />
            <Route path="/ViewCreator" element={<Navigate to="/" replace />} />
            <Route path="/EditCreator" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
