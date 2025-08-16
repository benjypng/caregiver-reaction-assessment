import { Box } from '@chakra-ui/react';
import { type ReactNode } from 'react';

import { NavMenu } from '@/components/NavMenu';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <NavMenu />
      <Box p="5" justifyContent="center" h="full">
        {children}
      </Box>
    </>
  );
};
