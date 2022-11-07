import { PocketbaseClient } from "../lib/pocketbase.client"
import { LoginInput, UserRegistration } from "../types/auth";

export function useAuth() {
    const pb = PocketbaseClient.getInstance();

    return {
        auth: async (login: LoginInput) =>  {
            return await pb.client.users.authViaEmail(login.email, login.password);
        },

        register: async (registration: UserRegistration) => {
            if(registration.password !== registration.passwordConfirmation)
                return "Invalid password confirmation";

            return await pb.client.users.create({
                email: registration.email,
                password: registration.password
            });
        }
    }
}