import styled from "@emotion/styled";
import {ReactNode} from "react";
import {CustomComponentProps} from "../util/CustomComponentProps";
import {useTheme} from "@emotion/react";

// TODO: Fix
const CustomTable = styled.table`


    
`

  //text-align: left;
  ////min-width: 50vw;
  //border-spacing: 0;

  // thead {
  //   background-color: ${theme.};
  //   color: ${props => props.theme.palette};
  // }
  //
  // th {
  //   height: 3rem;
  // }
  //
  // td {
  //   padding: 15px 0;
  //   border-bottom: 2px solid black;
  //
  //   img {
  //     margin: 10px;
  //   }
  // }
  //
  // th, td {
  //   padding-left: 15px;
  //   padding-right: 50px;
  // }
  //
  // #clickable {
  //   cursor: pointer;
  //   transition: 0.2s all ease;
  //
  //   &:hover {
  //     background-color: lightgray;
  //   }
  // }
// `

interface StyledTableProps extends CustomComponentProps {
    children: ReactNode
}

const StyledTable = ({children, className} : StyledTableProps) => {
    return (
        <CustomTable className={className}>
            {children}
        </CustomTable>
    )
}

const Table = styled(StyledTable)``

export default Table