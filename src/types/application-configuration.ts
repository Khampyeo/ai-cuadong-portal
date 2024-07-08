type CurrentUser = {
  email?: string;
  emailVerified: boolean;
  id?: string;
  impersonatorTenantId?: string;
  impersonatorTenantName?: string;
  impersonatorUserId?: string;
  impersonatorUserName?: string;
  isAuthenticated: boolean;
  name?: string;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  roles: string[];
  sessionId?: string;
  surName?: string;
  tenantId?: string;
  userName?: string;
};

export type ApplicationConfiguration = {
  auth: {
    grantedPolicies: Record<string, boolean>;
  };
  currentTenant: {
    id?: string;
    name?: string;
    isAvailable: boolean;
  };
  currentUser: CurrentUser;
  features: {
    values: Record<string, string>;
  };
  globalFeatures: {
    enabledFeatures: string[];
  };
  setting: {
    values: Record<string, string>;
  };
};
