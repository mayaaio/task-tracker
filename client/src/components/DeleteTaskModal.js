import { Button, Group, LoadingOverlay, Modal, Stack } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../constants";

const DeleteTaskModal = (props) => {

    const URL = config.url;
    const queryClient = useQueryClient()

    const onDeleteTask = useMutation({
        mutationFn: async ( id ) => {
            const response = await fetch(`${URL}/tasks/deleteTask?_id=${id}`, {
                method: "DELETE",
            })
            return response
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            props.onClose()
        }
    })
    
    return (
        <Modal
            title='Delete task'
            opened={props.opened}
            onClose={props.onClose}
        >
            <Stack>
                Are you sure you want to delete this task? 
                <Group>
                    <Button onClick={() => props.onClose()}>No, go back</Button>
                    <Button onClick={() => onDeleteTask.mutate(props.id)}>Yes, delete</Button>
                </Group>
                <LoadingOverlay visible={onDeleteTask.isLoading} overlayBlur={2} />
            </Stack>
        </Modal>
    )
}

export default DeleteTaskModal