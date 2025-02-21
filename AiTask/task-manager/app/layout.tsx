import "./globals.css";

import { AuthProvider } from "../context/AuthContext";
import { TaskProvider } from "../context/TaskContext";
import Navbar from "../components/Navbar"; // ✅ Import the client component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TaskProvider>
            <Navbar /> {/* ✅ Now correctly used inside a client-provider */}
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
