"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const EditPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (user) => {
      router.push("/profile");
      setUser(user);
    },

    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = async (formdata: FormData) => {
    const username = formdata.get("username") as string;

    mutation.mutate({ username });
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar ?? "../default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username ?? ""}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                router.back()
              }
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditPage;
