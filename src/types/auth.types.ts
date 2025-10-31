/**
 * Type Definitions
 * Following SoC: All types are defined in one place
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
