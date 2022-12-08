import { Box, Card, CardBody, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Line } from 'react-chartjs-2';
import format from 'date-fns/format';

type Props = {};

export default function ActiveUsersDashboard({}: Props) {
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    format(new Date(new Date().setDate(new Date().getDate() - i)), 'MMM dd')
  );

  return (
    <Card backgroundColor='white'>
      <CardBody>
        <VStack
          alignItems='start'
          borderLeftWidth={4}
          pl='3'
          py='1'
          mb='2'
          borderColor='purple.200'
        >
          <Heading fontSize='md'>Active users</Heading>
          <Text fontSize='sm'>
            Shows the number of unique users that use your app.
          </Text>
        </VStack>
        <Line
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            datasets: [
              {
                data: [13, 16, 28, 11, 9, 10, 4],
              },
            ],
            labels: last7Days,
          }}
        />
      </CardBody>
    </Card>
  );
}
