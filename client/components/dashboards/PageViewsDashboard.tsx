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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

enum TimePeriod {
  WEEK = 7,
  FORTNIGHT = 14,
  MONTH = 30,
}

export default function PageViewsDashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.WEEK);
  const [pageViews, setPageViews] = useState<number[]>([]);
  const dateRange = Array.from({ length: timePeriod }, (_, i) =>
    new Date().setDate(new Date().getDate() - i)
  ).reverse();

  const isOnDay = (timestamp: number, day: number) => {
    const date = new Date(timestamp);
    return (
      date.getDate() === new Date(day).getDate() &&
      date.getMonth() === new Date(day).getMonth() &&
      date.getFullYear() === new Date(day).getFullYear()
    );
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/pageviews?startTime=${dateRange[0]}`
      );
      const data = (await res.json()) as any[];
      const pageViews: number[] = [];
      dateRange.map((date) => {
        const pageView = data.filter((event) =>
          isOnDay(parseInt(event.datetime), date)
        );
        pageViews.push(pageView.length);
      });
      setPageViews(pageViews);
    })();
  }, [dateRange]);

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
            borderColor='red.200'
          >
            <Heading fontSize='md'>Page views</Heading>
            <Text fontSize='sm'>
              Shows the number of pageviews on your app.
            </Text>
          </VStack>
          <Select
            size='sm'
            width='150px'
            onChange={(e) =>
              setTimePeriod(parseInt(e.target.value) as TimePeriod)
            }
          >
            <option
              value={TimePeriod.WEEK}
              defaultChecked={timePeriod === TimePeriod.WEEK}
            >
              Last 7 days
            </option>
            <option
              value={TimePeriod.FORTNIGHT}
              defaultChecked={timePeriod === TimePeriod.FORTNIGHT}
            >
              Last 14 days
            </option>
            <option
              value={TimePeriod.MONTH}
              defaultChecked={timePeriod === TimePeriod.MONTH}
            >
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
                data: pageViews,
                borderColor: '#F5656595',
                pointBorderColor: '#F56565',
              },
            ],
            labels: dateRange.map((date) => format(date, 'MMM dd')),
          }}
        />
      </CardBody>
    </Card>
  );
}
