import { Card, Loader, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import Task from "./Task"
import { config } from "../constants";

const Tasks = (props) =>  {
    const URL = config.url;
    let auth = props.auth

    const tasksQuery = useQuery({
        queryKey: ['tasks', props.sortKey, props.asc],
        queryFn: async () => {
            const response = await fetch(`${URL}/tasks/getTasks?owner=${auth.currentUser._id}&sortKey=${props.sortKey}&asc=${props.asc}`,
            )
            return response.json()
        }
    })


    if (tasksQuery.isLoading) {
        return (<Loader size='lg'/>)
    }
    
    return(
        <Stack>
            {tasksQuery.data.length > 0 && tasksQuery.data.map((task) => (
                <Task 
                    id={task._id}
                    owner={task.owner} 
                    title={task.title} 
                    description={task.description}
                    status={task.status}
                    duedate={task.duedate}/>
            ))}
            {tasksQuery.data.length === 0 && (
                <Card withBorder shadow="sm" radius="md">
                    No tasks found
                </Card>
            )}
        </Stack>
    )
}

export default Tasks