import { Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {};

export default function ReferringDomainDashboard({}: Props) {
  const [domains, setDomains] = useState<any[]>([]);

  const fetchDomains = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/domains`
    );
    const data = await res.json();
    setDomains(data);
  };

  useEffect(() => {
    fetchDomains();
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
          borderColor='blue.200'
        >
          <Heading fontSize='md'>Referring domain</Heading>
          <Text fontSize='sm'>
            Shows the 5 most common referring domains for your users to your
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
            labels: domains.map((d) => d.domain),
            datasets: [
              {
                label: 'Referring Domain',
                data: domains.map((d) => d.count),
                backgroundColor: '#63b3ed95',
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
}
