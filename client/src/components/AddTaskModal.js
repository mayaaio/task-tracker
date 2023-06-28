import { Button, LoadingOverlay, Modal, NativeSelect, Stack, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../constants";

const AddTaskModal = (props) => {

    const URL = config.url;
    const queryClient = useQueryClient()

    const onAddTask = useMutation({
        mutationFn: async ( values, etc ) => {
            const response = await fetch(`${URL}/tasks/createNewTask`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    owner: props.auth.currentUser._id,
                    title: values.title,
                    description: values.description,
                    status: values.status,
                    duedate: values.duedate
                })
            })
            return response
        },
        onSettled: () => {
            props.onClose()
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            form.reset()
        }
    })

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            status: 'To do',
            duedate: '',
        }
    })
    
    return (
        <Modal
            title='Add a new task'
            opened={props.opened}
            onClose={props.onClose}
        >
            <LoadingOverlay visible={onAddTask.isLoading} overlayBlur={2} />
            <form onSubmit={form.onSubmit(async (values) => 
                await onAddTask.mutateAsync({
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
                    <Button type="submit" maw={100}> Add task!</Button>
                </Stack> 
            </form> 
        </Modal>
    )
}

export default AddTaskModal