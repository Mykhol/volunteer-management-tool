import AppPage from "@common/component/pages/AppPage";
import MemberForm from "@module/member/component/MemberForm";
import {Skeleton} from "@mui/lab";
import MemberTable from "@module/member/component/MemberTable";
import {Member} from "@module/member/model/Member";
import {useEffect, useState} from "react";

/**
 * Page to view and edit data of members.
 */
const AdminMembersPage = () => {

    const [members, setMembers] = useState<Member[] | null>(null)

    useEffect(() => {
        fetch("/api/members", {method: "GET"}).then(async (r) => {
            if (r.status.isSuccessful()) {
                const data: Member[] = await r.json()
                setMembers(data)
            } else {

            }
        })
    })


    if (!members) {
        return (
            <Skeleton variant={"rectangular"} width={'100%'} height={800}/>
        )
    }

    return (
        <AppPage>
            <MemberForm />
            <MemberTable members={members} />
        </AppPage>
    )
}

export default AdminMembersPage