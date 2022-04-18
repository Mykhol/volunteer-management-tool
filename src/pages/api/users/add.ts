import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "@module/user/service/UserService";
import {FirebaseAdminService} from "@module/firestore/service/FirebaseAdminService";
import {User} from "@module/user/model/User";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as User

    const newUser = await service.addUser(user)

    if (newUser == undefined) {
        res.status(500).send({user: null})
    } else {
        res.status(200).send({user: newUser})
    }
    
}

