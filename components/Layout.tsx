import { Container, Heading } from '@chakra-ui/react';
import SimpleSidebar from './Sidebar';

interface LayoutProps {
  heading: string;
  children?: React.ReactNode;
}

export default function Layout({ heading, children }: LayoutProps) {
  return (
    <main>
      <SimpleSidebar>
        <Container p='0' m='0' ml='4' mt='3'>
          <Heading fontWeight='extrabold'>{heading}</Heading>
          <Container p='0' m='0' mt='4'>
            {children}
          </Container>
        </Container>
      </SimpleSidebar>
    </main>
  );
}
