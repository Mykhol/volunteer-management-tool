/**
 * Class that represents an event for which attendance is recorded.
 */
export class AttendanceEvent {

    constructor(public id: string | null,
                public name: string,
                public date: Date,
                public startTime: number,
                public endTime: number,
                public memberGroup: {id: string, name: string},
                public eventType: AttendanceEventType
    ) {}

    static fromObj(obj: AttendanceEvent): AttendanceEvent {
        return new AttendanceEvent(
            obj.id, obj.name, obj.date, obj.startTime, obj.endTime, obj.memberGroup,obj.eventType
        )
    }

}

export enum AttendanceEventType {
    GENERAL_WORKSHOP = "GENERAL_WORKSHOP",
    EVENT = "EVENT",
    OTHER = "OTHER"
}

export const getAttendanceEventTypeText = (eventType: AttendanceEventType) : string => {

    switch (eventType) {
        case AttendanceEventType.GENERAL_WORKSHOP:
            return "Workshop / Meeting"

        case AttendanceEventType.OTHER:
            return "Other"

        case AttendanceEventType.EVENT:
            return "Event"
    }
}