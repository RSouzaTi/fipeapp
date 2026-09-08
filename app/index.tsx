import FipeScreen from "@/components/FipeScreen";
import VehicleTypeSelector, {
  VehicleType,
} from "@/components/VehicleTypeSelector";
import { Marca } from "@/modelos";
import { fetcher } from "@/services/fetcher";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import useSWR from "swr";

export default function Index() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState<VehicleType>("carros");

  const { data, error, isLoading, mutate } = useSWR<Marca[]>(
    `/${vehicleType}/marcas`,
    fetcher,
    {
      dedupingInterval: 60_000,
    },
  );

  const goNext = (codigo: string, nome?: string) => {
    router.navigate({
      pathname: "/modelos",
      params: {
        tipo: vehicleType,
        codigoMarca: codigo,
        nomeMarca: nome ?? "",
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
      step={1}
      headerSlot={
        <VehicleTypeSelector
          selected={vehicleType}
          onSelect={setVehicleType}
        />
      }
      searchPlaceholder="Buscar marca (ex: Fiat, Honda, Volvo)..."
    />
  );
}
