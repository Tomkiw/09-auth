"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      router.push("/profile");
      setUser(user);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (formdata: FormData) => {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    setError("");
    mutation.mutate({ email, password });
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
