import FipeScreen from "@/components/FipeScreen";
import { Anos } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { useLocalSearchParams, useRouter } from "expo-router";
import useSWR from "swr";

export default function AnosDetalhes() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    tipo?: string;
    codigoMarca: string;
    nomeMarca?: string;
    codigoModelo: string;
    nomeModelo?: string;
  }>();

  const tipo = params.tipo || "carros";
  const { codigoMarca, nomeMarca, codigoModelo, nomeModelo } = params;

  const { data, error, isLoading, mutate } = useSWR<Anos[]>(
    `/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`,
    fetcher,
    {
      dedupingInterval: 60_000,
    },
  );

  const goNext = (codigo: string, nome?: string) => {
    router.navigate({
      pathname: "/veiculo" as any,
      params: {
        tipo,
        codigoMarca,
        nomeMarca: nomeMarca ?? "",
        codigoModelo,
        nomeModelo: nomeModelo ?? "",
        codigoAno: codigo,
        nomeAno: nome ?? "",
      },
    });
  };

  const contextText = [nomeMarca, nomeModelo].filter(Boolean).join(" • ");

  return (
    <FipeScreen
      data={data}
      goNext={goNext}
      error={error}
      isLoading={isLoading}
      update={mutate}
      step={3}
      contextText={contextText || undefined}
      searchPlaceholder="Buscar ano (ex: 2022, Gasolina, Flex)..."
    />
  );
}
