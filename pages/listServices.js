import { makeStyles } from "@material-ui/core/styles";
import { Container } from '../components/section';
import ListServices from '../components/listServices/listServices'


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10%",
    marginBottom:"5%",
    marginRight:0,
    [theme.breakpoints.down("xs")]: {
      //margin: "5%",
      marginTop:'6rem'
    },
  },
}));


export default function Home() {
  const classes = useStyles();
  return (
    <>
    <Container title='List services' className={classes.container}>
    <ListServices />
    </Container>
    </>
  )
}