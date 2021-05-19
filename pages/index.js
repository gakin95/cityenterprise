import { makeStyles } from '@material-ui/core/styles';

import { Container,EventSection } from '../components/section'


const useStyles = makeStyles((theme) => ({
  container:{
    [theme.breakpoints.down('xs')]:{
      margin:0,
      marginTop:'8rem'
    }
  }
}));

export default function Home() {
  const classes = useStyles()
  return (
    <>
    <Container title='Home page' className={classes.container}>
      <EventSection />
    </Container>
    </>
  )
}