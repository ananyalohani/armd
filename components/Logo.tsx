import { Heading } from '@chakra-ui/react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <Heading
        backgroundColor='gray.100'
        color='black'
        px='4'
        py='1'
        letterSpacing='tighter'
        fontWeight='black'
        fontSize='5xl'
        width='full'
        textAlign='center'
        _hover={{
          color: 'purple.600',
          backgroundColor: 'purple.50',
        }}
      >
        ARMD
      </Heading>
    </Link>
  );
}
