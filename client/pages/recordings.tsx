import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Player from '../components/Player';
import { Box, Flex, List, ListItem, SimpleGrid } from '@chakra-ui/react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions`); // your fetch function here

  return {
    props: {
      sessions: await data.json(),
    },
  };
};

export default function Recordings({ sessions }: { sessions: any }) {
  useEffect(() => {
    console.log(sessions);
  }, []);

  return (
    <Layout heading='Session Recordings'>
      <SimpleGrid columns={2} spacing={10}>
        {sessions.map((session: any) => {
          return (
            <Player
              key={session.id}
              events={session.events.map((event: any) => ({
                ...event,
                timestamp: new Date(event.timestamp).getTime(),
              }))}
            />
          );
        })}
      </SimpleGrid>
    </Layout>
  );
}
