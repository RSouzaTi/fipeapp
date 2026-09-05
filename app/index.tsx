import FipeScreen from "@/components/FipeScreen";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const data = [
    { title: "um" },
    { title: "dois" },
    { title: "tres" },
    { title: "quatro" },
    { title: "cinco" },
  ];

  return <FipeScreen data={data} />;
}
