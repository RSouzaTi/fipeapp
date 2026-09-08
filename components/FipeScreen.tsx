import StepIndicator from "@/components/StepIndicator";
import { styles as importedStyles } from "@/components/styles";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const styles = importedStyles as unknown as Record<string, any>;

export interface IFipeItem {
  codigo: string;
  nome: string;
}

interface IFipeScreen {
  data?: IFipeItem[];
  goNext?: (codigo: string, nome?: string) => void;
  error?: Error;
  isLoading?: boolean;
  update?: () => void;
  step?: 1 | 2 | 3 | 4;
  contextText?: string;
  headerSlot?: React.ReactNode;
  searchPlaceholder?: string;
}

function getAvatarInitials(name: string): string {
  if (!name) return "--";
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function FipeScreen({
  data,
  goNext,
  error,
  isLoading,
  update,
  step,
  contextText,
  headerSlot,
  searchPlaceholder = "Buscar...",
}: IFipeScreen) {
  const [search, setSearch] = useState("");

  const filteredData = data?.filter((item) =>
    item?.nome?.toLowerCase().includes(search.toLowerCase().trim()),
  );

  const handlePress = (item: IFipeItem) => {
    try {
      Haptics.selectionAsync();
    } catch {
      // Haptics safe fallback
    }
    goNext?.(item.codigo, item.nome);
  };

  const renderItem = ({ item }: { item: IFipeItem }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={styles.itemCard}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getAvatarInitials(item.nome)}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.nome}
        </Text>
      </View>
      <View style={styles.chevronContainer}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );

  // Initial Loading State (when no data has loaded yet)
  if (isLoading && (!data || data.length === 0)) {
    return (
      <View style={styles.container}>
        {step && <StepIndicator currentStep={step} contextText={contextText} />}
        {headerSlot}
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primaryLight} />
          <Text style={styles.stateTitle}>Consultando dados...</Text>
          <Text style={styles.stateMessage}>
            Buscando informações atualizadas na tabela FIPE.
          </Text>
        </View>
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.container}>
        {step && <StepIndicator currentStep={step} contextText={contextText} />}
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={54} color={colors.danger} />
          <Text style={styles.stateTitle}>Não foi possível carregar</Text>
          <Text style={styles.stateMessage}>
            {error.message || "Ocorreu um erro ao carregar as informações."}
          </Text>
          {update && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={update}
              activeOpacity={0.8}
            >
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {step && <StepIndicator currentStep={step} contextText={contextText} />}
      {headerSlot}

      {/* Search Input Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.textInput}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textMuted}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Results Counter */}
        {data && data.length > 0 && (
          <Text style={styles.resultsCount}>
            {filteredData ? filteredData.length : 0}{" "}
            {filteredData?.length === 1
              ? "item encontrado"
              : "itens encontrados"}
          </Text>
        )}
      </View>

      {/* Empty Search Results State */}
      {filteredData && filteredData.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="search-outline" size={48} color={colors.textMuted} />
          <Text style={styles.stateTitle}>Nenhum resultado</Text>
          <Text style={styles.stateMessage}>
            {`Não encontramos nenhum item correspondente a "${search}".`}
          </Text>
        </View>
      ) : (
        <FlashList
          data={filteredData ?? []}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={isLoading ?? false}
              onRefresh={update}
              colors={[colors.primaryLight]}
              tintColor={colors.primaryLight}
            />
          }
        />
      )}
    </View>
  );
}
