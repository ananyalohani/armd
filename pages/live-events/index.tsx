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

export interface Event {
  event: string;
  timestamp: number;
  properties: {
    [x: string]: any;
  };
}

export default function LiveEvents() {
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
                const pathname = e.properties.pathname.split('/')[1];
                const url = pathname
                  ? e.properties.host + pathname
                  : e.properties.host;
                const source = e.properties.userAgentData.mobile
                  ? 'mobile'
                  : 'web';
                return (
                  <Tr>
                    <Td textTransform='capitalize'>
                      <Link href='/live-events/a/properties' color='purple.700'>
                        {e.event}
                      </Link>
                    </Td>
                    <Td display={'flex'} alignItems='center'>
                      <Avatar name='192.168.2.237' size='xs' mr='1' />{' '}
                      <span>192.168.2.237</span>
                    </Td>
                    <Td>{url}</Td>
                    <Td>{source}</Td>
                    <Td>{format(e.timestamp, 'PPpp')}</Td>
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

const events: Event[] = [
  {
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
  },
  {
    event: 'scroll',
    timestamp: 1670246019801,
    properties: {
      host: '127.0.0.1',
      pathname: '/',
      device: 'mobile',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
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
        mobile: true,
        platform: 'Android',
      },
      clientWidth: 309,
      clientHeight: 662,
      screenWidth: 309,
      screenHeight: 352,
    },
  },
  {
    event: 'click',
    timestamp: 1670246002307,
    properties: {
      clientX: 53,
      clientY: 21,
      offsetX: 44,
      offsetY: 12,
      pageX: 53,
      pageY: 21,
      screenX: 1001,
      screenY: -948,
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
  },
  {
    event: 'click',
    timestamp: 1670245984591,
    properties: {
      clientX: 128,
      clientY: 195,
      offsetX: 121,
      offsetY: 127,
      pageX: 128,
      pageY: 195,
      screenX: 1076,
      screenY: -774,
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
    },
  },
  {
    event: 'pageshow',
    timestamp: 1670245805502,
    properties: {
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
      clientWidth: 1920,
      clientHeight: 969,
      screenWidth: 1920,
      screenHeight: 1080,
    },
  },
];
