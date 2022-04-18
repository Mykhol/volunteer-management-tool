import {NextApiRequest, NextApiResponse} from "next";
import authenticateUser from "@module/auth/api/AuthenticateUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = JSON.parse(req.body).token

    const user = await authenticateUser(token)

    if (user == null) {
        return res.status(500).send({user: null})
    }

    return res.status(200).send({user: user})

}