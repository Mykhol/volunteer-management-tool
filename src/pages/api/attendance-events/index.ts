import {NextApiRequest, NextApiResponse} from "next";
import {DI} from "@common/di/DI";
import {Member} from "@module/member/model/Member";
import {MemberGroup} from "@module/member-group/model/MemberGroup";
import {AttendanceEvent} from "@module/attendance/model/AttendanceEvent";

/**
 * Handles the 'api/attendance-events' endpoint.
 *
 * If the HTTP Method is GET the handler should return all attendance events, if the HTTP Method is POST the handler should,
 * create a new attendance event.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "GET") {
        const attendanceEvents = await DI.AttendanceEventService.getAllAttendanceEvents()
        if (attendanceEvents != undefined) {
            res.status(200).json(attendanceEvents)
            return
        }

        res.status(500).json(null)
        return
    }

    if (req.method == "POST") {
        const attendanceEvent = AttendanceEvent.fromObj(JSON.parse(req.body))
        const resp = await DI.AttendanceEventService.addAttendanceEvent(attendanceEvent)

        if (resp != undefined) {
            res.status(200).json(resp)
            return
        }

        res.status(500).json(null)
        return
    }
}