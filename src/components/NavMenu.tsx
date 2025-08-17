import { HamburgerIcon } from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const NavMenu = () => {
  const router = useRouter()
  const { status, data } = useSession()

  return (
    <HStack justifyContent="space-between" alignItems="center" p="5">
      <Text textStyle="h3" cursor="pointer" onClick={() => router.push('/')}>
        Caregiver Reaction Assessment
      </Text>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
        />
        <MenuList>
          <MenuItem onClick={() => router.push('/')}>
            Create New Survey
          </MenuItem>
          {status === 'authenticated' ? (
            <>
              {data.user.is_admin && (
                <MenuItem onClick={() => router.push('/admin')}>Admin</MenuItem>
              )}
              <MenuItem onClick={() => router.push('/change-password')}>
                Change Password
              </MenuItem>
              <MenuItem onClick={() => router.push('/api/auth/signout')}>
                Sign Out
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => router.push('/api/auth/signin')}>
              Sign In
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </HStack>
  )
}
