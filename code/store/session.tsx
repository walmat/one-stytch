import React, { useEffect } from "react";
import { useStytchUser, User, useStytch } from "@stytch/react-native";
import { Href, router } from "one";
import { useSegments } from "one";
import { Platform } from "react-native";

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

  useProtectedRoute(user);

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

export function useProtectedRoute(user: User | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    console.log("inAuthGroup", inAuthGroup, user);

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      replaceRoute("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      replaceRoute("/");
    }
  }, [user, segments]);
}

/**
 * temporary fix
 *
 * see https://github.com/expo/router/issues/740
 * see https://github.com/expo/router/issues/745
 *  */
const replaceRoute = (href: Href) => {
  if (Platform.OS === "ios") {
    setTimeout(() => {
      router.replace(href);
    }, 1);
  } else {
    setImmediate(() => {
      router.replace(href);
    });
  }
};
