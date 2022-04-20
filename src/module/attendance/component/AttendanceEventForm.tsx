import {Button, MenuItem, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useEffect, useState} from "react";
import {MemberGroup} from "@module/member-group/model/MemberGroup";
import {AttendanceEventType} from "@module/attendance/model/AttendanceEvent";
import styled from "styled-components";

const FormContainer = styled.div`

  width: 400px;

  h2 {
    margin-bottom: 15px;
  }

`

const FormInputContainer = styled.div`
  > * {
    margin-bottom: 20px;
    width: 100%;
  }

`

const AttendanceEventForm = () => {


    const [eventName, setEventName] = useState<string | null>(null)
    const [eventDate, setEventDate] = useState<Date | null>(new Date())
    const [startTime, setStartTime] = useState<number | null>(0)
    const [endTime, setEndTime] = useState<number | null>(0)
    const [eventType, setEventType] = useState<AttendanceEventType>()

    const [allMemberGroups, setAllMemberGroups] = useState<MemberGroup[]>()


    // Get list of all member groups
    useEffect(() => {
        fetch("/api/member-groups").then((memberGroups) => {
            // setAllMemberGroups(memberGroups)
        })
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormContainer>
                <h2>Create new attendance event</h2>
                <FormInputContainer>
                    {/* Render the event name field */}
                    <TextField label="Event Name" variant="outlined" InputLabelProps={{ shrink: true }}/>

                    {/* Render the date picker */}
                    <DatePicker
                        label="Event Date"
                        inputFormat={"dd/MM/yyyy"}
                        value={eventDate}
                        onChange={(newValue) => { setEventDate(newValue)}}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    {/* Render the start time picker */}
                    <TimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue);
                        }}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    {/* Render the end time picker */}
                    <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={(newValue) => {
                            setEndTime(newValue);
                        }}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    {/* Render the event type select dropdown */}
                    <TextField
                        variant={"outlined"}
                        required={true}
                        label="Event Type"
                        InputLabelProps={{ shrink: true }}
                        value={null}
                        onChange={() => null}
                        select={true}
                    >
                        <MenuItem value={0}>Meeting / Workshop</MenuItem>
                        <MenuItem value={1}>Event</MenuItem>
                        <MenuItem value={2}>Other</MenuItem>
                    </TextField>

                    {/* Render the member group select dropdown */}
                    <TextField
                        variant={"outlined"}
                        required={true}
                        label="Member Group"
                        InputLabelProps={{ shrink: true }}
                        value={null}
                        onChange={() => null}
                        select={true}
                    >
                        {allMemberGroups?.map((memberGroup) => {
                            return (
                                <MenuItem value={memberGroup.id!!}>{memberGroup.name}</MenuItem>
                            )
                        })}

                    </TextField>
                    <Button variant={"contained"}>Create Event</Button>
                </FormInputContainer>

            </FormContainer>
        </LocalizationProvider>
    )
}

export default AttendanceEventForm