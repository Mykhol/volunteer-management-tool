import {GetServerSidePropsContext} from "next";
import {FirebaseAdminService} from "@/module/firestore/FirebaseAdminService";
import AppPage from "../../../../common/component/pages/AppPage";
import {MemberService} from "@/module/member/service/MemberService";
import {Member} from "@/module/member/model/Member";
import {useRouter} from "next/router";
import StyledTable from "../../../../common/component/tables/StyledTable";
import Table from "../../../../common/component/tables/StyledTable";
import {getVaccinationStatusText} from "@/module/member/model/VaccinationStatus";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import classToDto from "@/common/util/ClassToDto";
import {Button} from "@mui/material";
import MemberForm from "@/module/member/component/MemberForm";
import MemberTable from "@/module/member/component/MemberTable";
import {css} from "@emotion/react";


interface AdminMembersPageProps {
    members: Member[]
}

const UsersContent = styled.div`

  display: flex;
  flex-direction: row;

`


const AdminMembersPage = ({members} : AdminMembersPageProps) => {

    const [selectedMember, setSelectedMember] = useState<Member>(members[0])
    const [count, setCount] = useState(0)

    useEffect(() => {
        setSelectedMember(members[count])
    }, [count])

    return (
        <AppPage>
            <UsersContent css={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            `}>
                <MemberTable members={members} />
                <MemberForm css={css`
                  && > {
                  margin-left: 50px;
                  }
                `} member={selectedMember} />
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