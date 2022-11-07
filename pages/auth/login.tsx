import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoginInput } from "../../types/auth";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const auth = useAuth();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await auth.auth(loginForm);
    console.log("form", response);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-gray-800 p-4 rounded-md"
      >
        <h1 className="font-semibold text-center">Login</h1>
        <input
          onChange={(e) =>
            setLoginForm((form) => ({ ...form, email: e.target.value }))
          }
          type="text"
          className="input"
          placeholder="Email"
        />
        <input
          onChange={(e) =>
            setLoginForm((form) => ({ ...form, password: e.target.value }))
          }
          type="password"
          className="input"
          placeholder="Password"
        />
        <input
          type="submit"
          role="button"
          value="Logar"
          className="p-2 rounded-md text-center bg-green-700"
        />
      </form>
    </div>
  );
}
