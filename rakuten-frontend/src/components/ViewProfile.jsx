import React, {useState, useEffect ,useRef, Fragment,useCallback} from 'react'
import GetPosts from '../api/getPostAPI'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Maintheme} from './theme';
import {PostForm} from '../hooks/useUser';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import getAnimal from '../api/getAnimal'
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    createMuiTheme,} from '@material-ui/core/styles';
    const useStyles = makeStyles((theme) => ({
        root: {
        marginTop: "10%",
        marginLeft: "10%",
        marginRight: "10%",
          maxWidth: "80%",
        },
        input: {
            display: 'none'
        },
        paper: {
            paddingBottom: 50,
          },
        media: {
          height: 0,
          paddingTop: '56.25%', // 16:9
        },
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
        MuiFabroot:{
            // box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    
        },
        icons:{
    
        },
        avatar: {
          
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
          },
          appBar: {
            top: 'auto',
            bottom: 0,
            paddingLeft: "15%",
            paddingRight: "15%",
    
          },
          grow: {
            flexGrow: 1,
          },
          fabButton: {
            position: 'absolute',
            zIndex: 1,
            top: -30,
            left: 0,
            boxShadow:" 0px 5px 8px 1px rgba(217, 125, 84, 0.57)",
    
            right: 0,
            margin: '0 auto',
          },
      }));
//TODO show image
const User = ({name, sex, type, birthday, residence, profile}) => {
    return (
        <div>
            <p>name : {name}</p>
            <p>sex : {sex == 0 ? 'male' : 'female'}</p>
            <p>species : {type}</p>
            <p>location : {residence}</p>
            <p>birthday : {birthday}</p>
            <p>profile : {profile}</p>
        </div>
    )
}

const ViewProfile = () => {
    const [animal, setAnimal] = useState([])
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [Posts, setPosts] = useState([]) // レンダーするpostデータ
    const [avata_image, setpage] = useState("") //ページ番号


    const dom = [animal]
    const DumyAnimalState = {
        name: "Somo", 
        type: "Cat",
        barthday: 2020/10/20,
        sex: 0,
        residence: "Chiba",
        // email: null,
        // password: null,
        image:null,
        profile:"I am Cat imao",
    }
    
    // useEffect( async() => {
    //     getAnimal()
    //     .then((u) => {
    //         setAnimal(u)
    //         setLoading(false)
    //     })
    //     .catch((e) => {
    //         throw new Error(e)
    //     })
    // }, [])

    return (
        <div>
            <MuiThemeProvider theme={Maintheme}>
                <Paper square className={classes.paper}>

                    <AppBar position="fixed" >

                        <Typography position="fixed" className={classes.text} variant="h5" gutterBottom  >
                            Animar
                </Typography>

                    </AppBar>
                    <Grid container spacing={2} alignItems="center" justify="center">

                        <Grid item xs={12} alignItems="center" justify="center">
                            <Avatar src={avata_image} className={classes.avatar}>
                            </Avatar>
                        </Grid>
                    </Grid>
                    <AppBar position="fixed" color="primary" className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="open drawer"  >
                                <HomeIcon />
                            </IconButton>

                            <IconButton color="inherit">
                                <PetsIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Paper>
            </MuiThemeProvider>
        </div>
    )

}

export default ViewProfile