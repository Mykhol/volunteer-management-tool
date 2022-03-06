import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "@/module/user/UserService";
import {FirebaseAdminService} from "@/module/firestore/FirebaseAdminService";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as {appUser: string, authedUser: string}

    const activeUser = await service.getUserByUid(user.authedUser)

    if (activeUser && activeUser.id == user.appUser) {
        res.status(500).send(null)
    } else {
        await service.removeUser(user.appUser)
        res.status(200).send(null)
    }








}

