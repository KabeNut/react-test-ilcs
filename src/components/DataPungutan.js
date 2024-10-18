// src/components/DataPungutan.js
import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaSyncAlt } from 'react-icons/fa';

const DataPungutan = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const {
        incoterms = '',
        valuta = '',
        nilai_kurs = '',
        nilai_incoterm = '',
        biaya_tambahan = '',
        biaya_pengurang = '',
        voluntary_declaration = '',
        nilai_fob = '',
        nilai_asuransi = '',
        freight = '',
        cif = '',
        cif_rp = '',
        berat_kotor = '',
        berat_bersih = '',
        flag_kontainer = '',
    } = data || {};

    const fetchData = async () => {
        try {
            await axios
                .get('https://api-hub.ilcs.co.id/test/v2/dataPungutan?id_aju=04eb6a72-bb63-5aed-5e92-f58a3bfd5da2')
                .then(response => {
                    const fetchedData = response.data.data;
                    const nilaiFOB = parseInt(fetchedData.nilai_incoterm || 0) + parseInt(fetchedData.biaya_tambahan || 0) - parseInt(fetchedData.biaya_pengurang || 0) + parseInt(fetchedData.voluntary_declaration || 0);
                    const cif = nilaiFOB + parseInt(fetchedData.nilai_asuransi || 0) + parseInt(fetchedData.freight || 0);
                    const cifRp = cif * parseInt(fetchedData.nilai_kurs || 0);
                    setData({...fetchedData, nilai_fob: nilaiFOB, cif: cif, cif_rp: cifRp });

                })
                .catch(error => console.error('Error fetching Data Pungutan:', error));
        } catch (error) {
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

    return (
        <Container className="border border-top-0 pt-4">
            <h3>Data Pungutan</h3>

            <Form>
                <Row className="mb-3">
                    <Col md>
                        <Form.Group controlId="incoterms">
                            <Form.Label>Incoterms</Form.Label>
                            <Form.Control as="select" value={incoterms} readOnly className='form-select'>
                                <option>Free on Board</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="valuta">
                            <Form.Label>Valuta</Form.Label>
                            <Form.Control as="select" value={valuta} disabled>
                                <option>Euro</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="kurs">
                            <Form.Label>Kurs</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" value={nilai_kurs} readOnly />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={1} className='align-content-end'>
                        <Form.Group controlId="sync" >
                            <Form.Label></Form.Label>
                            <InputGroup>
                                <Button>
                                    <FaSyncAlt />
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="align-items-center mb-3">
                    <Col md={2}>
                        <Form.Group controlId="nilai">
                            <Form.Label>Nilai</Form.Label>
                            <Form.Control type="text" value={nilai_incoterm} readOnly />
                        </Form.Group>
                    </Col>

                    {/* Plus Sign */}
                    <Col md="auto" className="text-center">
                        <span>+</span>
                    </Col>

                    <Col md={2}>
                        <Form.Group controlId="biayaTambahan">
                            <Form.Label>Biaya Tambahan</Form.Label>
                            <Form.Control type="text" value={biaya_tambahan} readOnly />
                        </Form.Group>
                    </Col>

                    {/* Minus Sign */}
                    <Col md="auto" className="text-center">
                        <span>-</span>
                    </Col>

                    <Col md={2}>
                        <Form.Group controlId="biayaPengurang">
                            <Form.Label>Biaya Pengurang</Form.Label>
                            <Form.Control type="text" value={biaya_pengurang} readOnly />
                        </Form.Group>
                    </Col>

                    {/* Plus Sign */}
                    <Col md="auto" className="text-center">
                        <span>+</span>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="voluntaryDeclaration">
                            <Form.Label>Voluntary Declaration</Form.Label>
                            <Form.Control type="text" value={voluntary_declaration} disabled />
                        </Form.Group>
                    </Col>
                    {/* Equals Sign */}
                    <Col md="auto" className="text-center">
                        <span>=</span>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="nilaiFob">
                            <Form.Label>Nilai FOB</Form.Label>
                            <Form.Control type="text" value={nilai_fob} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="valuta">
                            <Form.Label>Asuransi Bayar di</Form.Label>
                            <Form.Control as="select" value={valuta} readOnly className='form-select'>
                                <option>Luar Negeri</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="asuransi">
                            <Form.Label>Asuransi</Form.Label>
                            <Form.Control type="text" value={nilai_asuransi} readOnly />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="freight">
                            <Form.Label>Freight</Form.Label>
                            <Form.Control type="text" value={freight} readOnly />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md>
                        <Form.Group controlId="cif">
                            <Form.Label>CIF</Form.Label>
                            <Form.Control type="text" value={cif} readOnly />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="cifRp">
                            <Form.Label>CIF Rp</Form.Label>
                            <Form.Control type="text" value={cif_rp} readOnly />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="bruto">
                            <Form.Label>Bruto</Form.Label>
                            <Form.Control type="text" value={berat_kotor} readOnly />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="netto">
                            <Form.Label>Netto</Form.Label>
                            <Form.Control type="text" value={berat_bersih} readOnly />
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group controlId="flagKontainer">
                            <Form.Label>Flag Kontainer</Form.Label>
                            <Form.Control as="select" value={flag_kontainer} disabled>
                                <option>Kontainer</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center mt-3 gap-2 mb-3">
                    <Button variant="warning" className="me-2">Kelengkapan Data</Button>
                    <Button variant="primary">Simpan</Button>
                </div>

                <div className="d-flex justify-content-center mt-3 gap-2 mb-3">
                    <Button variant="secondary">Sebelumnya</Button>
                    <Button variant="primary">Selanjutnya</Button>
                </div>
            </Form>
        </Container>
    );
};

export default DataPungutan;
