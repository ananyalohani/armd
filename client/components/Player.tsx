import { Card } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

type Props = {
  events: any[];
};

export default function Player({ events }: Props) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [replayer, setReplayer] = useState<rrwebPlayer>();

  useEffect(() => {
    // console.log(events);
    if (!playerRef || !playerRef.current) return;
    const replayer = new rrwebPlayer({
      target: playerRef.current,
      props: {
        events,
        autoPlay: false,
        width: 620,
        height: 350,
        triggerFocus: false,
      },
    });
    setReplayer(replayer);
    replayer.pause();
  }, []);

  return (
    <Card>
      <div ref={playerRef} style={{ position: 'relative' }}></div>
    </Card>
  );
}
