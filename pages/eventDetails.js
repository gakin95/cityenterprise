import { Container } from '../components/section'

export default function Home(props) {
  console.log('this is a prop', props)
  return (
    <>
    <Container title='Event Details'>
        event details
    </Container>
    </>
  )
}