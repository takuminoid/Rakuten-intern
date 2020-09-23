import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider } from '@material-ui/core/styles';
import themeSignUp,{signup_style, error_page} from './theme'
import Typography from '@material-ui/core/Typography'

const NotFound = () => {
    const classes = error_page();
    return (
        <Container component="main" maxWidth="false"> 
            <MuiThemeProvider theme={themeSignUp}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography   color="secondary" component="h1" variant="h2">
                        404
                        <br />
                        Page not found
                    </Typography>
                    <img src={`${process.env.PUBLIC_URL}/neko.png`} className={classes.img} />
                </div>
            </MuiThemeProvider>
        </Container>
    )
}

export default NotFound

