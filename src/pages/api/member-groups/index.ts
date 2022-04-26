import {NextApiRequest, NextApiResponse} from "next";
import {DI} from "@common/di/DI";
import {Member} from "@module/member/model/Member";
import {MemberGroup} from "@module/member-group/model/MemberGroup";

/**
 * Handles the 'api/member-groups' endpoint.
 *
 * If the HTTP Method is GET the handler should return all member groups, if the HTTP Method is POST the handler should,
 * create a new member group.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // return all the member groups
    if (req.method == "GET") {
        const memberGroups = await DI.MemberGroupService.getAllMemberGroups()
        if (memberGroups != undefined) {
            res.status(200).json(memberGroups)
            return
        }

        res.status(500).json(null)
        return
    }

    // create a new member group
    if (req.method == "POST") {
        const memberGroup = MemberGroup.fromObj(JSON.parse(req.body))
        const resp = await DI.MemberGroupService.addMemberGroup(memberGroup)

        if (resp != undefined) {
            res.status(200).json(resp)
            return
        }

        res.status(500).json(null)
        return
    }
}