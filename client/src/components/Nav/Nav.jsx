import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 
function NavBarColor () {
    return(
        <>
         <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#logout">logout</Nav.Link>
            <Nav.Link href="#all videos">all videos</Nav.Link>
            <Nav.Link href="#upload">upload a video</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    );
}
export default NavBarColor;