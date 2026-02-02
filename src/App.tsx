import React, { useEffect } from "react"
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import About from "./pages/About"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import Contact from "./pages/Contact"
import EventsNews from "./pages/EventsNews"
import Home from "./pages/Home"
import Investment from "./pages/Investment"
import ProjectDetail from "./pages/ProjectDetail"
import Projects from "./pages/Projects"

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")

  return (
    <div className="min-h-screen bg-refenti-offwhite font-sans text-refenti-charcoal selection:bg-refenti-gold selection:text-white">
      {!isAdmin && <Navbar />}
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />

            <Route path="/news" element={<EventsNews />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </main>

      {!isAdmin && (
        <>
          <footer className="border-t border-gray-100 bg-white px-8 py-16">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row">
              <div className="max-w-sm space-y-4">
                <h2 className="font-display text-2xl font-light tracking-tight text-refenti-gold">
                  Refenti Realty Group
                </h2>
                <p className="text-[13px] leading-relaxed font-light text-gray-700">
                  Refenti Realty Group is a real estate investment and
                  development platform operating under{" "}
                  <a
                    href="https://solstice-ventures-beta.webflow.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-refenti-gold transition-colors hover:underline"
                  >
                    Solstice Ventures Holding
                  </a>
                  .
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-10 md:w-auto md:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="font-sans text-[8px] font-bold tracking-ultra text-gray-500 uppercase">
                    Links
                  </h4>
                  <ul className="space-y-2 text-[12px] font-light text-refenti-charcoal">
                    <li>
                      <Link
                        to="/"
                        className="transition-colors hover:text-refenti-gold"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="transition-colors hover:text-refenti-gold"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/investment"
                        className="transition-colors hover:text-refenti-gold"
                      >
                        Investment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/projects"
                        className="transition-colors hover:text-refenti-gold"
                      >
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/news"
                        className="transition-colors hover:text-refenti-gold"
                      >
                        News & Events
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="transition-colors hover:text-refenti-gold"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-sans text-[8px] font-bold tracking-ultra text-gray-500 uppercase">
                    Principles
                  </h4>
                  <ul className="space-y-2 text-[12px] font-light text-refenti-charcoal">
                    <li>Investor Care</li>
                    <li>Asset Standards</li>
                    <li>Global Reach</li>
                  </ul>
                </div>
                <div className="col-span-2 space-y-4 md:col-span-1">
                  <h4 className="font-sans text-[8px] font-bold tracking-ultra text-gray-500 uppercase">
                    Contact
                  </h4>
                  <ul className="space-y-2 text-[12px] font-light text-refenti-charcoal">
                    <li>info@refenti.com</li>
                    <li>+251 986 1986 86</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-gray-100 pt-8 text-[8px] tracking-ultra text-gray-600 uppercase">
              <span>© {new Date().getFullYear()} Refenti Group</span>
              <span>
                Made by{" "}
                <a
                  href="https://briggsdavis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-refenti-gold"
                >
                  Briggs Davis
                </a>
              </span>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
