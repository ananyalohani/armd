import { SimpleGrid } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Player from '../components/Player';

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
      <SimpleGrid columns={2} spacing={10} key={0}>
        {sessions.map((session: any) => {
          return (
            <Player
              key={session.id}
              sessionId={session.id}
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
