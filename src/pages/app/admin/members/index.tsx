import AppPage from "@common/component/pages/AppPage";
import MemberForm from "@module/member/component/MemberForm";
import useSWR from "swr"
import {Skeleton} from "@mui/lab";

/**
 * Page to view and edit data of members.
 */
const AdminMembersPage = () => {

    const { data, error } = useSWR('/api/members')

    if (!data) {
        return (
            <Skeleton variant={"rectangular"} width={'100%'} height={800}/>
        )
    }

    return (
        <AppPage>
            <MemberForm />
            {/*<MemberTable members={} />*/}
        </AppPage>
    )
}

export default AdminMembersPage