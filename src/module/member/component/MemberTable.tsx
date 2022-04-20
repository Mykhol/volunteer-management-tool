import {CustomComponentProps} from "@common/component/util/CustomComponentProps";
import {Member} from "@module/member/model/Member";
import {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowProps, GridRowsProp} from "@mui/x-data-grid";
import {getVaccinationStatusText} from "@module/member/model/VaccinationStatus";

interface MemberTableProps extends CustomComponentProps {
    members: Member[]
    onRowClick?: (member: Member) => any
}

/**
 * Tables used to view member data across the app.
 */
const MemberTable = ({onRowClick = (member: Member) => {},...props}: MemberTableProps) => {

    const [membersData, setMembersData] = useState(props.members)
    const [rows, setRows] = useState<GridRowsProp>()
    const [columns, setColumns] = useState<GridColDef[]>()

    const handleRowClick = (memberId: string) => {

        const member = membersData.find((member) => {
            return member.id == memberId
        })

        onRowClick(member!!)

    }

    useEffect(() => {
        setMembersData(props.members)
    }, [props.members])

    useEffect(() => {
        let tempColumns: GridColDef[] = [
            { field: 'firstName', headerName: 'First name', width: 150 },
            { field: 'lastName', headerName: 'Last name', width: 150 },
            { field: 'email', headerName: 'Email', width: 250 },
            { field: 'vaccinationStatus', headerName: 'Vaccination Status', width: 200 },
        ]

        let tempRows: GridRowsProp = membersData.map((member, count) => {
            return {
                id: member.id,
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.primaryEmail,
                vaccinationStatus: getVaccinationStatusText(member.vaccinationStatus)
            }
        })

        setColumns(tempColumns)
        setRows(tempRows)
    }, [membersData])



    if (rows != null && columns != null) {
        return (
            <div style={{ height: 600, width: '70%' }}>
                <DataGrid rows={rows!!} columns={columns!!} sx={{borderColor: 'grey.A400'}} onRowClick={(member) => handleRowClick(member.id as string)}/>
            </div>
        )
    }

    return null

}

export default MemberTable