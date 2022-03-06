import AppPage from "../../../../common/component/pages/AppPage";
import StyledTable from "../../../../common/component/ui/tables/StyledTable";
import {AttendanceEvent} from "../../../../module/attendance-event/Event";

interface AttendanceEventsProps {
    events: Array<AttendanceEvent>
}

const AttendanceEvents = ({events} : AttendanceEventsProps) => {

    return (
        <AppPage>
            <StyledTable>
                <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Event Time</th>
                </tr>
                </thead>
                <tbody>
                {events?.map((event) => {
                    return (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.startTime} - {event.endTime}</td>
                        </tr>
                    )
                })}
                </tbody>
            </StyledTable>
        </AppPage>
    )

}

export default AttendanceEvents