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

export default function ActiveSessionsDashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.WEEK);
  const [activeSessions, setActiveSessions] = useState<number[]>([]);
  const dateRange: number[] = Array.from({ length: timePeriod }, (_, i) =>
    new Date().setDate(new Date().getDate() - i)
  ).reverse();

  const isOnDay = (startTime: string, day: number) => {
    const date = new Date(startTime);
    return (
      date.getDate() === new Date(day).getDate() &&
      date.getMonth() === new Date(day).getMonth() &&
      date.getFullYear() === new Date(day).getFullYear()
    );
  };

  const fetchActiveSessions = async (dateRange: number[]) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/sessions?startTime=${dateRange[0]}`
    );
    const data = await res.json();
    console.log(data);
    const activeSessions: number[] = [];
    dateRange.map((date) => {
      const activeSession = data.filter((session: any) =>
        isOnDay(session.startTime, date)
      );
      activeSessions.push(activeSession.length);
    });
    setActiveSessions(activeSessions);
  };

  useEffect(() => {
    fetchActiveSessions(dateRange);
  }, [timePeriod]);

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
            <Heading fontSize='md'>Active sessions</Heading>
            <Text fontSize='sm'>
              Shows the number of unique sessions created in your app.
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
                data: activeSessions,
                borderColor: '#B794F495',
                pointBorderColor: '#B794F4',
              },
            ],
            labels: dateRange.map((date) => format(date, 'MMM dd')),
          }}
        />
      </CardBody>
    </Card>
  );
}
