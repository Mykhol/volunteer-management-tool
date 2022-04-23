import {Button, MenuItem, Skeleton, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useState} from "react";
import {MemberGroup} from "@module/member-group/model/MemberGroup";
import {
    AttendanceEvent,
    AttendanceEventType,
    getAttendanceEventTypeText
} from "@module/attendance/model/AttendanceEvent";
import {FormContainer, FormInputContainer} from "@common/component/container/FormUtil";
import useSWR from "swr";


const AttendanceEventForm = () => {


    const [eventName, setEventName] = useState<string>("")
    const [eventDate, setEventDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState<number>(0)
    const [endTime, setEndTime] = useState<number>(0)
    const [eventType, setEventType] = useState<AttendanceEventType>(AttendanceEventType.GENERAL_WORKSHOP)
    const [memberGroup, setMemberGroup] = useState<string>("")

    const {data} = useSWR("/api/member-groups")

    const allMemberGroups: MemberGroup[] = data

    const handleSubmit = () => {

        console.log("Submitting")

        const attendanceEvent = new AttendanceEvent(null,
            eventName,
            eventDate,
            startTime,
            endTime,
            {
                id: memberGroup,
                name: allMemberGroups.find((m) => m.id == memberGroup)!!.name
            },
            eventType)

        const options = {
            method: "POST",
            body: JSON.stringify(attendanceEvent)
        }

        fetch("/api/attendance-events", options).then((r) => {
            if (r.status.isSuccessful()) {

            }
        })

    }

    if (!data) {
        return (
            <>
            </>
        )
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <FormContainer>
                <h2>Create new attendance event</h2>
                <FormInputContainer>
                    {/* Render the event name field */}
                    <TextField label="Event Name"
                               variant="outlined"
                               InputLabelProps={{ shrink: true }}
                               onChange={(e) => setEventName(e.target.value)}
                    />

                    {/* Render the date picker */}
                    <DatePicker
                        label="Event Date"
                        inputFormat={"dd/MM/yyyy"}
                        value={eventDate}
                        onChange={(newValue) => { setEventDate(newValue || new Date())}}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    {/* Render the start time picker */}
                    <TimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue || 0);
                        }}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    {/* Render the end time picker */}
                    <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={(newValue) => {
                            setEndTime(newValue || 0);
                        }}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    {/* Render the event type select dropdown */}
                    <TextField
                        variant={"outlined"}
                        label="Event Type"
                        value={eventType}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEventType(e.target.value as AttendanceEventType)}
                        select={true}
                        SelectProps={{
                            renderValue: () => getAttendanceEventTypeText(eventType),
                            MenuProps: {
                                style: {
                                    maxHeight: 400,
                                }
                            }
                        }}
                    >
                        <MenuItem value={AttendanceEventType.GENERAL_WORKSHOP}>{getAttendanceEventTypeText(AttendanceEventType.GENERAL_WORKSHOP)}</MenuItem>
                        <MenuItem value={AttendanceEventType.EVENT}>{getAttendanceEventTypeText(AttendanceEventType.EVENT)}</MenuItem>
                        <MenuItem value={AttendanceEventType.OTHER}>{getAttendanceEventTypeText(AttendanceEventType.OTHER)}</MenuItem>
                    </TextField>

                    {/* Render the member group select dropdown */}
                    <TextField
                        variant={"outlined"}
                        required={true}
                        label="Member Group"
                        InputLabelProps={{ shrink: true }}
                        value={memberGroup}
                        onChange={(e) => setMemberGroup(e.target.value)}
                        select={true}
                        SelectProps={{
                            renderValue: (value) => allMemberGroups.find((group) => group.id == value)!!.name,
                            MenuProps: {
                                style: {
                                    maxHeight: 400,
                                }
                            }
                        }}
                    >
                        {allMemberGroups?.map((memberGroup) => {
                            return (
                                <MenuItem value={memberGroup.id!!}>{memberGroup.name}</MenuItem>
                            )
                        })}

                    </TextField>
                    <Button variant={"contained"} onClick={handleSubmit}>Create Event</Button>
                </FormInputContainer>

            </FormContainer>
        </LocalizationProvider>
    )
}

export default AttendanceEventForm