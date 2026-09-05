import { styles } from "@/components/styles";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface IFipeScreen {
  data: [];
}

export default function FipeScreen({ data }: IFipeScreen) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const randerItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={styles.TextInput}
        placeholder="Buscar..."
      />
      <FlashList
        style={{ flex: 1 }}
        data={filteredData}
        renderItem={randerItem}
      />
    </View>
  );
}
