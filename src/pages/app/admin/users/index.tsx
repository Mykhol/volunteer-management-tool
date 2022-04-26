import AppPage from "@common/component/pages/AppPage";
import {User} from "@module/user/model/User";
import {useEffect, useState} from "react"
import UserForm from "@module/user/component/UserForm";
import "@extensions"

const UsersPage = () => {

    const [users, setUsers] = useState<User[] | null>(null)
    const [selectedUser, setAppUser] = useState<User | null>(null)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        fetch("/api/users", {method: "GET"}).then(async (r) => {
            if (r.status.isSuccessful()) {
                const data: User[] = await r.json()
                setUsers(data)
            } else {

            }
        })
    }

    console.log(users)

    return (
        <AppPage>
            <UserForm />
            {/*<UserTable />*/}
        </AppPage>
    )

}
export default UsersPage