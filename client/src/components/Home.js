import { ActionIcon, Container, Group, Stack, Title } from "@mantine/core";
import { useAuth } from "../contexts/authContext";
import Shell from "./Shell";
import Tasks from "./Tasks";
import { PlusCircle } from "react-feather";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import FilterMenu from "./FilterMenu";

const Home = () =>  {
    const auth = useAuth()
    const [addTaskOpen, setAddTaskOpen] = useState(false)
    const [sortKey, setSortKey] = useState('duedate')
    const [asc, setAsc] = useState(true)

    function handleSortKey(key) {
        if(key === sortKey) {
            setAsc(!asc)
        } else {
            setSortKey(key);
        }
     }

    return (
        <Shell>
            <AddTaskModal auth={auth} opened={addTaskOpen} onClose={() => setAddTaskOpen(false)}/>
             <Container size={420} my={40}>
                <Stack justify="flex-start">
                    <Group mx='xs' position='apart'>
                        <Title>My tasks</Title>
                        <Group>
                            <FilterMenu setSortKey={handleSortKey} asc={asc} sortKey={sortKey}/>
                            <ActionIcon onClick={() => setAddTaskOpen(true)}>
                                <PlusCircle />
                            </ActionIcon>
                        </Group>
                    </Group>
                    <Tasks auth={auth} sortKey={sortKey} asc={asc}/>
                </Stack>
            </Container>
        </Shell>
    )
}

export default Home;