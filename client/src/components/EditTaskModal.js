import { Button, LoadingOverlay, Modal, NativeSelect, Stack, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { config } from "../constants"

const EditTaskModal = (props) => {
    
    const URL = config.url;
    const queryClient = useQueryClient()

    const onEditTask = useMutation({
        mutationFn: async ( values, etc ) => {
            const response = await fetch(`${URL}/tasks/editTask?_id=${props.task.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    title: values.title,
                    description: values.description,
                    status: values.status,
                    duedate: values.duedate
                })
            })
            return response
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            props.onClose()
        }
    })

    const form = useForm({
        initialValues: {
            title: props.task.title,
            description: props.task.description,
            status: props.task.status,
            duedate: new Date(props.task.duedate)
        }
    })
    
    return (
        <Modal
            title='Edit this task'
            opened={props.opened}
            onClose={props.onClose}
        >
            <LoadingOverlay visible={onEditTask.isLoading} overlayBlur={2} />
            <form onSubmit={form.onSubmit(async (values) => 
                await onEditTask.mutateAsync({
                    title: values.title, 
                    description: values.description, 
                    status: values.status, 
                    duedate: values.duedate
                    }))}>
                <Stack>
                    <TextInput 
                        label="Task title" 
                        placeholder="Wash dishes" 
                        withAsterisk 
                        {...form.getInputProps('title')}
                    /> 
                    <TextInput 
                        label="Task description" 
                        placeholder="Wash dishes" 
                        withAsterisk 
                        {...form.getInputProps('description')}
                    />
                    <NativeSelect 
                        label="Status"
                        data={['To do', 'In progress', 'Completed']}
                        withAsterisk
                        {...form.getInputProps('status')}
                    />
                    <DateInput 
                        label="Due date" 
                        placeholder="Date input" 
                        minDate={new Date()}  
                        withAsterisk
                        {...form.getInputProps('duedate')}
                    />
                    <Button type="submit" maw={150}>Save changes</Button> 
                </Stack>
            </form>
        </Modal>
    )
}

export default EditTaskModal