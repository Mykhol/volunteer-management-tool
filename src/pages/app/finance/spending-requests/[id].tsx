import AppPage from "../../../../common/component/pages/AppPage";
import {GetServerSidePropsContext} from "next";
import classToDto from "@/common/util/ClassToDto";
import Table from "../../../../common/component/tables/StyledTable";
import {SpendingRequest} from "@/module/spending-request/SpendingRequest";
import {SpendingRequestDataView} from "@/common/component/form/old-form/SpendingRequestDataView";
import {DI} from "@/common/util/di/DI";
import styled from "@emotion/styled";

const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
  align-items: start;

  ${Table} {
    margin-right: 100px;
  }
`

const SpendingRequestsPage = ({request} : {request: SpendingRequest}) => {

    return (
        <AppPage>
            <UsersContent>
                {request ? <SpendingRequestDataView spendingRequest={request}/> : null}
            </UsersContent>
        </AppPage>
    )

}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {id} = context.query

    const request = await DI.SpendingRequestService.getSpendingRequest(id as string)

    return {
        props: {
            request: classToDto(request)
        }
    }
}

export default SpendingRequestsPage