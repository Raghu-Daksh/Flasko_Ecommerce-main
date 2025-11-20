import { Box, Grid } from "@mui/material";
import { imageURL } from "../../data/data";

const  MidSection = ()=>{
    return (
        <Grid lg={12} sm={12} md={12} xs={12}  container>
            {
                imageURL.map((image,key)=>(
                    <Grid key={key} item lg={4} sm={4} md={12} xs={12}>
                        <img style={{width:"100%"}} src={image} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default MidSection;