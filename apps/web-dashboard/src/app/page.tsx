import { Navbar } from '@/components/layout/navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome to your user management dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Status:</span>
                    <span className="text-green-600 font-medium">
                      Connected
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gateway:</span>
                    <span className="text-blue-600 font-medium">Running</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Service:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Gateway</span>
                    </div>
                    <span className="text-xs text-gray-500">:4000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">User Service</span>
                    </div>
                    <span className="text-xs text-gray-500">:4002</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm">Auth Service</span>
                    </div>
                    <span className="text-xs text-gray-500">Soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a
                    href="/users"
                    className="block w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">Manage Users</div>
                    <div className="text-xs text-gray-500">
                      View and edit users
                    </div>
                  </a>
                  <a
                    href="http://localhost:4000/graphql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">
                      GraphQL Playground
                    </div>
                    <div className="text-xs text-gray-500">
                      Test API queries
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
