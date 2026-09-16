# Complaint Management System — Frontend (React)

A Vite + React single-page app that talks to the API in `../backend`.

## Setup

```
npm install
cp .env.example .env   # adjust VITE_API_URL if your backend isn't on :3000
npm run dev
```

Runs at `http://localhost:5173`. Make sure the backend is running too (see
`../backend/README.md`) and that its `FRONTEND_URL` matches this URL, or
the session cookie won't be accepted cross-origin.

## Structure

```
src/
  api/client.js               fetch wrapper — sends cookies, parses JSON, throws on errors
  context/AuthContext.jsx      user session state (register/login/logout)
  context/AdminAuthContext.jsx admin session state — kept separate from user auth
  components/Nav.jsx           adapts for guest / logged-in user / admin
  components/ProtectedRoute.jsx  client-side redirect for user-only pages
  components/AdminRoute.jsx      client-side redirect for admin-only pages
  pages/                        Home, Register, Login, Dashboard, Success, 404
  pages/admin/                  Admin login, dashboard, complaints list, complaint details
  styles/index.css              shared design system
```

## Notes

- `ProtectedRoute` / `AdminRoute` only control what renders in the browser.
  The real enforcement is server-side — every backend route re-checks the
  session, so there's no way to reach real data just by visiting a URL.
- The complaint submission flow uses `navigate(..., { replace: true })` to
  the success page after a successful POST — refreshing that page only ever
  re-fetches the complaint (`GET /api/complaints/:id`), so it can't resubmit.
