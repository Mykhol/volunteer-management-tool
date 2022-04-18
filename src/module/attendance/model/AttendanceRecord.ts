/**
 * Class that represents the data for each member associated with an attendance event.
 */
import {AttendanceType} from "@module/attendance/model/AttendanceType";

export class AttendanceRecord {

    /**
     * Constructs the instance of the class.
     *
     * @param id ID of the object.
     * @param meetingId The ID of the meeting the records are associated with.
     * @param memberId The ID of the member the object represents.
     * @param arriveTime The time at which the member arrived at the meeting. (defaults to the start time of the meeting)
     * @param leaveTime The time at which the member left the meeting. (defaults to the end time of the meeting)
     * @param notes Notes associated with the attendance record.
     */
    constructor(public id: string | null,
                public meetingId: string,
                public memberId: string,
                public arriveTime: string,
                public leaveTime: string,
                public notes: string) {
    }

    getAttendance(): AttendanceType {

    }
}