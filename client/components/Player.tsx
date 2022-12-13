import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Code,
  Heading,
  Text,
} from '@chakra-ui/react';
import format from 'date-fns/format';
import { useEffect, useRef, useState } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

type Props = {
  sessionId: string;
};

export default function Player({ sessionId }: Props) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [replayer, setReplayer] = useState<rrwebPlayer>();
  const [events, setEvents] = useState<any[]>([]);

  const fetchSession = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions/${sessionId}`
    );
    const data = await res.json();
    setEvents(
      data.events.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp).getTime(),
      }))
    );
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (!playerRef || !playerRef.current || !events.length) return;
    const replayer = new rrwebPlayer({
      target: playerRef.current,
      props: {
        events,
        autoPlay: false,
        width: 580,
        height: 300,
        triggerFocus: false,
      },
    });
    setReplayer(replayer);
  }, [events.length]);

  return (
    <Card backgroundColor='#fff'>
      <CardBody pb='0'>
        <div ref={playerRef}></div>
      </CardBody>
      <CardFooter display='flex' flexDirection='column'>
        <Heading fontSize='md' mb='2'>
          Session <Code>{sessionId}</Code>
        </Heading>
        <Text fontSize='sm' fontWeight='normal'>
          {events.length
            ? format(new Date(events[0].timestamp), 'MMM dd yyyy, hh:mm:ss a')
            : ''}
        </Text>
      </CardFooter>
    </Card>
  );
}
