import {CustomComponentProps} from "@/common/component/util/CustomComponentProps";
import {Member} from "@/module/member/model/Member";
import {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowProps, GridRowsProp} from "@mui/x-data-grid";

interface MemberTableProps extends CustomComponentProps {
    members: Member[]
}

/**
 * Tables used to view member data across the app.
 */
const MemberTable = (props: MemberTableProps) => {

    const [membersData, setMembersData] = useState(props.members)
    const [rows, setRows] = useState<GridRowsProp>()
    const [columns, setColumns] = useState<GridColDef[]>()

    useEffect(() => {
        setMembersData(props.members)
    }, [props.members])

    useEffect(() => {
        let tempColumns: GridColDef[] = [
            { field: 'firstName', headerName: 'First name', width: 150 },
            { field: 'lastName', headerName: 'Last name', width: 150 },
        ]

        let tempRows: GridRowsProp = membersData.map((row, count) => {
            return {
                id: count,
                firstName: row.firstName,
                lastName: row.lastName
            }
        })

        setColumns(tempColumns)
        setRows(tempRows)
    }, [membersData])



    if (rows != null && columns != null) {
        return (
            <div style={{ height: 600, width: '70%' }}>
                <DataGrid rows={rows!!} columns={columns!!} sx={{borderColor: 'grey.A200'}}/>
            </div>
        )
    }

    return null

}

export default MemberTable