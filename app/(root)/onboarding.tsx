import { OnboardingScreen } from '~/code/auth/onboarding-screen'
import { Stack } from 'one'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Onboarding',
        }}
      />
      <OnboardingScreen />
    </>
  )
}
