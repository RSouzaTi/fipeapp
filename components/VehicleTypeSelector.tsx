import { colors, radii, shadows } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type VehicleType = "carros" | "motos" | "caminhoes";

interface VehicleTypeSelectorProps {
  selected: VehicleType;
  onSelect: (type: VehicleType) => void;
}

const VEHICLE_OPTIONS: {
  id: VehicleType;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  { id: "carros", label: "Carros", icon: "car" },
  { id: "motos", label: "Motos", icon: "motorbike" },
  { id: "caminhoes", label: "Caminhões", icon: "truck" },
];

export default function VehicleTypeSelector({
  selected,
  onSelect,
}: VehicleTypeSelectorProps) {
  const handleSelect = (type: VehicleType) => {
    if (type !== selected) {
      try {
        Haptics.selectionAsync();
      } catch {
        // Haptics not available on some web platforms
      }
      onSelect(type);
    }
  };

  return (
    <View style={styles.container}>
      {VEHICLE_OPTIONS.map((item) => {
        const isSelected = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSelect(item.id)}
            activeOpacity={0.7}
            style={[
              styles.tabButton,
              isSelected && styles.tabButtonActive,
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={17}
              color={isSelected ? colors.textInverted : colors.textSecondary}
              style={styles.icon}
            />
            <Text
              style={[
                styles.tabText,
                isSelected && styles.tabTextActive,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.cardAlt,
    borderRadius: radii.lg,
    padding: 4,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 4,
    borderRadius: radii.md,
    overflow: "hidden",
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
    ...shadows.card,
  },
  icon: {
    marginRight: 4,
    flexShrink: 0,
  },
  tabText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.textSecondary,
    flexShrink: 1,
  },
  tabTextActive: {
    color: colors.textInverted,
    fontWeight: "700",
  },
});
