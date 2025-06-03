'use client';

import { useState } from 'react';
import { useUsers, useDeleteUser } from '@/hooks/useUsers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserForm } from './user-form';

interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status: string;
  emailVerified: boolean;
  loginCount: number;
  createdAt: string;
}

export function UserList() {
  const { users, loading, error, refetch } = useUsers();
  const { deleteUser, loading: deleteLoading } = useDeleteUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        await refetch();
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
    refetch();
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'suspended':
        return 'danger';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Error loading users: {error.message}
            </p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users ({users.length})</CardTitle>
            <Button onClick={handleCreateUser}>Add User</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found</p>
                <Button onClick={handleCreateUser} className="mt-4">
                  Create your first user
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {users.map((user: User) => (
                  <div
                    key={user.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.username || user.email}
                          </h3>
                          <Badge variant={getBadgeVariant(user.status)}>
                            {user.status}
                          </Badge>
                          <Badge
                            variant={user.emailVerified ? 'success' : 'warning'}
                          >
                            {user.emailVerified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Email:</span>{' '}
                            {user.email}
                          </p>
                          {user.username && (
                            <p>
                              <span className="font-medium">Username:</span>{' '}
                              {user.username}
                            </p>
                          )}
                          <p>
                            <span className="font-medium">Role:</span>{' '}
                            {user.role}
                          </p>
                          <p>
                            <span className="font-medium">Login Count:</span>{' '}
                            {user.loginCount}
                          </p>
                          <p>
                            <span className="font-medium">Created:</span>{' '}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          loading={deleteLoading}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isFormOpen && <UserForm user={selectedUser} onClose={handleCloseForm} />}
    </>
  );
}
