import {GetServerSidePropsContext} from "next";
import {FirebaseAdminService} from "@/module/firestore/FirebaseAdminService";
import AppPage from "../../../../common/component/pages/AppPage";
import {MemberService} from "@/module/member/MemberService";
import {Member} from "@/module/member/Member";
import {useRouter} from "next/router";
import StyledTable from "../../../../common/component/ui/tables/StyledTable";
import Table from "../../../../common/component/ui/tables/StyledTable";
import {getVaccinationStatusText} from "@/module/member/VaccinationStatus";
import MemberForm from "../../../../common/component/ui/forms/MemberForm";
import styled from "@emotion/styled";
import {useState} from "react";
import classToDto from "@/common/util/ClassToDto";
import {Button} from "@mui/material";


interface AdminMembersPageProps {
    members: Member[]
}

const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
  align-items: start;

  ${Table} {
    margin-right: 100px;
  }
  
`


const AdminMembersPage = ({members} : AdminMembersPageProps) => {

    const router = useRouter()

    const [selectedMember, setSelectedMember] = useState<Member | null>(null)

    const setMember = (id: string) => {
        const selectedMember = members.find((member) => {
            return member.id == id
        }) || null

        setSelectedMember(selectedMember)
    }

    return (
        <AppPage>
            <UsersContent>
                <div>
                    <StyledTable>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Vaccination Status?</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members?.map((user) => {
                            return (
                                <tr id={"clickable"} key={user.id} onClick={() => setMember(user.id!!)}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.primaryEmail}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>{getVaccinationStatusText(user.vaccinationStatus)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </StyledTable>
                    <Button onClick={() => setSelectedMember(null)}>Create new member</Button>
                </div>
                <MemberForm successCallback={() => {console.log("Success")}} errorCallback={() => {console.log("Error")}}/>
            </UsersContent>
        </AppPage>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const members = await new MemberService(new FirebaseAdminService()).getAllMembers()

    return {
        props: {
            members: classToDto(members)
        }
    }
}

export default AdminMembersPage