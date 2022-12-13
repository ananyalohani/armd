import {
  Avatar,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { useInterval } from '../../hooks/useInterval';

export interface Event {
  event: string;
  timestamp: number;
  properties: {
    [x: string]: any;
  };
}

export default function LiveEvents() {
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Poll for new events every minute
  const REFRESH_INTERVAL = 1000 * 60;

  useInterval(fetchEvents, REFRESH_INTERVAL);

  return (
    <Layout heading='Live Events'>
      <TableContainer background={'white'} borderRadius='8' maxW='full'>
        <Table size='sm' maxW='full' w='full'>
          <Thead>
            <Tr>
              <Th>Event</Th>
              <Th>Person</Th>
              <Th>URL</Th>
              <Th>Source</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            <>
              {events.map((e) => {
                const pathname = e.prop_pathname.split('/')[1];
                const url = pathname ? e.prop_host + pathname : e.prop_host;
                const userAgentData = JSON.parse(e.prop_user_agent_data);
                const source = userAgentData.mobile ? 'mobile' : 'web';
                return (
                  <Tr key={e.id}>
                    <Td textTransform='capitalize'>
                      <Link
                        href={`/live-events/${e.id}/properties`}
                        color='purple.700'
                      >
                        {e.type}
                      </Link>
                    </Td>
                    <Td display={'flex'} alignItems='center'>
                      <Avatar name='192.168.2.237' size='xs' mr='1' />{' '}
                      <span>192.168.2.237</span>
                    </Td>
                    <Td>{url}</Td>
                    <Td>{source}</Td>
                    <Td>{format(new Date(parseInt(e.datetime)), 'PPpp')}</Td>
                  </Tr>
                );
              })}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
