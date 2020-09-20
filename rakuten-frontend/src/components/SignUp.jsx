import React, {useEffect, useState } from 'react';
import postUser from '../api/postUserAPI';
import HumanForm, {AnimalForm} from '../hooks/useUser';
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
import themeDark,{signup_style} from './theme'
import RedditTextField from './RedditTextField'

import HumanFormUI from './HumanFormUI'
import AnimalFormUI from './AnimalFormUI'
import Qestion from './Qestion'
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,} from '@material-ui/core/styles';





const User = ({ name, age }) => {
return (
    <div>
        <p>name : {name}</p>
        <p>age : {age}</p>
        <hr/>
    </div>
)
}

// 人間のみのユーザプロフィール
const UserHuman = ({ email, pw }) => {
    return (
        <div>
            <p>email : {email}</p>
            <p>pw : {pw}</p>
            <hr/>
        </div>
    )
}
// 人間のみのユーザプロフィール
const UserAnimal = ({ email,pw,name, type,barthday,sex,residence }) => {
    return (
        <div>
            <p>email : {email}</p>
            <p>pw : {pw}</p>
            <p>name : {name}</p>
            <p>type : {type}</p>
            <p>barthday : {barthday}</p>
            <p>sex : {sex}</p>
            <p>residence : {residence}</p>
            <hr/>
        </div>
    )
}
const Main = () => {
    const classes = signup_style();
    // human

    const [showQestion, setshowQestion] = useState(false)
    const [showHumanForm, setshowHumanForm] = useState(false)
    const [ShowAnimalForm, setShowAnimalForm] = useState(true)
    const [loading, setLoading] = useState(true)
    // const [values, setValues] = React.useState({
    //     showPassword: false,//ToDO I want to  togle show pass
    //     showQestion:false, //To show "Are you human or Animal "
    //     showAnimalSignUp:false, //To show " SignUp of Animal "
    //   });
    // const [values, setValues] = React.useState({
    //     showPassword: false,//ToDO I want to  togle show pass
    //     showQestion:false, //To show "Are you human or Animal "
    //     showAnimalSignUp:false, //To show " SignUp of Animal "
    //   });

    
    // const handleClickShowPassword = () => {
    // setValues({ ...values, showPassword: !values.showPassword });
    // };

    // const handleMouseDownPassword = (event) => {
    // event.preventDefault();
    // };


    // const {
    //     handleChange, 
    //     handleSubmit, 
    //     state, 
    // } = HumanForm()

    // const onChange = e => {
    //     console.log(state.password);
    //     console.log(state.email);

    //     handleChange(e)
    //     setErrorMessage(null)
    // }
    // const onSubmit = e => {
    //     e.preventDefault()
    //     handleSubmit(state)
    //     setshowQestion(true)
    //     console.log(showQestion);
    // } 
    const humanSubmit = () => {
        setshowHumanForm(false)
        setShowAnimalForm(false)
        setshowQestion(true)

    } 
    const QestionSubmit = () => {
        setShowAnimalForm(true)

    } 
    // useEffect(async () => {

    //     getUser()
    //     .then((u) => {
    //         console.log(u);
    //         setUser(u)
    //         setLoading(false)
    //     })
    //     .catch((e) => {
    //         throw new Error(e)
    //     })
    // }, [])


    // 
    return (
        <Container component="main" maxWidth="false">
        <MuiThemeProvider theme={themeDark}>
        <CssBaseline />
        
        <div className={classes.paper} >
        {showHumanForm  ? ( <HumanFormUI signup_style={signup_style} humanSubmit={humanSubmit} /> ): null}

        {showQestion  ? ( <Qestion  signup_style={signup_style} QestionSubmit={QestionSubmit}  />) : null}
        {ShowAnimalForm  ? ( <AnimalFormUI  signup_style={signup_style}  />) : null}
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        {/* <Typography   className={classes.animar} color="secondary" component="h1" variant="h4">
        animar
        </Typography>
        <Typography className={classes.guide} color="secondary" component="h2" variant="h5">
        Enter your
        </Typography>
        <Typography  color="secondary" component="h2" variant="h4">
        email and password
        </Typography>
        
        
        <form  onSubmit={onSubmit} className={classes.form,classes.sign_in_card} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <RedditTextField
                    variant="outlined"
                    required
                    fullWidth
                    name="email"
                    label="email"
                    type="name"
                    id="name"
                    autoComplete="email"
                    value={state.email} 
                    onChange={onChange} 
                    placeholder="email"
                />
                </Grid>
                <Grid item xs={12}>
                <RedditTextField
                    variant="outlined"
                    required
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
            
        </form>*/ }
        </div>
        </MuiThemeProvider>
        
        </Container>

    )
}

export default Main