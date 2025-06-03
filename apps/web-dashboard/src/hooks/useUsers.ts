/* eslint-disable @typescript-eslint/no-explicit-any */
// apps/web-dashboard/src/hooks/useUsers.ts
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL Queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      username
      firstName
      lastName
      displayName
      role
      status
      emailVerified
      phoneVerified
      loginCount
      lastLoginAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      firstName
      lastName
      displayName
      avatar
      phoneNumber
      role
      status
      emailVerified
      phoneVerified
      loginCount
      lastLoginAt
      createdAt
      updatedAt
    }
  }
`;

// GraphQL Mutations
export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      username
      firstName
      lastName
      role
      status
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      email
      username
      firstName
      lastName
      displayName
      avatar
      phoneNumber
      role
      status
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    removeUser(id: $id)
  }
`;

// Custom Hooks
export function useUsers() {
  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  return {
    users: data?.users || [],
    loading,
    error,
    refetch,
  };
}

export function useUser(id: string) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    skip: !id,
    errorPolicy: 'all',
  });

  return {
    user: data?.user,
    loading,
    error,
  };
}

export function useCreateUser() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    errorPolicy: 'all',
  });

  return {
    createUser: (input: any) =>
      createUser({ variables: { createUserInput: input } }),
    loading,
    error,
  };
}

export function useUpdateUser() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    errorPolicy: 'all',
  });

  return {
    updateUser: (input: any) =>
      updateUser({ variables: { updateUserInput: input } }),
    loading,
    error,
  };
}

export function useDeleteUser() {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    errorPolicy: 'all',
  });

  return {
    deleteUser: (id: string) => deleteUser({ variables: { id } }),
    loading,
    error,
  };
}
