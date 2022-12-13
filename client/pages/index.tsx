import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout heading='Home'>
      <Button colorScheme='purple' variant='solid'>
        <Link href='http://localhost:5173' target='_blank'>
          Go to Test Client App
        </Link>
      </Button>
    </Layout>
  );
}
