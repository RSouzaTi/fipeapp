import StepIndicator from "@/components/StepIndicator";
import { colors, radii, shadows } from "@/constants/theme";
import { Veiculo } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useSWR from "swr";

export default function DetalhesVeiculo() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    tipo?: string;
    codigoMarca: string;
    codigoModelo: string;
    codigoAno: string;
  }>();

  const tipo = params.tipo || "carros";
  const { codigoMarca, codigoModelo, codigoAno } = params;

  const { data, error, isLoading, mutate } = useSWR<Veiculo>(
    `/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`,
    fetcher,
    {
      dedupingInterval: 60_000,
    },
  );

  const handleShare = async () => {
    if (!data) return;
    try {
      Haptics.selectionAsync();
    } catch {}

    const message = [
      `🚗 Consulta Tabela FIPE Oficial`,
      `Veículo: ${data.Marca} ${data.Modelo}`,
      `Ano: ${data.AnoModelo}`,
      `Combustível: ${data.Combustivel}`,
      `Valor FIPE: ${data.Valor}`,
      `Código FIPE: ${data.CodigoFipe}`,
      `Mês de Referência: ${data.MesReferencia}`,
      `Autenticação: ${data.Autenticacao}`,
    ].join("\n");

    try {
      await Share.share({
        message,
        title: `Avaliação FIPE: ${data.Modelo}`,
      });
    } catch {
      Alert.alert("Erro", "Não foi possível compartilhar a avaliação.");
    }
  };

  const handleNewSearch = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    router.replace("/");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StepIndicator currentStep={4} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primaryLight} />
          <Text style={styles.loadingTitle}>Carregando avaliação...</Text>
          <Text style={styles.loadingSubtitle}>
            Buscando a cotação oficial na Tabela FIPE.
          </Text>
        </View>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.container}>
        <StepIndicator currentStep={4} />
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={56} color={colors.danger} />
          <Text style={styles.errorTitle}>Não foi possível consultar</Text>
          <Text style={styles.errorSubtitle}>
            {error?.message || "Ocorreu uma falha ao obter os dados do veículo."}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => mutate()}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StepIndicator currentStep={4} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Price Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.categoryBadge}>
              <MaterialCommunityIcons
                name={
                  tipo === "motos"
                    ? "motorbike"
                    : tipo === "caminhoes"
                    ? "truck"
                    : "car"
                }
                size={16}
                color={colors.primaryLight}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.categoryBadgeText}>
                {tipo === "motos"
                  ? "Moto"
                  : tipo === "caminhoes"
                  ? "Caminhão"
                  : "Carro"}
              </Text>
            </View>

            {data.MesReferencia ? (
              <View style={styles.refBadge}>
                <Text style={styles.refBadgeText} numberOfLines={1}>
                  {data.MesReferencia}
                </Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.vehicleBrand}>{data.Marca}</Text>
          <Text style={styles.vehicleModel}>{data.Modelo}</Text>

          <View style={styles.priceDivider} />

          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>PREÇO MÉDIO TABELA FIPE</Text>
            <Text style={styles.priceValue}>{data.Valor}</Text>
            <View style={styles.fipeVerifiedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.success}
              />
              <Text style={styles.fipeVerifiedText}>
                Preço oficial de mercado
              </Text>
            </View>
          </View>
        </View>

        {/* Technical Specs Card */}
        <View style={styles.specsCard}>
          <Text style={styles.specsSectionTitle}>Especificações</Text>

          <View style={styles.specItem}>
            <View style={styles.specIconWrapper}>
              <Ionicons name="calendar-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.specContent}>
              <Text style={styles.specLabel}>Ano do Modelo</Text>
              <Text style={styles.specValue}>{data.AnoModelo}</Text>
            </View>
          </View>

          <View style={styles.specDivider} />

          <View style={styles.specItem}>
            <View style={styles.specIconWrapper}>
              <MaterialCommunityIcons name="gas-station" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.specContent}>
              <Text style={styles.specLabel}>Combustível</Text>
              <Text style={styles.specValue}>{data.Combustivel}</Text>
            </View>
          </View>

          <View style={styles.specDivider} />

          <View style={styles.specItem}>
            <View style={styles.specIconWrapper}>
              <Ionicons name="barcode-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.specContent}>
              <Text style={styles.specLabel}>Código FIPE</Text>
              <Text style={styles.specValue}>{data.CodigoFipe}</Text>
            </View>
          </View>

          <View style={styles.specDivider} />

          <View style={styles.specItem}>
            <View style={styles.specIconWrapper}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.primaryLight} />
            </View>
            <View style={styles.specContent}>
              <Text style={styles.specLabel}>Autenticação</Text>
              <Text style={[styles.specValue, styles.authCode]}>
                {data.Autenticacao}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.shareButtonText}>Compartilhar Cotação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newSearchButton}
            onPress={handleNewSearch}
            activeOpacity={0.8}
          >
            <Ionicons
              name="refresh-outline"
              size={20}
              color={colors.textInverted}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.newSearchButtonText}>Nova Consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  loadingTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 6,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radii.md,
  },
  retryButtonText: {
    color: colors.textInverted,
    fontWeight: "600",
    fontSize: 14,
  },

  // Hero Price Card
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.cardHover,
    marginBottom: 16,
  },
  heroBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryMuted,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryLight,
  },
  refBadge: {
    backgroundColor: colors.cardAlt,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.full,
  },
  refBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  vehicleBrand: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  vehicleModel: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 2,
    lineHeight: 28,
  },
  priceDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  priceSection: {
    alignItems: "center",
    backgroundColor: colors.successLight,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  priceLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.success,
    letterSpacing: 1,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.success,
    letterSpacing: -0.5,
  },
  fipeVerifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  fipeVerifiedText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.success,
    marginLeft: 4,
  },

  // Specs Card
  specsCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
    marginBottom: 20,
  },
  specsSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  specIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  specContent: {
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    marginBottom: 2,
  },
  specValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  authCode: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  specDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 12,
  },

  // Actions
  actionsContainer: {
    gap: 12,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 14,
    ...shadows.card,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  newSearchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 14,
    ...shadows.cardHover,
  },
  newSearchButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textInverted,
  },
});
