const AUTH_KEY = 'demo_auth';

const CREDENTIALS = {
  email: 'student@demo.rs',
  password: 'student123',
};

export interface AuthUser {
  email: string;
  name: string;
}

export function login(email: string, password: string): AuthUser | null {
  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
    const user: AuthUser = { email, name: 'Student' };
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
