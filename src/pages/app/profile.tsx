import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {UserService} from "@module/user/service/UserService";
import {FirebaseAdminService} from "@module/firestore/service/FirebaseAdminService";
import {User} from "@module/user/model/User";
import AppPage from "../../common/component/pages/AppPage";

interface ProfilePageProps {
    user: User
}

const ProfilePage = ({user} : ProfilePageProps) => {

    return (
        <AppPage>
            <p>Profile</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.primaryEmail}</p>
            <p>{user.secondaryEmail}</p>
            <p>{user.scope}</p>
            {user.picture ? <img src={user.picture}/> : null }
        </AppPage>
    )

}

export const getServerSideProps : GetServerSideProps = async(context: GetServerSidePropsContext) => {
    const user = await new UserService(new FirebaseAdminService()).getUserFromToken(context.req.cookies.token)

    console.log(user)

    if (user != undefined) {
        return {
            props: {
                user: user
            }
        }
    } else {
        return {
            props : {
                user: null
            }
        }
    }
}

export default ProfilePage