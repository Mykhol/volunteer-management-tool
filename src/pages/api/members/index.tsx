import {NextApiRequest, NextApiResponse} from "next";
import {Member} from "@module/member/model/Member";
import {DI} from "@common/util/di/DI";

/**
 * Handles the '/api/members' endpoint.
 *
 * If the HTTP Method is GET this handler will return all members, if the HTTP Method is POST, it will create a new
 * member.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // return all members
    if (req.method == "GET") {
        const members = await DI.MemberService.getAllMembers()
        res.status(200).json({members: members})
    }

    // create a new member
    if (req.method == "POST") {
        const member = Member.fromObj(JSON.parse(req.body))
        const memberResp = await DI.MemberService.addMember(member)
        if (memberResp != undefined) {
            res.status(200).json({member: member})
        } else {
            res.status(500).json({member: null})
        }
    }

}

