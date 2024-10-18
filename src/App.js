// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import DataUtama from './components/DataUtama';
import DataEntitas from './components/DataEntitas';
import DataPungutan from './components/DataPungutan';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const App = () => {
  return (
    <div style={{backgroundColor: "#dee2e6", minHeight: '100vh'}} >
      <Router >
        <Navbar style={{backgroundColor: "darkblue"}} variant="dark" className="p-1">
          <Container className="d-flex justify-content-between">
            <Navbar.Brand href="#">
              <img src="https://placehold.co/100x40" alt="Logo" height="40" />
            </Navbar.Brand>
            <Nav className="d-flex align-items-center">
              <span className="text-light me-3">Senin, 22 Juli 2024 - 15:17:27</span>
              <FaUserCircle size={24} className="text-light" />
            </Nav>
          </Container>
        </Navbar>
        <Navbar className='justify-content-start p-2 mb-3' style={{backgroundColor: '#fff'}}>
          <Container className='text-blue-900 justify-content-start gap-1'>
            <p class="text-blue-900 text-decoration-none">/ Beranda</p> <p class="text-blue-900 text-decoration-none"> / SSM QC</p>
          </Container>
        </Navbar>
        <Container className='p-5' style={{backgroundColor: "#fff"}}>
          <div className='d-flex flex-row justify-content-between'>
            <h4>Data Pemberitahuan</h4>
            <p>No Pengajuan: 20120B388FAE20240402000001 | KSWP : VALID | Jenis API: 02</p>
          </div>
          <Nav variant="tabs" defaultActiveKey="/data-utama">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/data-utama" eventKey="data-utama">Data Utama</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/data-entitas" eventKey="data-entitas">Data Entitas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/data-pungutan" eventKey="data-pungutan">Data Pungutan</Nav.Link>
            </Nav.Item>
          </Nav>

          <Routes>
            <Route path="/data-utama" element={<DataUtama />} />
            <Route path="/data-entitas" element={<DataEntitas />} />
            <Route path="/data-pungutan" element={<DataPungutan />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
