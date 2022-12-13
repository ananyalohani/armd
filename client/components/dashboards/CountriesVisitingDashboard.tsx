import { Card, CardBody, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

type Props = {};

const countries = [
  {
    country: 'United States',
    count: 10,
  },
  {
    country: 'United Kingdom',
    count: 4,
  },
  {
    country: 'Canada',
    count: 3,
  },
  {
    country: 'India',
    count: 24,
  },
].sort((a, b) => b.count - a.count);

export default function CountriesVisitingDashboard({}: Props) {
  const [countries, setCountries] = useState<any[]>([]);

  const fetchCountries = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/countries`
    );
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchCountries();
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
          borderColor='orange.200'
        >
          <Heading fontSize='md'>Countries Visiting</Heading>
          <Text fontSize='sm'>
            Shows the 5 most commonly visiting countries to your website.
          </Text>
        </VStack>
        <Flex alignItems='center' justifyContent='center'>
          <div style={{ height: 360, width: 360 }}>
            <Doughnut
              className='doughnut'
              options={{
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: true,
                    position: 'right',
                  },
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
              data={{
                labels: countries.map((c) => c.country),
                datasets: [
                  {
                    label: 'Countries',
                    data: countries.map((c) => c.count),
                    backgroundColor: [
                      '#F6AD5595',
                      '#63b3ed95',
                      '#F5656595',
                      '#68D39195',
                      '#B794F495',
                    ],
                  },
                ],
              }}
            />
          </div>
        </Flex>
      </CardBody>
    </Card>
  );
}
