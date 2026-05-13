import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthContext, useAdminAuthState } from './auth/useAdminAuth';
import AdminLogin     from './auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UsersPage      from './pages/UsersPage';
import AgentsPage     from './pages/AgentsPage';
import AnalyticsPage  from './pages/AnalyticsPage';
import ApiMonitorPage from './pages/ApiMonitorPage';
import ContentPage    from './pages/ContentPage';
import LogsPage       from './pages/LogsPage';
import BillingPage    from './pages/BillingPage';
import SystemPage     from './pages/SystemPage';
import SettingsPage   from './pages/SettingsPage';
import AiManagePage   from './pages/AiManagePage';
import MediaPage      from './pages/MediaPage';

function RequireAuth({ children }) {
  const { authed } = useAdminAuthState();
  return authed ? children : <Navigate to="/admin/login" replace />;
}

export default function AdminApp() {
  const auth = useAdminAuthState();

  return (
    <AdminAuthContext.Provider value={auth}>
      <Routes>
        <Route path="login" element={auth.authed ? <Navigate to="/admin" replace /> : <AdminLogin />} />
        <Route path="*" element={
          auth.authed ? (
            <Routes>
              <Route index             element={<AdminDashboard />} />
              <Route path="users"      element={<UsersPage />} />
              <Route path="agents"     element={<AgentsPage />} />
              <Route path="analytics"  element={<AnalyticsPage />} />
              <Route path="api"        element={<ApiMonitorPage />} />
              <Route path="content"    element={<ContentPage />} />
              <Route path="logs"       element={<LogsPage />} />
              <Route path="billing"    element={<BillingPage />} />
              <Route path="system"     element={<SystemPage />} />
              <Route path="settings"   element={<SettingsPage />} />
              <Route path="ai"         element={<AiManagePage />} />
              <Route path="media"      element={<MediaPage />} />
              <Route path="*"          element={<Navigate to="/admin" replace />} />
            </Routes>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        } />
      </Routes>
    </AdminAuthContext.Provider>
  );
}
