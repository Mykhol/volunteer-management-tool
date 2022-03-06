import {GetServerSidePropsContext} from "next";
import {UserService} from "@/module/user/UserService";
import {FirebaseAdminService} from "@/module/firestore/FirebaseAdminService";
import {User} from "@/module/user/User";
import AppPage from "@/common/component/pages/AppPage";
import {useRouter} from "next/router";
import {getUserScopeText} from "@/module/user/UserScope";
import styled from "@emotion/styled";
import UserForm from "@/common/component/ui/forms/UserForm";
import {useState} from "react";
import Table from "@/common/component/ui/tables/StyledTable";
import classToDto from "@/common/util/ClassToDto";
import { Button } from "@mui/material";

interface UsersPageProps {
    users: User[]
}


const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
  align-items: start;

  ${Table} {
    margin-right: 100px;
  }
`

const UsersPage = ({users} : UsersPageProps) => {

    const router = useRouter()

    const [appUser, setAppUser] = useState<User | null>(null)


    const setUser = (id: string) => {
        const selectedUser = users.find((user) => {
            return user.id == id
        }) || null

        setAppUser(selectedUser)
    }

    return (
        <AppPage>
            <UsersContent>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Scope</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            return (
                                <tr id={"clickable"} key={user.id} onClick={() => setUser(user.id!!)}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.primaryEmail}</td>
                                    <td>{user.scope?.map((scope) => {return (getUserScopeText(scope) + " | ")})}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Button onClick={() => setAppUser(null)}>Create new user</Button>
                </div>
                <UserForm appUser={appUser} userSetState={setAppUser}/>
            </UsersContent>
        </AppPage>
    )

}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const users = await new UserService(new FirebaseAdminService()).getAllUsers()

    return {
        props: {
            users: classToDto(users)
        }
    }
}

export default UsersPage