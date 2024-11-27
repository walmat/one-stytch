import { WalletMinimal } from "@tamagui/lucide-icons";
import { H2, Paragraph, YStack } from "tamagui";

export const OnboardingWalletStep = () => {
  return (
    <YStack
      ai="center"
      p="$8"
      fullscreen
      mx="auto"
      jc="center"
      animation="100ms"
      exitStyle={{ o: 0 }}
      o={1}
    >
      <YStack
        animation="lazy"
        y={0}
        enterStyle={{ scale: 0.8, y: -10, o: 0 }}
        exitStyle={{ scale: 0.8, y: -10, o: 0 }}
        o={1}
        scale={1}
      >
        <WalletMinimal col="$color9" size={96} />
      </YStack>
      <H2
        mt="$5"
        animation="bouncy"
        y={0}
        enterStyle={{ scale: 0.95, y: 4, o: 0 }}
        exitStyle={{ scale: 0.95, y: 4, o: 0 }}
        o={1}
        scale={1}
        size="$10"
        col="$color10"
        selectable={false}
        ta="center"
        $md={{
          size: "$10",
          mt: "$4",
          col: "$color10",
        }}
      >
        Get Started
      </H2>
      <Paragraph
        mt="$4"
        maw={520}
        mx="auto"
        animation="bouncy"
        y={0}
        enterStyle={{ scale: 0.95, y: -2, o: 0 }}
        exitStyle={{ scale: 0.95, y: -2, o: 0 }}
        o={1}
        scale={1}
        size="$6"
        lh="$8"
        ta="center"
        col="$color9"
        selectable={false}
        $md={{
          mt: "$3",
          col: "$color9",
        }}
      >
        Create or import your wallet to get started
      </Paragraph>
    </YStack>
  );
};
