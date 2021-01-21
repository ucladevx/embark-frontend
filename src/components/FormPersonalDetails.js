import { Grid, TextField, Button } from "@material-ui/core";
import theme from "../utils/theme.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuItem from '@material-ui/core/MenuItem';


const FormPersonalDetails = ({ setForm, formData, navigation }) => {
    const { firstName, lastName, nickName } = formData;

    const { next } = navigation;

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container style={{ minHeight: "100vh" }}>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid container item xs={12} sm={6} alignItems="center" justify="space-between" direction="column">
                    <div />
                    <div>
                        <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300 }}>
                            <TextField id="select" label="Year" value="2020" select>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                            </TextField>
                            <TextField label="Major" margin="normal" />
                            <TextField id="select" label="Interested Industries:" value="Industry" select>
                                <MenuItem value="Developer">Developer</MenuItem>
                                <MenuItem value="Design">Design</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                                <MenuItem value="Product Management">Product Management</MenuItem>
                            </TextField>
                            <TextField label="LinkedIn Profile: (Optional)" margin="normal" />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={() => console.log("TODO: create account")}
                        >
                            Done
                        </Button>
                    </div>
                    <div />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
}
export default FormPersonalDetails;