import FipeScreen from "@/components/FipeScreen";
import { Anos } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { useLocalSearchParams, useRouter } from "expo-router";
import useSWR from "swr";

export default function AnosDetalhes() {
  const router = useRouter();

  const { codigoMarca, codigoModelo } = useLocalSearchParams();

  const { data, error, isLoading, mutate } = useSWR<Anos[]>(
    `/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`,
    fetcher,
    {
      dedupingInterval: 60_000, //3
    },
  );

  const goNext = (codigo: string) => {
    router.navigate({
      pathname: "/veiculo" as any,
      params: {
        codigoMarca: codigoMarca,
        codigoModelo: codigoModelo,
        codigoAno: codigo,
      },
    });
  };

  return (
    <FipeScreen
      data={data}
      goNext={goNext}
      error={error}
      isLoading={isLoading}
      update={mutate}
    />
  );
}
