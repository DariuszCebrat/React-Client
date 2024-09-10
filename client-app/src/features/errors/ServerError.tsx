import { useStore } from '../../app/store/store'
import { Container, Header } from 'semantic-ui-react';

function ServerError() {
    const {commonStore} = useStore();
  return (
    <Container>
        <Header as="h1" content="Server Error"/>
        <Header as="h5" color="red" content={commonStore.error?.message}></Header>
    </Container>
  )
}

export default ServerError;