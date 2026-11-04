import { useEffect, useState } from 'react'
import './App.css'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 20v-2a4 4 0 0 0-3-3.87M16 2.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
    </svg>
  )
}

function navigate(event, path, setPath) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) return

  event.preventDefault()
  if (window.location.pathname === path && !window.location.search) return

  window.history.pushState({}, '', path)
  setPath(path)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

function Link({ children, className = '', isCurrent = false, path, setPath }) {
  return (
    <a
      className={className}
      href={path}
      onClick={(event) => navigate(event, path, setPath)}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </a>
  )
}

function Layout({ children, path, setPath, theme, toggleTheme }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" path="/" setPath={setPath}>
          <span className="brand-mark">ME</span>
          <span>McMullin Estates</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link className={path === '/' ? 'active' : ''} isCurrent={path === '/'} path="/" setPath={setPath}>
            Home
          </Link>
          <Link
            className={path === '/users' ? 'active' : ''}
            isCurrent={path === '/users'}
            path="/users"
            setPath={setPath}
          >
            Advisors
          </Link>
          <Link
            className={path === '/account' ? 'active' : ''}
            isCurrent={path === '/account'}
            path="/account"
            setPath={setPath}
          >
            Account
          </Link>
        </nav>
        <div className="header-actions">
          <span className="system-status"><i /> Private viewings available</span>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <span>McMullin Estates / 2026</span>
        <span>Private property advisors</span>
      </footer>
    </div>
  )
}

function HomePage({ setPath }) {
  return (
    <div className="home-page">
      <section className="property-hero">
        <img
          className="property-hero-image"
          src="/images/img1.png"
          alt="Distinguished stone residence illuminated at dusk"
          fetchPriority="high"
        />
        <div className="property-hero-shade" />
        <div className="property-hero-content">
          <div className="hero-overline">Private property advisors</div>
          <h1>McMullin<br /><em>Estates.</em></h1>
          <p>
            Remarkable homes, discreetly represented. A more personal standard
            of real estate for clients who expect more.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" path="/users" setPath={setPath}>
              Meet our advisors <ArrowIcon />
            </Link>
            <Link className="account-link" path="/account" setPath={setPath}>
              Client account <ArrowIcon />
            </Link>
          </div>
        </div>
        <div className="hero-signature" aria-hidden="true">
          <span>Discreet</span><i /><span>Experienced</span><i /><span>Personal</span>
        </div>
      </section>

      <section className="editorial-intro">
        <div className="eyebrow"><span>01</span> Our approach</div>
        <div className="editorial-copy">
          <h2>Exceptional homes deserve exceptional counsel.</h2>
          <p>
            We pair intimate market knowledge with measured, personal service.
            Every detail is considered. Every conversation remains yours.
          </p>
        </div>
      </section>

      <section className="residence-feature">
        <div className="residence-image-wrap">
          <img
            src="/images/img2.png"
            alt="Elegant estate framed by mature palms and landscaped grounds"
            loading="lazy"
          />
          <span>Selected residence</span>
        </div>
        <div className="residence-story">
          <div className="eyebrow"><span>02</span> The art of arrival</div>
          <h2>Homes with<br /><em>presence.</em></h2>
          <p>
            Architecture, setting, and possibility—presented with the care each
            property deserves and the discretion every client should expect.
          </p>
          <Link className="story-link" path="/users" setPath={setPath}>
            Begin a conversation <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="feature-grid" aria-label="Our standard">
        <article className="feature-card feature-intro">
          <span className="card-number">03 / OUR STANDARD</span>
          <h2>Service without<br />compromise.</h2>
        </article>
        <article className="feature-card">
          <div className="feature-icon"><UsersIcon /></div>
          <h3>Personal representation</h3>
          <p>Trusted, one-to-one guidance from first conversation through closing.</p>
        </article>
        <article className="feature-card accent-card">
          <span className="api-pill"><i /> BY APPOINTMENT</span>
          <div>
            <p>Explore our</p>
            <h3>Private portfolio</h3>
          </div>
          <code>SELECT RESIDENCES / LOCAL EXPERTISE</code>
        </article>
      </section>
    </div>
  )
}

function UserCard({ user, index }) {
  const initials = user.name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="user-card" style={{ '--delay': `${index * 90}ms` }}>
      <span className="user-index">{String(index + 1).padStart(2, '0')}</span>
      <div className={`avatar avatar-${index % 4}`}>{initials}</div>
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>{user.title}</p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
      <span className="user-id">ID {String(user.id).padStart(3, '0')}</span>
    </article>
  )
}

function UsersPage() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch('/api/users', { signal: controller.signal })
        if (!response.ok) throw new Error('Could not load the directory')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Invalid directory response')
        setUsers(data)
        setStatus('ready')
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <div className="users-page">
      <section className="page-heading">
        <div className="eyebrow"><span>02</span> Our advisory team</div>
        <div className="heading-row">
          <div>
            <h1>Our advisors.</h1>
            <p>Experienced local counsel for every step of your property journey.</p>
          </div>
          {status === 'ready' && <div className="user-count">{users.length}<span>people</span></div>}
        </div>
      </section>

      <section className="directory" aria-live="polite">
        <div className="directory-labels"><span>Directory</span><span>Contact</span></div>
        {status === 'loading' && (
          <div className="loading-state"><span /><p>Loading the team…</p></div>
        )}
        {status === 'error' && (
          <div className="error-state">
            <span>Connection lost</span>
            <p>We couldn’t load the advisor directory. Please try again shortly.</p>
          </div>
        )}
        {status === 'ready' && users.map((user, index) => (
          <UserCard key={user.id} user={user} index={index} />
        ))}
      </section>
    </div>
  )
}

function AccountPage() {
  const [account, setAccount] = useState({ status: 'loading', user: null })
  const [signOutError, setSignOutError] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const authError = new URLSearchParams(window.location.search).get('error')

  useEffect(() => {
    const controller = new AbortController()

    async function loadAccount() {
      try {
        const response = await fetch('/api/account', { signal: controller.signal })
        if (!response.ok) throw new Error('Could not load account')
        const data = await response.json()
        setAccount({ status: data.authenticated ? 'signed-in' : 'signed-out', user: data.user })
      } catch (error) {
        if (error.name !== 'AbortError') setAccount({ status: 'error', user: null })
      }
    }

    loadAccount()
    return () => controller.abort()
  }, [])

  async function signOut() {
    setIsSigningOut(true)
    setSignOutError(false)

    try {
      const response = await fetch('/auth/logout', { method: 'POST' })
      if (!response.ok) throw new Error('Could not sign out')
      setAccount({ status: 'signed-out', user: null })
    } catch {
      setSignOutError(true)
    } finally {
      setIsSigningOut(false)
    }
  }

  const errorMessage = {
    not_configured: 'Google sign-in needs to be configured by the site owner.',
    oauth_failed: 'Google sign-in was cancelled or could not be completed.',
    unverified_email: 'Please use a Google account with a verified email address.',
  }[authError]

  return (
    <div className="account-page">
      <section className="page-heading account-heading">
        <div className="eyebrow"><span>03</span> Private access</div>
        <h1>Client account.</h1>
        <p>One secure place for your conversations with McMullin Estates.</p>
      </section>

      <section className="account-panel" aria-live="polite">
        {account.status === 'loading' && (
          <div className="account-loading"><span /><p>Checking your account…</p></div>
        )}

        {account.status === 'error' && (
          <div className="account-message">
            <span className="account-kicker">Connection unavailable</span>
            <h2>We couldn’t load your account.</h2>
            <p>Please confirm the backend is running and try again.</p>
          </div>
        )}

        {account.status === 'signed-out' && (
          <div className="account-message">
            <span className="account-kicker">Private client access</span>
            <h2>Welcome to McMullin Estates.</h2>
            <p>Sign in securely with your Google account to continue.</p>
            <a className="google-button" href="/auth/google">
              <span aria-hidden="true">G</span> Continue with Google
            </a>
            {errorMessage && <p className="auth-error">{errorMessage}</p>}
          </div>
        )}

        {account.status === 'signed-in' && (
          <div className="account-profile">
            {account.user.picture ? (
              <img src={account.user.picture} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="account-avatar">{account.user.name.charAt(0)}</div>
            )}
            <div>
              <span className="account-kicker">Signed in with Google</span>
              <h2>{account.user.name}</h2>
              <p>{account.user.email}</p>
            </div>
            <button
              className="sign-out-button"
              type="button"
              onClick={signOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? 'Signing out…' : 'Sign out'}
            </button>
            {signOutError && (
              <p className="sign-out-error" role="alert">Couldn’t sign out. Please try again.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname + window.location.search)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname + window.location.search)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#0c0b0a' : '#f2ede5',
    )
    localStorage.setItem('theme', theme)
  }, [theme])

  const pathname = path.split('?')[0]
  const currentPath = ['/users', '/account'].includes(pathname) ? pathname : '/'

  let currentPage = <HomePage setPath={setPath} />
  if (currentPath === '/users') currentPage = <UsersPage />
  if (currentPath === '/account') currentPage = <AccountPage />

  return (
    <Layout
      path={currentPath}
      setPath={setPath}
      theme={theme}
      toggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
    >
      {currentPage}
    </Layout>
  )
}

export default App
