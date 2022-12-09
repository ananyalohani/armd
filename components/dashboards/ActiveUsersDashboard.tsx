import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import format from 'date-fns/format';

type TimePeriod = 'week' | 'fortnight' | 'month';

export default function ActiveUsersDashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const dateRange = Array.from(
    {
      length: timePeriod === 'week' ? 7 : timePeriod === 'fortnight' ? 14 : 30,
    },
    (_, i) =>
      format(new Date(new Date().setDate(new Date().getDate() - i)), 'MMM dd')
  );

  return (
    <Card backgroundColor='white'>
      <CardBody>
        <Flex justifyContent='space-between' width='full'>
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
          <Select
            size='sm'
            width='150px'
            onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
          >
            <option value='week' defaultChecked={timePeriod === 'week'}>
              Last 7 days
            </option>
            <option
              value='fortnight'
              defaultChecked={timePeriod === 'fortnight'}
            >
              Last 30 days
            </option>
            <option value='month' defaultChecked={timePeriod === 'month'}>
              Last 60 days
            </option>
          </Select>
        </Flex>
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
                borderColor: '#B794F495',
                pointBorderColor: '#B794F4',
              },
            ],
            labels: dateRange,
          }}
        />
      </CardBody>
    </Card>
  );
}
