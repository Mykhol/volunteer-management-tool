import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "@/module/user/UserService";
import {FirebaseAdminService} from "@/module/firestore/FirebaseAdminService";
import {User} from "@/module/user/User";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as User





}

