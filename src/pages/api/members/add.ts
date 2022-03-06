import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../module/firestore/FirebaseAdminService";
import {MemberService} from "../../../module/member/MemberService";
import {Member} from "../../../module/member/Member";
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

