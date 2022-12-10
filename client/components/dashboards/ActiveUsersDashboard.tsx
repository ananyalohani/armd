import {
  Card,
  CardBody,
  Flex,
  Heading,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import format from 'date-fns/format';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

type TimePeriod = 'week' | 'fortnight' | 'month';

export default function ActiveUsersDashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const dateRange = Array.from(
    {
      length: timePeriod === 'week' ? 7 : timePeriod === 'fortnight' ? 14 : 30,
    },
    (_, i) =>
      format(new Date(new Date().setDate(new Date().getDate() - i)), 'MMM dd')
  ).reverse();
  const data = Array.from(
    {
      length: timePeriod === 'week' ? 7 : timePeriod === 'fortnight' ? 14 : 30,
    },
    () => Math.floor(Math.random() * 100)
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
              Last 14 days
            </option>
            <option value='month' defaultChecked={timePeriod === 'month'}>
              Last 30 days
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
                data: data,
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
