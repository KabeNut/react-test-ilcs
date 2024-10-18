-- Table: Data_Utama (Primary Table)
CREATE TABLE Data_Utama (
    id VARCHAR(255) PRIMARY KEY,  -- This will act as id_aju
    nomor_pengajuan VARCHAR(50) NOT NULL,
    tanggal_pengajuan DATE NOT NULL,
    nomor_pendaftaran VARCHAR(50),
    kantor_pabean VARCHAR(100) NOT NULL,
    skep_fasilitas VARCHAR(100),
    jenis_pib VARCHAR(50),
    jenis_impor VARCHAR(50),
    cara_pembayaran VARCHAR(50),
    transaksi VARCHAR(100)
);

-- Table: Data_Entitas linked to Data_Utama via id_aju
CREATE TABLE Data_Entitas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aju VARCHAR(255),  -- Foreign key linking to Data_Utama(id)
    jenis_pemberitahuan VARCHAR(50) NOT NULL,
    jenis_identitas VARCHAR(50),
    no_identitas VARCHAR(20) NOT NULL,
    nib VARCHAR(20) NOT NULL,
    nama_perusahaan VARCHAR(100) NOT NULL,
    provinsi VARCHAR(100),
    kota_kabupaten VARCHAR(100),
    telephone VARCHAR(20),
    kecamatan VARCHAR(100),
    kode_pos VARCHAR(10),
    email VARCHAR(100),
    status VARCHAR(50),
    CONSTRAINT fk_id_aju_data_entitas FOREIGN KEY (id_aju) REFERENCES Data_Utama(id) ON DELETE CASCADE
);

-- Table: Data_Pungutan linked to Data_Utama via id_aju
CREATE TABLE Data_Pungutan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aju VARCHAR(255),  -- Foreign key linking to Data_Utama(id)
    incoterms VARCHAR(50) NOT NULL,
    valuta VARCHAR(10) NOT NULL,
    kurs DECIMAL(12, 4) NOT NULL,
    nilai DECIMAL(12, 2) NOT NULL,
    biaya_tambahan DECIMAL(12, 2),
    biaya_pengurang DECIMAL(12, 2),
    voluntary_declaration DECIMAL(12, 2),
    nilai_fob DECIMAL(12, 2),
    asuransi DECIMAL(12, 2),
    freight DECIMAL(12, 2),
    cif DECIMAL(12, 2),
    cif_rp DECIMAL(15, 2),
    bruto DECIMAL(12, 2),
    netto DECIMAL(12, 2),
    flag_kontainer VARCHAR(50),
    CONSTRAINT fk_id_aju_data_pungutan FOREIGN KEY (id_aju) REFERENCES Data_Utama(id) ON DELETE CASCADE
);
