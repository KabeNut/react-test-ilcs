const express = require('express');

const app = express();

app.put('/api/save', (req, res) => {
    const {nilai_kurs, nilai_incoterm, biaya_tambahan, biaya_pengurang, voluntary_declaration, nilai_asuransi, freight} = req.body
    if(!nilai_kurs || !nilai_incoterm || !biaya_tambahan || !biaya_pengurang || !voluntary_declaration || !nilai_asuransi || !freight) {
        return res.status(400).send('All fields are required');
    }

    const nilaiFOB = parseInt(nilai_incoterm || 0) + parseInt(biaya_tambahan || 0) - parseInt(biaya_pengurang || 0) + parseInt(voluntary_declaration || 0);
    const cif = nilaiFOB + parseInt(nilai_asuransi || 0) + parseInt(freight || 0);
    const cifRp = cif * parseInt(nilai_kurs || 0);

    if(req.params.id) {
        // Logic to update data in database
        return res.send('Data updated');
    } else {
        // Logic to create data in database
        res.send('Data saved');
    }

});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});