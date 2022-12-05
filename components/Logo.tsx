import { Heading, Link } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Link href='/' _hover={{ textDecoration: 'none' }}>
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
      >
        ARMD
      </Heading>
    </Link>
  );
}
