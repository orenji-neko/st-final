import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      {/* Role-based content */}
      {session.role === "ADMIN" ? (
        /* ADMIN */
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <h2 className="font-bold text-lg">Admin Dashboard</h2>
          <p>Welcome, Administrator! You have access to all features.</p>
          <ul className="mt-2 list-disc list-inside">
            <li>User Management</li>
            <li>System Settings</li>
            <li>Analytics & Reports</li>
            <li>Database Administration</li>
          </ul>
        </div>
      ) : (
        /* USER */
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h2 className="font-bold text-lg">User Dashboard</h2>
          <p>Welcome! Here&apos;s your personal dashboard.</p>
          <ul className="mt-2 list-disc list-inside">
            <li>Profile Settings</li>
            <li>Your Activities</li>
            <li>Personal Statistics</li>
            <li>Account Preferences</li>
          </ul>
        </div>
      )}

      {/* Common content for all roles */}
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Common Features</h3>
        <p>All users can access these features:</p>
        <ul className="mt-2 list-disc list-inside">
          <li>Profile Management</li>
          <li>Basic Settings</li>
          <li>Help & Support</li>
        </ul>
      </div>

      {/* Debug info (remove in production) */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Logged in as: {session.userId}</p>
        <p>Role: {session.role}</p>
      </div>
    </div>
  );
}
