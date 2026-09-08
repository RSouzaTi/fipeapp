import { colors, radii } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
  contextText?: string;
}

const STEPS = [
  { step: 1, label: "Marca" },
  { step: 2, label: "Modelo" },
  { step: 3, label: "Ano" },
  { step: 4, label: "Detalhes" },
];

export default function StepIndicator({
  currentStep,
  contextText,
}: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {/* Steps bar */}
      <View style={styles.stepsRow}>
        {STEPS.map((s, index) => {
          const isCompleted = s.step < currentStep;
          const isCurrent = s.step === currentStep;

          return (
            <React.Fragment key={s.step}>
              {/* Line connector between steps */}
              {index > 0 && (
                <View
                  style={[
                    styles.connector,
                    isCompleted || isCurrent
                      ? styles.connectorActive
                      : styles.connectorInactive,
                  ]}
                />
              )}

              {/* Step Circle & Label */}
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.circle,
                    isCompleted && styles.circleCompleted,
                    isCurrent && styles.circleCurrent,
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={colors.textInverted}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        isCurrent && styles.stepNumberCurrent,
                      ]}
                    >
                      {s.step}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    isCurrent && styles.stepLabelCurrent,
                    isCompleted && styles.stepLabelCompleted,
                  ]}
                  numberOfLines={1}
                >
                  {s.label}
                </Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>

      {/* Context Banner (e.g., Selected brand or model) */}
      {contextText ? (
        <View style={styles.contextBadge}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={colors.primaryLight}
            style={styles.contextIcon}
          />
          <Text style={styles.contextText} numberOfLines={1}>
            {contextText}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  connector: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    marginBottom: 16, // align with circle centers
  },
  connectorActive: {
    backgroundColor: colors.primaryLight,
  },
  connectorInactive: {
    backgroundColor: colors.border,
  },
  stepItem: {
    alignItems: "center",
    minWidth: 54,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: radii.full,
    backgroundColor: colors.cardAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  circleCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  circleCurrent: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  stepNumberCurrent: {
    color: colors.textInverted,
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
  },
  stepLabelCurrent: {
    color: colors.primaryLight,
    fontWeight: "700",
  },
  stepLabelCompleted: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  contextBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.md,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  contextIcon: {
    marginRight: 6,
  },
  contextText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    flex: 1,
  },
});
