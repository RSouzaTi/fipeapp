import FipeScreen from "@/components/FipeScreen";
import { DetalhesMarca } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import useSWR from "swr";

export default function Modelos() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    tipo?: string;
    codigoMarca: string;
    nomeMarca?: string;
  }>();

  const tipo = params.tipo || "carros";
  const { codigoMarca, nomeMarca } = params;

  const { data, error, isLoading, mutate } = useSWR<DetalhesMarca>(
    `/${tipo}/marcas/${codigoMarca}/modelos`,
    fetcher,
    {
      dedupingInterval: 60_000,
    },
  );

  const goNext = (codigo: string, nome?: string) => {
    router.navigate({
      pathname: "/anos" as any,
      params: {
        tipo,
        codigoMarca,
        nomeMarca: nomeMarca ?? "",
        codigoModelo: codigo,
        nomeModelo: nome ?? "",
      },
    });
  };

  return (
    <FipeScreen
      data={data?.modelos}
      goNext={goNext}
      error={error}
      isLoading={isLoading}
      update={mutate}
      step={2}
      contextText={nomeMarca ? `Marca: ${nomeMarca}` : undefined}
      searchPlaceholder="Buscar modelo (ex: Palio, Civic, Gol)..."
    />
  );
}
