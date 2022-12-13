import { Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {};

export default function RouteViewsDashboard({}: Props) {
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/paths`
      );
      const data = await res.json();
      setRoutes(data);
    };

    fetchRoutes();
  }, []);

  return (
    <Card backgroundColor='white'>
      <CardBody>
        <VStack
          alignItems='start'
          borderLeftWidth={4}
          pl='3'
          py='1'
          mb='2'
          borderColor='green.200'
        >
          <Heading fontSize='md'>Route views</Heading>
          <Text fontSize='sm'>
            Shows the 5 most commonly visited routes for your users on your
            website.
          </Text>
        </VStack>
        <Bar
          options={{
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: routes.map((d) => d.path),
            datasets: [
              {
                label: 'Route View',
                data: routes.map((d) => d.count),
                backgroundColor: '#68D39195',
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
}
