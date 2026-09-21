import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"

const Login = lazy(() => import("../pages/public/Login"))
const Register = lazy(() => import("../pages/public/Register"))

const ComplainantDashboard = lazy(() =>
  import("../pages/complainant/Dashboard")
)

const NewComplaint = lazy(() =>
  import("../pages/complainant/NewComplaint")
)

const MyCases = lazy(() =>
  import("../pages/complainant/MyCases")
)

const CaseDetail = lazy(() =>
  import("../pages/complainant/CaseDetail")
)

const Forbidden = lazy(() =>
  import("../pages/Forbidden")
)

const NotFound = lazy(() =>
  import("../pages/NotFound")
)

function LoadingPage() {
  return (
    <main
      className="
        min-h-screen bg-slate-50
        flex items-center justify-center p-4
      "
    >
      <p
        role="status"
        aria-live="polite"
        className="font-medium text-slate-700"
      >
        Cargando...
      </p>
    </main>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Register />}
        />

        <Route
          path="/mi"
          element={<ComplainantDashboard />}
        />

        <Route
          path="/mi/nueva-denuncia"
          element={<NewComplaint />}
        />

        <Route
          path="/mi/casos"
          element={<MyCases />}
        />

        <Route
          path="/mi/casos/:caseId"
          element={<CaseDetail />}
        />

        <Route
          path="/403"
          element={<Forbidden />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  )
}