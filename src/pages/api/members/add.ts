import {NextApiRequest, NextApiResponse} from "next";
import {Member} from "@/module/member/model/Member";
import {DI} from "@/common/util/di/DI";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const member = Member.fromObj(JSON.parse(req.body))
    const newMember = await DI.MemberService.addMember(member)

    if (newMember == undefined) {
        res.status(500).send({user: null})
    } else {
        res.status(200).send({user: newMember})
    }

}

