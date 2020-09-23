import React, {useState, useEffect ,useRef, useCallback} from 'react'
import { Waypoint } from 'react-waypoint';
import { makeStyles } from '@material-ui/core/styles';
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
// import GetPosts from '../api/getPostAPI'           
import AllPost from '../api/getPostAPI'
import { CreateLike, DeleteLike } from '../api/postLike'

import useGetUser from '../hooks/useGetUser'
import getAnimal from '../api/getAnimal'

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import { red } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Maintheme} from './theme';
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    createMuiTheme,} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    marginTop: "20%",
    marginBottom: "20%",
    marginLeft: "10%",
    marginRight: "10%",
      maxWidth: "80%",
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
const Home = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [Posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [page, setpage] = useState(1)
    const user = useGetUser()

    // const onChange =  async() => {
    //     setLoading(true)
    //     console.log("onChange");
    //     setpage(page+1)
    //     console.log(page);
    //     // GetPosts({page})
    //     AllPost()
    //     .then((u) => {
    //     setPosts(Posts.concat(u.hits))
    //     // setPosts()
    //         setLoading(false)
    //     })
    //     .catch((e) => {
    //         throw new Error(e)
    //     })
    // }


    useEffect(() => {
        const p = async () => {
            setLoading(true)
            // GetPosts({page})
            AllPost()
            .then((p) => {
                setPosts(p)
                setLoading(false)
            })
            .catch((e) => {
                throw new Error(e)
            })
        }
        p()
    }, [])

    const incrementGood = (id) => Posts[id-1].like += 1
    const decrementGood = (id) => Posts[id-1].like -= 1

    // ステートの更新まで実装
    
    const handleGood = async (id, good) => {
        const uid = user.user_id
        const goodRequest = good 
        ? DeleteLike(id, uid) 
        : CreateLike(id, uid)
        goodRequest
        .then(() => {
            good ? (
                decrementGood(id)
            ) : (
                incrementGood(id)
            )
        })
        .catch((e) => {
            throw new Error(e)
        })
    }

    useEffect(() => {
        setPosts(Posts)
    }, [Posts])

    const _renderItems = () => {
        const domain = 'http://localhost:8000'
        return Posts.map(function(p) {
            const goodYet = p.user_id === 'takurinton' ? true : false // ここをfavoriteに変更
          return (
              <div >
            {/* <img
              src={imageUrl.largeImageURL}
              key={index}
              />
                <img
              src={imageUrl.userImageURL}
              />
              <p>{imageUrl.tags} </p>
              <p>{imageUrl.likes} </p> */}

            <Card className={classes.root}>
                {/* <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" src={imageUrl.userImageURL} className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    // title="This is tile"
                    // subheader="September 14, 2016"
                /> */}
                <CardMedia
                    className={classes.media}
                    image={domain+p.image}
                    // title="Paella dish"
                />
                <CardContent>
                
            

                <Grid container spacing={2}>
                <Grid item xs={3}>
                <Avatar aria-label="recipe" src={p.user_id} className={classes.avatar}>
                        {p.user_id.slice(0,1)}
                    </Avatar></Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {p.content}
                    </Typography></Grid>

                    </Grid>

                </CardContent>
                <CardActions disableSpacing className={classes.icons}>
                <Grid item xs/>
                    {goodYet ? (
                        <IconButton aria-label="add to favorites" color="secondary" onClick={() => handleGood(p.id, goodYet)}>
                            <FavoriteIcon />
                            {p.like}
                        </IconButton>
                    ) : (
                        <IconButton aria-label="delete to favorites" onClick={() => handleGood(p.id, goodYet)}>
                            <FavoriteIcon />
                            {p.like}
                        </IconButton>
                    )}
                    
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                </CardActions>
                
                </Card>
                        </div>

                    );
                    });
      }
    // const data =getAnimal() dom.map(u => ( <User {...u} /> ))
    // console.log(posts);
    return (
        <div>
            <MuiThemeProvider theme={Maintheme}>
            <Paper square className={classes.paper}>
            <   AppBar position="fixed" >

                <Typography  position="fixed" className={classes.text} variant="h5" gutterBottom  >
                    Animar
                </Typography>
                </   AppBar>
                <_renderItems />
            
                {/* <Waypoint onEnter={onChange} /> */}

                {loading ? (<h1>Loading</h1>) : <div></div>}

                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <IconButton  color="inherit" aria-label="open drawer"  >
                            <HomeIcon />
                        </IconButton>
                        <Fab color="secondary" aria-label="add" className={classes.fabButton} >
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />

                        <IconButton  color="inherit">
                            <PetsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Paper>
            </MuiThemeProvider>
        </div>
    )
}

export default Home 