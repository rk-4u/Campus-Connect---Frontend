import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext"; // ✅ Add this
import GlobalLoader from "./components/common/GlobalLoader"; // ✅ Add this
import "./components/common/Loader.css"; // ✅ Import the loader CSS

// Layout Components
import AdminLayout from "./components/layout/AdminLayout";
import CompanyLayout from "./components/layout/CompanyLayout";
import StudentLayout from "./components/layout/StudentLayout";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import PlacementStats from "./components/admin/PlacementStats";
import PlacementDrives from "./components/admin/PlacementDrives";
import CreatePlacementDrive from "./components/admin/CreatePlacementDrive";

// Company Pages
import CompanyDashboard from "./pages/company/CompanyDashboard";
import JobPostForm from "./components/company/JobPostForm";
import CompanyJobsList from "./components/company/CompanyJobsList";
import ApplicantsList from "./components/company/ApplicantsList";
import ScheduleInterview from "./components/company/ScheduleInterview";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import JobsList from "./components/student/JobsList";
import MyApplications from "./components/student/MyApplications";
import ApplyJobForm from "./components/student/ApplyJobForm";

// Common Components
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFound from "./components/common/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <LoaderProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login/:role" element={<LoginPage />} />
            <Route path="/register/:role" element={<RegisterPage />} />
            <Route
              path="/login"
              element={<Navigate to="/login/student" replace />}
            />
            <Route
              path="/register"
              element={<Navigate to="/register/student" replace />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="stats" element={<PlacementStats />} />
              <Route path="drives" element={<PlacementDrives />} />
              <Route
                path="drives/create"
                element={<CreatePlacementDrive />}
              />
            </Route>

            {/* Company Routes */}
            <Route
              path="/company"
              element={
                <ProtectedRoute requiredRole="company">
                  <CompanyLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="post-job" element={<JobPostForm />} />
              <Route path="jobs" element={<CompanyJobsList />} />
              <Route
                path="jobs/:jobId/applicants"
                element={<ApplicantsList />}
              />
              <Route
                path="schedule-interview"
                element={<ScheduleInterview />}
              />
            </Route>

            {/* Student Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="jobs" element={<JobsList />} />
              <Route path="jobs/:jobId/apply" element={<ApplyJobForm />} />
              <Route path="applications" element={<MyApplications />} />
            </Route>

            {/* Fallback Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LoaderProvider>
    </AuthProvider>
  );
};

export default App;
