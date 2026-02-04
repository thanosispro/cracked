'use client';
import AdminNavigation from './AdminNavigation';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-32 space-y-4">
      <AdminNavigation />
      <h1 className="text-3xl font-bold text-white">Admin Settings</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <p className="text-gray-400">
          Settings page (dummy content for now).
        </p>

        <ul className="mt-4 space-y-2 text-sm text-gray-300">
          <li>• Change admin password (coming soon)</li>
          <li>• System preferences</li>
          <li>• Audit logs</li>
        </ul>
      </div>
    </div>
  );
}
