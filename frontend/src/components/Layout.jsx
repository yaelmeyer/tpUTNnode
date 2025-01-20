import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            {/* a -> recarga la página || Link -> SPA */}
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/series" className="navbar-item">Series</Link>
            <Link to="/favoritos" className="navbar-item">Favoritos</Link>
          </div>
        </nav>
      </header>
      <main style={{ minHeight: "100vh" }}>
        {
          children
        }
      </main>
      <footer className="p-5 has-background-grey-dark has-text-white-ter">
        <div className="content has-text-centered">
          <p>
            {/* Sitio desarrollado por Gabriel Alberini */}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout