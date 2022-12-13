import {
  Avatar,
  Code,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import format from 'date-fns/format';
import Layout from '../../../components/Layout';

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`
  );
  const data = await res.json();

  return {
    props: {
      event: data[0],
    },
  };
};

export default function Properties({ event }: any) {
  console.log(event);
  const pathname = event.prop_pathname.split('/')[1];
  const url = pathname ? event.prop_host + pathname : event.prop_host;
  const userAgentData = JSON.parse(event.prop_user_agent_data);
  const source = userAgentData.mobile ? 'mobile' : 'web';
  return (
    <Layout heading='Event Properties'>
      <Heading fontSize='xl' my='4' mt='6'>
        Event
      </Heading>
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
              <Tr>
                <Td textTransform='capitalize'>{event.type}</Td>
                <Td display={'flex'} alignItems='center'>
                  <Avatar name='192.168.2.237' size='xs' mr='1' />{' '}
                  <span>192.168.2.237</span>
                </Td>
                <Td>{url}</Td>
                <Td>{source}</Td>
                <Td>{format(new Date(event.datetime), 'PPpp')}</Td>
              </Tr>
            </>
          </Tbody>
        </Table>
      </TableContainer>
      <Heading fontSize='xl' my='4' mt='6'>
        Properties
      </Heading>
      <TableContainer background={'white'} borderRadius='8' maxW='full'>
        <Table size='sm' maxW='full' w='full'>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(event).map((key) => {
              if (
                key !== 'prop_user_agent_data' &&
                key.startsWith('prop_') &&
                event[key]
              )
                return (
                  <Tr key={event.datetime}>
                    <Td>
                      <Code>{key.split('prop_')[1]}</Code>
                    </Td>
                    <Td>{event[key]}</Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
