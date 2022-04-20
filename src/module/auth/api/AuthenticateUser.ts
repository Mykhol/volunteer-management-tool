/**
 * Takes the ID token of a user, and returns a user from the server if it exists, or null if it doesn't.
 *
 * @param idToken
 */
import {DI} from "@common/util/di/DI";

const authenticateUser = async (idToken: string) => {

    const decodedIdToken = await DI.FirebaseAdminService.getAuth().verifyIdToken(idToken)
    const user = await DI.UserService.getUserByUid(decodedIdToken.uid)

    if (user == undefined) {
        return null
    }

    return user

}

export default authenticateUser