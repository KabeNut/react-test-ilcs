import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const API_URL = 'https://api-hub.ilcs.co.id/test/v2/dataEntitas?id_aju=04eb6a72-bb63-5aed-5e92-f58a3bfd5da2'

const DataEntitas = () => {
    const [dataEntitas, setDataEntitas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setDataEntitas(response.data.data.pengusaha);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    const {
        jenis_pemberitahuan = '',
        jenis_identitas = '',
        nib = '',
        nomor_identitas = '',
        nama_identitas = '',
        provinsi = '',
        kota_kabupaten = '',
        tlp_identitas = '',
        kecamatan = '',
        kode_pos = '',
        email_identitas = '',
        status = '',
        no_identitas_16 = '',
        rtRw = ''
    } = dataEntitas || {};

    return (
        <Container className="border border-top-0 pt-4">
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="jenisPemberitahuan">
                            <Form.Label>Jenis Pemberitahuan</Form.Label>
                            <Form.Control as="select" value={jenis_pemberitahuan} disabled className='form-select'>
                                <option>PENGUSAHA</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <hr />

                <h5 className="mt-4">Pengusaha</h5>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="jenisIdentitas">
                            <Form.Label>Jenis Identitas</Form.Label>
                            <Form.Control as="select" value={jenis_identitas} disabled className='form-select'>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="nib">
                            <Form.Label>NIB</Form.Label>
                            <Form.Control type="text" value={nib} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="nomor_identitas">
                            <Form.Label>No Identitas</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" value={nomor_identitas} disabled />
                                <InputGroup.Text><FaSearch /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="no_identitas_16">
                            <Form.Label>No Identitas (16 Digit)</Form.Label>
                            <Form.Control type="text" value={no_identitas_16 || 'No Identitas (16 Digit)'} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group controlId="nama_identitas">
                            <Form.Label>Nama Perusahaan</Form.Label>
                            <Form.Control type="text" value={nama_identitas} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md>
                        <Form.Group controlId="provinsi">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control as="select" value={provinsi} disabled className='form-select'>
                                <option>JAWA TIMUR</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="kotaKabupaten">
                            <Form.Label>Kota / Kabupaten</Form.Label>
                            <Form.Control as="select" value={kota_kabupaten} disabled>
                                <option>KAB. SIDOARJO</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="kodePos">
                            <Form.Label>Kode Pos</Form.Label>
                            <Form.Control type="text" value={kode_pos} disabled />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="kecamatan">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control type="text" value={kecamatan} disabled />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="kecamatan">
                            <Form.Label>RT / RW</Form.Label>
                            <Form.Control type="text" value={rtRw || '/'} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    
                <Col md={4}>
                        <Form.Group controlId="tlp_identitas">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="text" value={tlp_identitas} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="email_identitas">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email_identitas} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" value={status} disabled>
                                <option>AEO</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center mt-3 gap-2 mb-3">
                    <Button variant="secondary">Sebelumnya</Button>
                    <Button variant="primary">Selanjutnya</Button>
                </div>
            </Form>
        </Container>
    );
};

export default DataEntitas;
