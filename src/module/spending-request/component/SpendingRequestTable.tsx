import {SpendingRequest} from "@module/spending-request/model/SpendingRequest";
import {CustomComponentProps} from "@common/component/util/CustomComponentProps";
import {Skeleton} from "@mui/lab";
import {DataGrid} from "@mui/x-data-grid";

/**
 * The interface for the SpendingRequestTable props
 */
interface SpendingRequestTableProps extends CustomComponentProps {
    spendingRequests: SpendingRequest[] | undefined
}

/**
 * Displays a table of spending requests.
 */
const SpendingRequestTable = (props: SpendingRequestTableProps) => {

    // If the data is not available display a loading panel
    if (!props.spendingRequests) {
        return (
            <Skeleton variant={"rectangular"} width={'100%'} height={800}/>
        )
    }

    console.log(props.spendingRequests)

    const spendingRequestColumns = [
        {
            field: "submitter",
            headerName: "Submitter (email)",
            width: 250
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 100
        },
        {
            field: "budget",
            headerName: "Budget",
            width: 200
        }
    ]

    const spendingRequestRows = props.spendingRequests.map((request) => {
        return {id: request.id, submitter: request.submitter, amount: request.amount, budget: request.budget}
    })


    return (
        <div style={{height: 800, width: '50%'}}>
            <DataGrid
                columns={spendingRequestColumns}
                rows={spendingRequestRows}
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
    )

}

export default SpendingRequestTable