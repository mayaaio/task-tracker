import { Badge, Card, Divider, Group, Stack, Text, Title, ActionIcon } from "@mantine/core"
import { Edit, Trash } from 'react-feather';
import DeleteTaskModal from "./DeleteTaskModal";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

const Task = ( props ) => {
    const [deleteTaskOpen, setDeleteTaskOpen] = useState(false)
    const [editTaskOpen, setEditTaskOpen] = useState(false)

    const chooseColor = ( status ) => {
        switch(status) {
            case 'To do':
                return "red"
            case 'In progress':
                return "yellow"
            case 'Completed':
                return "green"
            default:
                return "blue"
        }
    }

    return(
        <>
        <DeleteTaskModal id={props.id} opened={deleteTaskOpen} onClose={() => setDeleteTaskOpen(false)}/>
        <EditTaskModal task={props} opened={editTaskOpen} onClose={() => setEditTaskOpen(false)}/>
        <Card withBorder shadow="sm" radius="md">
            <Group position="apart" mb="xs">
                <Title order={3}>{props.title}</Title>
                <Group>
                    <ActionIcon onClick={() => setEditTaskOpen(true)}>
                        <Edit />
                    </ActionIcon>
                    <ActionIcon onClick={() => setDeleteTaskOpen(true)}>
                        <Trash />
                    </ActionIcon>
                </Group>
            </Group>
            <Divider my="sm"/>
            <Stack>
                <Group position="apart">
                    <Text>Due: {(new Date(props.duedate)).toDateString()}</Text>
                    <Badge color={chooseColor(props.status)}>{props.status ? props.status : 'No status'}</Badge>
                </Group>
                <Text>
                    {props.description ? props.description : 'This task has no description'}
                </Text>
            </Stack>
        </Card>
        </>
    )
}

export default Task