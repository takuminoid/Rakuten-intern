import React, {useEffect, useState } from 'react'
import getUser from '../api/getUserAPI'
import postUser from '../api/postUserAPI'
import UserForm from '../hooks/useUser'

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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {commonStyle} from './style';
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

const override2 = makeStyles((theme) => ({
    root:{
    "&$PrivateNotchedOutline $root": {
      borderWidth:" 0px",
    }}
  }));
const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: 'None',
      "& $notchedOutline": {   //add this nested selector
        borderWidth: "0",
     },

     "&$cssFocused $notchedOutline": {
        borderWidth: "0",
     },
      overflow: 'hidden',
      borderRadius: 14,
      backgroundColor: '#fcfcfb',
    //   transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
        
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
      "& $MuiOutlinedInput-root.Mui-focused fieldset" :{
        borderColor: "FFF",

      }
    },
    focused: {},
  }));
  
function RedditTextField(props) {
const classes = useStylesReddit();

return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
const themeDark = createMuiTheme({
    palette: {
    primary: {
        light: '#87BCBF',
        main: '#D97D54',
        dark: '#324755',
        contrastText: '#fff',
        },
        secondary: {
        light: '#FFFFFF',
        main: '#FFFFFF',
        dark: '#1B1C20',
        contrastText: '#000',
        },
    textPrimary:{ default: "#fff"},
    textSecondary:{ default: "#324755"},
      background: {
        default: "#D97D54"
      },
      text: {
        primary: "#324755",
        // secondary: "#ffffff",
      },
      overrides: {
        MuiOutlinedInput: {
            root: {
                '& $notchedOutline': {
                    border: '0px',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    border: '0px',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        border: '0px',
                    },
                },
                '&$focused $notchedOutline': {
                    border: '0px',
                    borderWidth: 0,
                },
            },
        },}
 
 
  }});
  
const User = ({ name, age }) => {
    return (
        <div>
            <p>name : {name}</p>
            <p>age : {age}</p>
            <hr/>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(3),

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#D97D54'

    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#FFF'
    },
    animar: {
    marginBottom: theme.spacing(5),
    },
    guide: {
        marginTop: theme.spacing(10),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    
    text_filed: {
        borderWidth: '0',
        border: '0',
    },
    submit: {
        borderWidth: '0',
        border: '0',
        margin: theme.spacing(3, 0, 2),
        borderRadius: 14,

        boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.04), 0px 2px 2px 0px rgba(0,0,0,0.04), 0px 1px 5px 0px rgba(0,0,0,0.04)",
    },
    sign_in_card: {
        marginTop: theme.spacing(3),
        width: "100%",
        background: "rgba(255,255,255,0.8);",
        paddingTop:"10%",
        paddingBottom:"10%",
        borderRadius: "4%",
        borderWidth: '0',

        boxShadow: "0 2px 5px #ccc",
        '& > div': {
            padding:" 5%"
          },
        //   '& > Button': {
        //     padding:" 5%"
        //   },
          
      },
      sign_in_card_content: {
        padding:" 20px"
      }
  }));


  
const Main = () => {
    const [errorMessage, setErrorMessage] = useState()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const override3 = override2();

    const dom = user

    const {
        handleChange, 
        handleSubmit, 
        state, 
    } = UserForm()

    const onChange = e => {
        console.log(state.age);
        console.log(e);

        handleChange(e)
        setErrorMessage(null)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
         
        dom.push({"name": state.name, "email": state.email, "password": state.password})
    } 
    
    useEffect(async () => {

        getUser()
        .then((u) => {
            setUser(u)
            setLoading(false)
        })
        .catch((e) => {
            throw new Error(e)
        })
    }, [])
    const classes = useStyles();
    // const [light, setLight] = React.useState(true);

    return (
        <Container component="main" maxWidth="false">
        <MuiThemeProvider theme={themeDark}>
        <CssBaseline />
        
        <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography   className={classes.animar} color="secondary" component="h1" variant="h4">
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
                    name="name"
                    label="name"
                    type="name"
                    id="name"
                    className={override3.root}
                    autoComplete="name"
                    value={state.name} 
                    onChange={onChange} 
                    placeholder="name"
                />
                </Grid>
                <Grid item xs={12}>
                <RedditTextField
                    variant="outlined"
                    required
                    fullWidth
                    id="standard-number"
                    label="age"
                    name="age"
                    type="number"
                    className={{root:classes.text_filed}}
                    // color="textPrimary"
                    autoComplete="age"
                    value={state.age}
                    onChange={onChange}
                    placeholder="age"
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
        </div>
        </MuiThemeProvider>
        
        </Container>

    )
}

export default Main