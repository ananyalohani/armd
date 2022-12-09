import { Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';

type Props = {};

export default function RouteViewsDashboard({}: Props) {
  const data = [
    {
      route: '/',
      count: 70,
    },
    {
      route: '/about',
      count: Math.floor(Math.random() * 50),
    },
    {
      route: '/contact',
      count: Math.floor(Math.random() * 50),
    },
    {
      route: '/blog',
      count: Math.floor(Math.random() * 50),
    },
    {
      route: '/shop',
      count: Math.floor(Math.random() * 50),
    },
  ].sort((a, b) => b.count - a.count);

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
            Shows the most commonly visited routes by your users over the past
            14 days.
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
            labels: data.map((d) => d.route),
            datasets: [
              {
                label: 'Route View',
                data: data.map((d) => d.count),
                backgroundColor: '#68D39195',
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
}
