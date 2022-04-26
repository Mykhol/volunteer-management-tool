import {Member} from "@module/member/model/Member";
import {AppResponse} from "@module/network/model/AppResponse";
import "../../../extensions"


const pushMember = async (member: Member): Promise<AppResponse<Member>> => {

    if (!member.isValid()) {
        return AppResponse.createError<Member>(null, "There was an issue with the members data.")
    }

    const options = {
        method: "POST",
        body: JSON.stringify(member)
    }

    const updateResp = await fetch("/api/members/", options)
    const json = await updateResp.json()
    const respMember = json.member

    if (!updateResp.status.isSuccessful()) {
        return AppResponse.createError<Member>(null, "The member's data had issues.")
    }

    return AppResponse.createOk<Member>(respMember, "Looks good?")

}

export default pushMember