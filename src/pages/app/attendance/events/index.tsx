import AppPage from "../../../../common/component/pages/AppPage";
import {AttendanceEvent} from "@module/attendance/model/AttendanceEvent";
import AttendanceEventForm from "@module/attendance/component/AttendanceEventForm";

interface AttendanceEventsProps {
    events: Array<AttendanceEvent>
}

const AttendanceEvents = ({events} : AttendanceEventsProps) => {

    return (
        <AppPage>
            <AttendanceEventForm />
        </AppPage>
    )

}

export default AttendanceEvents