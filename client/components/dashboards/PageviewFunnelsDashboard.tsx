import { Card, CardBody, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

type Props = {};

export default function PageviewFunnelsDashboard({}: Props) {
  const [funnel, setFunnel] = useState<number[]>([]);

  const fetchFunnel = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/funnels`);
    const data = await res.json();
    setFunnel(data.slice(0, 5));
  };

  useEffect(() => {
    fetchFunnel();
  }, []);

  return (
    <Card backgroundColor="white">
      <CardBody>
        <VStack
          alignItems="start"
          borderLeftWidth={4}
          pl="3"
          py="1"
          mb="2"
          borderColor="green.200"
        >
          <Heading fontSize="md">Pageview Funnels</Heading>
        </VStack>
        <Bar
          options={{
            indexAxis: "y",
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: funnel.map((_, i) => `Pageview ${i + 1}`),
            datasets: [
              {
                label: "Pageview",
                data: funnel,
                backgroundColor: [
                  "#F6AD5595",
                  "#63b3ed95",
                  "#F5656595",
                  "#68D39195",
                  "#B794F495",
                ],
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
}
