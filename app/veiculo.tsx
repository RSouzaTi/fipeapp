import { Veiculo } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import useSWR from "swr";

export default function DetalhesVeiculo() {
  const router = useRouter();

  const { codigoMarca, codigoModelo, codigoAno } = useLocalSearchParams();

  const { data } = useSWR<Veiculo>(
    `/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`,
    fetcher,
    {
      dedupingInterval: 60_000, //3
    },
  );

  return (
    <View>
      <Text>Data: {data?.Marca}</Text>
      <Text>Data: {data?.Modelo}</Text>
      <Text>Data: {data?.AnoModelo}</Text>
      <Text>Data: {data?.Combustivel}</Text>
      <Text>Data: {data?.Valor}</Text>
    </View>
  );
}
