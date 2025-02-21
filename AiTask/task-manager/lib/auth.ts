export const fakeLogin = (email: string, password: string) => {
    if (email === "test@example.com" && password === "password") {
      const fakeToken = "fake-jwt-token"; // Simulating a token
      localStorage.setItem("token", fakeToken);
      return { token: fakeToken, user: { email } };
    }
    throw new Error("Invalid credentials");
  };

  export const logout = () => {
    localStorage.removeItem("token");
  };
