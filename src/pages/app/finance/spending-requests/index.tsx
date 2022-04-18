import AppPage from "@common/component/pages/AppPage";
import StyledTable from "@common/component/tables/StyledTable";
import Table from "@common/component/tables/StyledTable";
import {SpendingRequest} from "@module/spending-request/model/SpendingRequest";
import {SpendingRequestDataView} from "@common/component/form/old-form/SpendingRequestDataView";
import {useState} from "react";
import styled from "@emotion/styled";
import useSWR from "swr";

const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
  align-items: start;

  ${Table} {
    margin-right: 100px;
  }
  
`

const SpendingRequestsPage = () => {

    const [spendingRequest, setSpendingRequest] = useState<SpendingRequest | null>(null)

    const {data} = useSWR("/api/spending-requests")

    const getGst = (number: number) : number => {
        return number - (number/1.15)
    }

    const spendingRequestSelect = (id: string) => {
        const selectedUser = data.requests.find((request: SpendingRequest) => {
            return request.id == id
        }) || null

        setSpendingRequest(selectedUser)
    }

    return (
        <AppPage>
            <UsersContent>
            <StyledTable>
                <thead>
                <tr>
                    <th>Requester</th>
                    <th>Amount</th>
                    <th>GST</th>
                    <th>Budget</th>
                    <th>Spending Reason</th>
                    <th>Submit Time</th>
                    <th>File</th>
                </tr>
                </thead>
                {data.requests?.map((request: SpendingRequest) => {

                    const date  = new Date(request.submitTimeStamp)

                    let amount: number

                    amount = parseFloat(request.amountString!!)

                    return (
                        <tr id={"clickable"} key={request.id} onClick={() => spendingRequestSelect(request.id!!)}>
                            <td>{request.submitter}</td>
                            <td>${amount.toFixed(2)}</td>
                            <td>{request.gstInclusive ? "$"+getGst(Math.round(amount * 10) / 10).toFixed(2) : "$0.00"}</td>
                            <td>{request.budget}</td>
                            <td>{request.spendingReason}</td>
                            <td>{date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()}</td>
                            <td>{request.doc ? <a rel={"noreferrer"} href={request.doc!!} target={"_blank"}>File</a> : "-"}</td>
                        </tr>
                    )
                })}
            </StyledTable>
            {spendingRequest ? <SpendingRequestDataView spendingRequest={spendingRequest}/> : null}
            </UsersContent>
        </AppPage>
    )

}

export default SpendingRequestsPage