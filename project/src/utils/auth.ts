export interface User {
  id: string;
  email: string;
  name: string;
}

export const auth = {
  user: null as User | null,
  
  async login(email: string, password: string): Promise<User> {
    // Simulated login - in a real app, this would call an API
    const user = { id: '1', email, name: email.split('@')[0] };
    this.user = user;
    return user;
  },

  async logout() {
    this.user = null;
  },

  isAuthenticated() {
    return !!this.user;
  }
};