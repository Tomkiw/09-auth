// перевіряє сесію через checkSession
// за потреби отримує дані користувача
// оновлює глобальний стан
// скидає його, якщо сесія не валідна

"use client";

import { getMe, checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isPrivate =
    pathname.startsWith("/notes") || pathname.startsWith("/profile");

  useEffect(() => {
    const fetchUser = async () => {
      //check sesion
      const isAuthenticade = await checkSession();
      if (isAuthenticade) {
        // Якщо сесія валідна — отримуємо користувача
        const user = await getMe();
        setLoading(false);
        if (user) setUser(user);
      } else {
        // Якщо сесія невалідна — чистимо стан
        clearIsAuthenticated();
        setLoading(false);
        if (isPrivate) {
          router.push("/sign-in");
        }
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated, router, isPrivate]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return children;
};

export default AuthProvider;
