import AppPage from "@common/component/pages/AppPage";
import MemberForm from "@module/member/component/MemberForm";
import {Skeleton} from "@mui/material";
import MemberTable from "@module/member/component/MemberTable";
import {Member} from "@module/member/model/Member";
import {useEffect, useState} from "react";
import styled from "styled-components";

const MemberDataContainer = styled.div`

  width: 100%;
  height: 100vh;
  
  display: flex;
  flex-direction: row;

`

/**
 * Page to view and edit data of members.
 */
const AdminMembersPage = () => {

    const [members, setMembers] = useState<Member[] | null>(null)
    const [selectedMember, setSelectedMember] = useState<Member | null>(null)

    useEffect(() => {
        getMembers()
    }, [])

    const getMembers = () => {
        fetch("/api/members", {method: "GET"}).then(async (r) => {
            if (r.status.isSuccessful()) {
                const data: Member[] = await r.json()
                setMembers(data)
            } else {

            }
        })
    }

    if (!members) {
        return (
            <>
            </>
        )
    }

    return (
        <AppPage>
            <MemberDataContainer>
                <MemberTable members={members} onRowClick={(member) => setSelectedMember(member)} />
                <MemberForm member={selectedMember} onDataUpdate={() => getMembers()}/>
            </MemberDataContainer>
        </AppPage>
    )
}

export default AdminMembersPage