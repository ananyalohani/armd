import { Box, Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import format from 'date-fns/format';

type Props = {};

export default function ReferringDomainDashboard({}: Props) {
  const data = [
    {
      domain: 'direct',
      count: 20,
    },
    {
      domain: 'google.com',
      count: 10,
    },
    {
      domain: 'facebook.com',
      count: 5,
    },
    {
      domain: 'twitter.com',
      count: 3,
    },
  ];

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
          <Heading fontSize='md'>Referring Domain</Heading>
          <Text fontSize='sm'>
            Shows the most common referring domains for your users over the past
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
            labels: data.map((d) => d.domain),
            datasets: [
              {
                label: 'Referring Domain',
                data: data.map((d) => d.count),
                backgroundColor: '#63b3ed95',
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
}
