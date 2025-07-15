import type { Auth } from "../models";

export class AuthService {
  static async login(credentials: Auth) {
    // Simulación de login: acepta cualquier usuario/contraseña
    localStorage.setItem("isLoggedIn", "true");
    return Promise.resolve();
  }

  static async logout() {
    // Simulación de logout
    localStorage.removeItem("isLoggedIn");
    return Promise.resolve();
  }

  static async check() {
    // Simulación de verificación de sesión
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      throw new Error("No autenticado");
    }
    return Promise.resolve();
  }
}
