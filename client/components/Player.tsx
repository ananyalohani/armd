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
  events: any[];
  sessionId: string;
};

export default function Player({ events, sessionId }: Props) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [replayer, setReplayer] = useState<rrwebPlayer>();

  useEffect(() => {
    if (!playerRef || !playerRef.current) return;
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
  }, []);

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
          {format(new Date(events[0].timestamp), 'MMM dd yyyy, hh:mm:ss a')}{' '}
        </Text>
      </CardFooter>
    </Card>
  );
}
