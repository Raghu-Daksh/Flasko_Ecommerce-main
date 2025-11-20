import styled from "@emotion/styled";
import {  Button, ButtonGroup } from "@mui/material"

const Component = styled(ButtonGroup)`
    margin-top:10px;
`

const GroupedButton = ()=>{
    return (
        <Component>
            <Button style={{borderTopLeftRadius: '50%', borderBottomLeftRadius: '50%'}}>-</Button>
            <Button disabled>1</Button>
            <Button style={{borderTopRightRadius: '50%', borderBottomRightRadius: '50%'}}>+</Button>
        </Component>
    )
}
export default GroupedButton;