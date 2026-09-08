import FipeScreen from "@/components/FipeScreen";
import { Marca } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { useRouter } from "expo-router";
import useSWR from "swr";

export default function Index() {
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR<Marca[]>(
    "/carros/marcas",
    fetcher,
    {
      dedupingInterval: 60_000, // 1 minute
    },
  );

  const goNext = (codigo: string) => {
    console.log("Codigo selecionado:", codigo);
    router.navigate({ pathname: "/modelos", params: { codigoMarca: codigo } });
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
