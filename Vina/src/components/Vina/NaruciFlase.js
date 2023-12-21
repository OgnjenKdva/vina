import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import AutobuskaAxios from '../../apis/AutobuskaAxios';

const NaruciFlase = () => {

    const vino = {
        id: '',
        opis: '',
        ime: '',
        cenaFlase: '',
        brojDostupnihFlasa: '',
        godinaProizvodnje: '',
        tip: '',
        vinarija: ''
    }
    const [dodatneFlase, setDodatneFlase] = useState(vino)
    const [novoVino, setNovoVino] = useState([])

    // const routeParams = useParams();

    const { id } = useParams();

    let navigate = useNavigate()

    const valueInputChanged = (e) => {
        let input = e.target;
        let value = input.value;
        setDodatneFlase(value);
    }

    useEffect(() => {
        getVinoById()
        console.log(novoVino)
    }, [])

    const getVinoById = useCallback(() => {
        AutobuskaAxios.get('/vina/' + id)
            .then(res => {
                setNovoVino({
                    id: res.data.id, ime: res.data.ime, opis: res.data.opis, godinaProizvodnje: res.data.godinaProizvodnje,
                    cenaFlase: res.data.cenaFlase, brojDostupnihFlasa: res.data.brojDostupnihFlasa,
                    tip: res.data.tip, vinarija: res.data.vinarija
                })

            })
            .catch(err => {
                console.log(err)
            })
    })

    const dodajGol = () => {
        
        const params = {
            ...novoVino,
            brojDostupnihFlasa: novoVino.brojDostupnihFlasa - dodatneFlase
        }
        AutobuskaAxios.put('/vina/' + id, params)
            .then(res => {
                alert('Vino je naruceno');
                navigate('/vina')
            })
            .catch(err => {
                alert('Nisi uspeo:(')
            })
    }
    return (
        <>
            <Form style={{ width: '99%' }}>
            <Col xs="12" sm="10" md="8">
                    <h1>Dodaj vino</h1>
                </Col>
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control required type="number" id="dodatneFlase" name="dodatneFlase" onChange={(e) => valueInputChanged(e)} /><br />
                </Form.Group>
                <td>
                    <Button onClick={e => dodajGol()}>Naruci</Button>
                </td>
            </Form>
        </>
    )




}
export default NaruciFlase