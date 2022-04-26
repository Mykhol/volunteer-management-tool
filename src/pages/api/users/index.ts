import {NextApiRequest, NextApiResponse} from "next";
import {DI} from "@common/di/DI";
import {User} from "@module/user/model/User";

/**
 * Handles the '/api/users' endpoint.
 *
 * If the HTTP Method is GET this handler will return all users, if the HTTP Method is POST, it will create a new
 * user.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // return all users
    if (req.method == "GET") {
        const users = await DI.UserService.getAllUsers()
        res.status(200).json(users)
    }

    // create a new user
    if (req.method == "POST") {
        const user = User.fromObj(JSON.parse(req.body))
        const memberResp = await DI.UserService.addUser(user)
        if (memberResp != undefined) {
            res.status(200).json(user)
        } else {
            res.status(500).json(user)
        }
    }

}

