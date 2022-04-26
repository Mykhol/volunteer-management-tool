import {NextApiRequest, NextApiResponse} from "next";
import {DI} from "@common/di/DI";
import {Member} from "@module/member/model/Member";

/**
 * Handles the '/api/members/[id]' endpoint.
 *
 * If the HTTP Method is GET this handler will return the member which matches the provided ID, if the HTTP Method is
 * POST, it will update the member which matches the provided ID, if the HTTP Method is DELETE it will delete the
 * member which matches the ID provided.
 *
 * @author Michael Howell (michael@nunc.co.nz)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query

    // retrieve the member from the db which has a matching id
    if (req.method == "GET") {
        const member = await DI.MemberService.getMember(id as string)
        if (member != undefined) {
            res.status(200).json({member: member})
        }
        res.status(500).json({member: null})
    }

    // update the member from the db which has a matching id
    if (req.method == "POST") {
        const member = Member.fromObj(JSON.parse(req.body))
        const memberResp = await DI.MemberService.updateMember(member)
        if (memberResp != undefined) {
            res.status(200).json({member: memberResp})
        }
        res.status(500).json({member: null})
    }

    // delete the4 member from the db which has a matching id
    if (req.method == "DELETE") {
        await DI.MemberService.deleteMember(id as string)
    }

}