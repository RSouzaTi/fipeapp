import { colors } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.primaryLight,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
            color: colors.textPrimary,
          },
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Consulta FIPE",
          }}
        />
        <Stack.Screen
          name="modelos"
          options={{
            title: "Selecione o Modelo",
          }}
        />
        <Stack.Screen
          name="anos"
          options={{
            title: "Ano e Versão",
          }}
        />
        <Stack.Screen
          name="veiculo"
          options={{
            title: "Avaliação FIPE",
          }}
        />
      </Stack>
    </>
  );
}
