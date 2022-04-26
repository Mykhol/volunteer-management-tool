import {CustomComponentProps} from "@common/component/util/CustomComponentProps";
import {Member} from "@module/member/model/Member";
import {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp} from "@mui/x-data-grid";
import {Avatar} from "@mui/material";
import {TableContainer} from "@common/component/base-table/TableUtil";

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
            {
                field: 'photo',
                headerName: '',
                align: "center",
                flex: 0,
                renderCell: (params: GridRenderCellParams<{url: string, initials: string}>) => (
                    <Avatar src={params.value.url} alt={params.value.initials}/>
                )
            },
            { field: 'firstName', headerName: 'First name', flex: 1},
            { field: 'lastName', headerName: 'Last name', flex: 1},
            { field: 'email', headerName: 'Email', flex: 1},
            { field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1},
        ]

        let tempRows: GridRowsProp = membersData.map((member, count) => {
            return {
                id: member.id,
                photo: {url: member.picture, initials: member.firstName[0]+member.lastName[0] || "?"},
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.primaryEmail,
                dateOfBirth: member.dateOfBirth,
            }
        })

        setColumns(tempColumns)
        setRows(tempRows)
    }, [membersData])



    if (rows != null && columns != null) {
        return (
            <TableContainer style={{marginRight: "50px"}}>
                <DataGrid rows={rows!!} columns={columns!!} sx={{borderColor: 'grey.A400'}} onRowClick={(member) => handleRowClick(member.id as string)}/>
            </TableContainer>
        )
    }

    return null

}

export default MemberTable