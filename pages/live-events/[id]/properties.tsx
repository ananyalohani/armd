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
import { Event } from '..';
import Layout from '../../../components/Layout';

const event = {
  event: 'dblclick',
  timestamp: 1670246056958,
  properties: {
    clientX: 51,
    clientY: 19,
    offsetX: 41,
    offsetY: 9,
    pageX: 51,
    pageY: 19,
    screenX: 999,
    screenY: -950,
    host: '127.0.0.1',
    pathname: '/',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    userAgentData: {
      brands: [
        {
          brand: 'Google Chrome',
          version: '107',
        },
        {
          brand: 'Chromium',
          version: '107',
        },
        {
          brand: 'Not=A?Brand',
          version: '24',
        },
      ],
      mobile: false,
      platform: 'macOS',
    },
    clientWidth: 1227,
    clientHeight: 969,
    screenWidth: 1920,
    screenHeight: 1080,
    innerText: 'Button 1',
  },
};

export default function Properties() {
  const pathname = event.properties.pathname.split('/')[1];
  const url = pathname
    ? event.properties.host + pathname
    : event.properties.host;
  const source = event.properties.userAgentData.mobile ? 'mobile' : 'web';
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
                <Td textTransform='capitalize'>{event.event}</Td>
                <Td display={'flex'} alignItems='center'>
                  <Avatar name='192.168.2.237' size='xs' mr='1' />{' '}
                  <span>192.168.2.237</span>
                </Td>
                <Td>{url}</Td>
                <Td>{source}</Td>
                <Td>{format(event.timestamp, 'PPpp')}</Td>
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
            {Object.keys(event.properties).map((key) => {
              if (key !== 'userAgentData')
                return (
                  <Tr key={event.timestamp}>
                    <Td>
                      <Code>{key}</Code>
                    </Td>
                    {/* @ts-ignore */}
                    <Td>{event.properties[key]}</Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
