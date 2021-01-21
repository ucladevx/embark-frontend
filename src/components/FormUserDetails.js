import {Grid, TextField, Button} from "@material-ui/core";
import theme from "../utils/theme.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
import GoogleButton from 'react-google-button';

const FormUserDetails = ({setForm, formData, navigation}) => {
    const { firstName, lastName} = formData;

    const { next } = navigation;
    
    return (
            <Grid container style={{ minHeight: "100vh" }}>
                <Grid item xs={6} >
                    
                </Grid>
                <Grid container item xs={12} sm={6} alignItems="center" justify="space-between" direction="column">
                    <MuiThemeProvider theme={theme}>
                    <div background={theme.background} />   
                    <div>
                        <div>
                            <GoogleButton
                                onClick={() => { console.log('Google button clicked') }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300 }}>
                            <div>
                                <TextField label="First Name" margin="normal" />
                                <TextField label="Last Name" margin="normal" />
                            </div>
                            <TextField label="Email" margin="normal" />
                            <TextField label="Password" margin="normal" />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={next}
                        >
                            Next
                        </Button>
                    </div>
                    </MuiThemeProvider>
                    <div />
                </Grid>
            </Grid>
    );
}
export default FormUserDetails;