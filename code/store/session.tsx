import React from "react";
import { useStytchUser, User, useStytch } from "@stytch/react-native";

const AuthContext = React.createContext<{
  sendCode: ({
    email,
  }: {
    email: string;
  }) => Promise<{ methodId: string; statusCode: number }>;
  loginWithCode: ({
    methodId,
    code,
  }: {
    methodId: string;
    code: string;
  }) => Promise<{ user: User | null; success: boolean }>;
  signOut: () => void;
  user?: User | null;
}>({
  sendCode: () => Promise.resolve({ methodId: "", statusCode: 0 }),
  loginWithCode: () => Promise.resolve({ user: null, success: false }),
  signOut: () => null,
  user: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const stytch = useStytch();
  const { user } = useStytchUser();

  return (
    <AuthContext.Provider
      value={{
        sendCode: async ({ email }) => {
          const { method_id, status_code } =
            await stytch.otps.email.loginOrCreate(email, {
              expiration_minutes: 5,
              // FIXME: Add email template here?
            });

          return {
            statusCode: status_code,
            methodId: method_id,
          };
        },
        loginWithCode: async ({ methodId, code }) => {
          const { status_code } = await stytch.otps.authenticate(
            code,
            methodId,
            {
              session_duration_minutes: 527040,
            }
          );

          if (status_code === 200) {
            return {
              user,
              success: true,
            };
          }

          return {
            user: null,
            success: false,
          };
        },
        signOut: () => {
          stytch.session.revoke();
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
