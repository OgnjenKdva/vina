import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import NotFound from './components/NotFound';
import Home from './components/Home';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { logout } from './services/auth';
import Login from './components/authorization/Login'
import { Route, Link, BrowserRouter as Router, Routes, UseNavigate, useParams, Navigate } from 'react-router-dom';
import Vina from './components/linije/Vina'
import DodajVino from './components/linije/DodajVino'
import IzmeniVino from './components/linije/IzmeniVino'
import NaruciFlase from './components/linije/NaruciFlase'


// const App = () => {
//     const routeParams = useParams();

//     const jwt = window.localStorage.getItem("jwt")

//     if (jwt) {
//         return (
//             <>
//                 <Router>
//                     <Navbar expand bg="dark" variant="dark">
//                         <Navbar.Brand as={Link} to="/"> JWD</Navbar.Brand>
//                         <Nav>
//                             <Nav.Link as={Link} to="/vina">Vina</Nav.Link>
//                             <Button onClick={logout}>Log out</Button>
//                         </Nav>
//                     </Navbar>
//                     <Container style={{ paddingTop: "10px" }} >
//                         <Routes>
//                             <Route path='/' element={<Home />} />
//                             <Route path='/vina' element={<Vina />}></Route>
//                             <Route path='/vina/dodaj' element={<DodajVino />}></Route>
//                             <Route path='/vina/izmeni/:id' element={<IzmeniVino/>}></Route>
//                             <Route path='/vina/naruci/:id'element={<NaruciFlase/>}></Route>
//                             <Route path="/login" element={<Login />} />
//                             <Route path="*" element={<NotFound />} />
//                         </Routes>
//                     </Container>
//                 </Router>
//             </>
//         )
//     }else{
//         <>
//                 <Router>
//                     <Navbar expand bg="dark" variant="dark">
//                         <Navbar.Brand as={Link} to="/"> JWD</Navbar.Brand>
//                         <Nav>
//                             <Nav.Link as={Link} to="/vina">Vina</Nav.Link>
//                             <Button onClick={logout}>Log out</Button>
//                         </Nav>
//                     </Navbar>
//                     <Container style={{ paddingTop: "10px" }} >
//                         <Routes>
//                             <Route path='/' element={<Home />} />
//                             <Route path='/vina' element={<Vina />}></Route>
//                             {/* <Route path='/linije/dodaj' element={<DodajLiniju />}></Route>
//                             <Route path='/linije/izmeni/:id' element={<IzmeniLiniju />}></Route> */}
//                             <Route path="/login" element={<Login />} />
//                             <Route path="*" element={<NotFound />} />
//                         </Routes>
//                     </Container>
//                 </Router>
//             </>
//     }


// }
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//     <App />,
// )

const App = () => {

   

    const routeParams = useParams();

    const jwt = window.localStorage.getItem("jwt")
    if (jwt) {
        return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            JWD
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/vina">Vina</Nav.Link>
                            <Button onClick={logout}>Log out</Button>
                        </Nav>
                    </Navbar>
                    <Container style={{ paddingTop: "10px" }} >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/vina" element={<Vina />}></Route>
                            <Route path="/vino/dodaj" element={<DodajVino />} />
                            <Route path="/vino/izmeni/:id" element={<IzmeniVino />} />
                            <Route path='/vina/naruci/:id'element={<NaruciFlase/>}></Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </Router>
            </>
        )
    } else {
        return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            JWD
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/vina">Vina</Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                    <Container style={{ paddingTop: "10px" }} >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/vina" element={<Vina />}></Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<Navigate replace to="/login" />} />
                        </Routes>
                    </Container>
                </Router>
            </>
        )

    }
}
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />,
)
