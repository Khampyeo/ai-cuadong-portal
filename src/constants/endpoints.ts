export const ENDPOINTS = {
  //Authentication
  LOGIN: "/account/login",
  LOGOUT: "/account/logout",
  //Profile
  MY_PROFILE: "/account/my-profile",
  //Document management
  DOCUMENT: {
    LIST: "/app/document",
    CREATE: "/app/document",
    GET_BY_ID: "/app/document/{id}",
    UPDATE: "/app/document/{id}",
    DELETE: "/app/document/{id}",
  },
  TENANTS: {
    LIST: "/multi-tenancy/tenants",
    CREATE: "/multi-tenancy/tenants",
    UPDATE: "/multi-tenancy/tenants/{id}",
    DELETE: "/multi-tenancy/tenants/{id}",
    GET_BY_ID: "/multi-tenancy/tenants/{id}",
  },
  ROLES: {
    LIST: "/identity/roles",
    CREATE: "/identity/roles",
    UPDATE: "/identity/roles/{id}",
    DELETE: "/identity/roles/{id}",
    GET_BY_ID: "/identity/roles/{id}",
    GET_PERMISSIONS: "/permission-management/permissions",
    UPDATE_PERMISSIONS: "/permission-management/permissions",
  },
  //Chunk
  CHUNK: {
    LIST: "/app/document-chunk",
    CREATE: "/app/document-chunk",
    GET_BY_ID: "/app/document-chunk/{id}",
    UPDATE: "/app/document-chunk/{id}",
    DELETE: "/app/document-chunk/{id}",
  },
  //Users
  USERS: {
    LIST: "/identity/users",
    CREATE: "/identity/users",
    UPDATE: "/identity/users/{id}",
    DELETE: "/identity/users/{id}",
    GET_BY_ID: "/identity/users/{id}",
    GET_ROLE_BY_ID: "/identity/users/{id}/roles",
    ASSIGNABLE_ROLES: "/identity/users/assignable-roles",
  },
};
