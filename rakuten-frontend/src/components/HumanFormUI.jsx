import React, {useEffect, useState } from 'react';
// import getUser from '../api/getUserAPI';
import postUser from '../api/postUserAPI';
import HumanForm, {AnimalForm} from '../hooks/useUser';
// import  UserForm from '../hooks/useUser'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import {commonStyle} from './style';
import RedditTextField from './RedditTextField'

// import {commonStyle} from './style';
// import {commonStyle} from './style';
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

const HumanFormUI= ({signup_style,humanSubmit}) =>  {
    const classes = signup_style();
    const {
        handleChange, 
        handleSubmit, 
        state, 
    } = HumanForm()

    const onChange = e => {
        console.log(state.password);
        console.log(state.email);

        handleChange(e)
        setErrorMessage(null)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
        humanSubmit()
    } 
    
    // human
    // const onSubmit = data => console.log(data);
    const [errorMessage, setErrorMessage] = useState()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [values, setValues] = React.useState({
        showPassword: false,//ToDO I want to  togle show pass
        showQestion:false, //To show "Are you human or Animal "
        showAnimalSignUp:false, //To show " SignUp of Animal "
      });

    return(
    <div className={classes.paper}>

    <Typography   className={classes.animar} color="secondary" component="h1" variant="h4">
    animar
    </Typography>
    <Typography className={classes.guide} color="secondary" component="h2" variant="h5">
    Enter your
    </Typography>
    <Typography  color="secondary" component="h2" variant="h4">
    email and password
    </Typography>
    
    
    <form  onSubmit={onSubmit} className={classes.form,classes.sign_in_card} >
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                name="email"
                label="email"
                type="name"
                id="name"
                autoComplete="email"
                value={state.email} 
                onChange={onChange} 
                placeholder="email"
                validators={['email']}
                // helperText="Incorrect entry."
                            /> 
            </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                id="standard-adornment-password"
                type= 'password'
                type={values.showPassword ? 'text' : 'password'}
                label="password"
                name="password"
                // color="textPrimary"
                // autoComplete="password"
                value={state.password}
                onChange={onChange}
                // InputProps={{
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <IconButton
                //           aria-label="Toggle password visibility"
                //         //   onClick={this.handleClickShowPassword}
                //         >
                //           {/* {this.state.showPassword ? <Visibility /> : <VisibilityOff />} */}
                //         </IconButton>
                //       </InputAdornment>
                //     ),
                //   }}
                // placeholder="password"
                // endAdornment={
                // <InputAdornment position="end">
                //     <IconButton
                //     aria-label="toggle password visibility"
                //     onClick={handleClickShowPassword}
                //     onMouseDown={handleMouseDownPassword}
                //     >
                //     {values.showPassword ? <Visibility /> : <VisibilityOff />}
                //     </IconButton>
                // </InputAdornment>
                // }
            />
            </Grid>
        </Grid>
        <div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
        >
            Next
        </Button></div>

    </form>
    </div>) }
export default HumanFormUI;