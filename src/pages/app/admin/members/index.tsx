import AppPage from "@common/component/pages/AppPage";
import {Member} from "@module/member/model/Member";
import styled from "@emotion/styled";
import {useState} from "react";
import MemberForm from "@module/member/component/MemberForm";
import MemberTable from "@module/member/component/MemberTable";
import pushMember from "@module/member/client-service/PushMember";
import useSWR from "swr"



const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
`

const AdminMembersPage = () => {

    const [selectedMember, setSelectedMember] = useState<Member | null>(null)

    const { data, error } = useSWR('/api/members')

    const handleSubmit = async (member: Member) => {
        const resp = await pushMember(member)
    }

    return (
        <AppPage>
            <UsersContent>
                {data ?
                    <>
                        <MemberTable members={data.members} onRowClick={(member) => setSelectedMember(member)}/>
                        <MemberForm
                            member={selectedMember}
                            onSubmit={(member) => handleSubmit(member)}
                        />
                    </>
                    :
                    <p>Loading...</p>
                }

            </UsersContent>
        </AppPage>
    )
}

export default AdminMembersPage