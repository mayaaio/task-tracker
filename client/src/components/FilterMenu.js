import { ActionIcon, Menu, Space } from "@mantine/core"
import { ChevronDown, ChevronUp, Filter } from "react-feather"

const FilterMenu = (props) => {

    const getRightSection = (item) => {
        if (props.sortKey === item) {
            if(props.asc) {
                return <ChevronDown color="grey"/>
            } else {
                return <ChevronUp color="grey"/>
            }
        } else {
            return <Space />
        }
    }

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon>
                    <Filter />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Sort by</Menu.Label>
                <Menu.Item 
                    rightSection={getRightSection('title')} 
                    onClick={() => props.setSortKey('title')}>
                        Title
                    </Menu.Item>
                <Menu.Item 
                    rightSection={getRightSection('status')} 
                    onClick={() => props.setSortKey('status')}
                >
                    Status
                </Menu.Item>
                <Menu.Item 
                    rightSection={getRightSection('duedate')} 
                    onClick={() => props.setSortKey('duedate')}
                >
                    Due date
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default FilterMenu