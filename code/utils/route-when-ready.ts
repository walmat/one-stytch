import { Href, router } from "one";
import { Platform } from "react-native";

export const routeWhenReady = ({ path }: { path: Href }) => {
  if (Platform.OS === "ios") {
    setTimeout(() => {
      router.replace(path);
    }, 1);
  } else {
    setImmediate(() => {
      router.replace(path);
    });
  }
};
