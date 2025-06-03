import { Navbar } from '@/components/layout/navbar';
import { UserList } from '@/components/users/user-list';

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 text-gray-600">Manage your application users</p>
          </div>
          <UserList />
        </div>
      </main>
    </div>
  );
}
