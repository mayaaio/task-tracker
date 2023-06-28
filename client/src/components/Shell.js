import { AppShell, Group, Header, Title } from "@mantine/core"
import Logout from "./Logout"
import { useAuth } from "../contexts/authContext"

const Shell = ({children}) =>  {
    const auth = useAuth()

    return(
        <AppShell
            header={<Header height={60} p="xs">
                        <Group px='sm' position="apart">
                            <Title order={2}>{auth.currentUser.name}'s task list</Title>
                            <Logout />
                        </Group>
                    </Header>}
        >
            {children}
        </AppShell>
    )
}

export default Shell