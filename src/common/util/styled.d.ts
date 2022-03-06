/**
 * This tells emotion to use the MUI theme template as the theme it should expect on all it's components.
 */

import { Theme as MUITheme } from "@mui/material"

declare module '@emotion/react' {
    export interface Theme extends MUITheme {}
}