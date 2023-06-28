import { Button } from "@mantine/core"
import { useAuth } from "../contexts/authContext"

const Logout = () =>  {
    const auth = useAuth()

    const onLogout = (e) => {
        e.preventDefault();
        try {
          auth.logOut(() => {
            console.log('successfully logged out')
          })
        } catch(err) {
          console.log(err)
        }
    }

    return(
        <Button onClick={onLogout}>Log out</Button>
    )
}

export default Logout