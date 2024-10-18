import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';

const API_URL = 'https://api-hub.ilcs.co.id/test/v2/dataUtama?nomor_pengajuan=20120B388FAE20240402000001';

const DataUtama = () => {
  const [dataUtama, setDataUtama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setDataUtama(response.data.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

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
    nomor_pengajuan = '',
    tanggal_pengajuan = '',
    nomor_pendaftaran = '',
    tanggal_pendaftaran = '',
    kantor_pabean = '',
    skep_fasilitas = '',
    jenis_pib = '',
    jenis_impor = '',
    cara_pembayaran = '',
    transaksi = ''
  } = dataUtama || {};

  return (
    <Container className="border border-top-0 pt-4">
    <Form>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="nomorPengajuan">
            <Form.Label>Nomor Pengajuan</Form.Label>
            <Form.Control type="text" value={nomor_pengajuan} disabled />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="tanggalPengajuan">
            <Form.Label>Tanggal Pengajuan</Form.Label>
            <Form.Control type="text" value={tanggal_pengajuan} disabled />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="nomorPendaftaran">
            <Form.Label>Nomor Pendaftaran</Form.Label>
            <Form.Control type="text" value={nomor_pendaftaran || 'Nomor Pendaftaran'} disabled />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="nomorPendaftaran">
            <Form.Label>Tanggal Pendaftaran</Form.Label>
            <Form.Control type="text" value={tanggal_pendaftaran || 'Tanggal Pendaftaran'} disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="kantorPabean">
            <Form.Label>Kantor Pabean</Form.Label>
            <Form.Control as="select" value={kantor_pabean} className='form-select'>
              <option>KPU TANJUNG PRIOK</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="skepFasilitas">
            <Form.Label>SKEP Fasilitas</Form.Label>
            <Form.Control as="select" value={skep_fasilitas} disabled className='form-select'>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="jenisPib">
            <Form.Label>Jenis PIB</Form.Label>
            <Form.Control as="select" value={jenis_pib} disabled className='form-select'>
              <option>Biasa</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="jenisImpor">
            <Form.Label>Jenis Impor</Form.Label>
            <Form.Control as="select" value={jenis_impor} disabled className='form-select'>
              <option>Untuk Dipakai</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="caraPembayaran">
            <Form.Label>Cara Pembayaran</Form.Label>
            <Form.Control as="select" value={cara_pembayaran} disabled className='form-select'>
              <option>Biasa/Tunai</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="transaksi">
            <Form.Label>Transaksi</Form.Label>
            <Form.Control as="select" value={transaksi} disabled className='form-select'>
              <option>Transaksi Perdagangan Dengan Imbal Dagang</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-5 gap-2 mb-3">
        <Button variant="secondary">Sebelumnya</Button>
        <Button variant="primary">Selanjutnya</Button>
      </div>
    </Form>
  </Container>
  );
};

export default DataUtama;