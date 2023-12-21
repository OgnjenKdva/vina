import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AutobuskaAxios from '../../apis/AutobuskaAxios';


function DodajVino() {
    const vino = {
        opis: '',
        ime: '',
        cenaFlase: '',
        godinaProizvodnje: '',
        brojDostupnihFlasa: '',
        tip: '',
        vinarija: ''
    }

    var navigate = useNavigate();

    const [novoVino, setNovoVino] = useState(vino);
    const [tipovi, setTipovi] = useState([])
    const [vinarije, setVinarije] = useState([])

    const getTipovi = useCallback(() => {
        AutobuskaAxios.get('/tipovi')
            .then(res => {
                setTipovi(res.data)
            })
            .catch(err => {
                alert('Doslo je do greke po preuzimanju tipova')
            });
    })

    const getVinarije = useCallback(() => {
        AutobuskaAxios.get('/vinarije')
            .then(res => {
                setVinarije(res.data)
            })
            .catch(err => {
                alert('Doslo je do greke po preuzimanju vinarija')
            });
    })

    useEffect(() => {
        getTipovi();
        getVinarije();
    }, [])

    const valueInputChanged = (e) => {
        let input = e.target;

        let name = input.name;
        let value = input.value;

        setNovoVino(novoVino => {
            novoVino[name] = value;
            return novoVino
        })
    }

    const vinarijaSelectionChanged = (e) => {
        let vinarijaId = e.target.value;
        let vinarija = vinarije.find((vinarija) => vinarija.id == vinarijaId);

        setNovoVino(novoVino => {
            return { ...novoVino, vinarija: vinarija }
        })
    }

    const tipSelectionChanged = (e) => {
        let tipId = e.target.value;
        let tip = tipovi.find((tip) => tip.id == tipId);

        setNovoVino(novoVino => {
            return { ...novoVino, tip: tip }
        })
    }

    const create = () => {
        let params = {
            opis: novoVino.opis,
            ime: novoVino.ime,
            cenaFlase: novoVino.cenaFlase,
            brojDostupnihFlasa: novoVino.brojDostupnihFlasa,
            godinaProizvodnje: novoVino.godinaProizvodnje,
            tip: novoVino.tip,
            vinarija: novoVino.vinarija
        }
        AutobuskaAxios.post('/vina', params)
            .then((res) => {
                alert('Vine was added succesfully')
                navigate('/vina')
            })
            .catch((error) => {
                // handle error
                console.log(error);
                alert("Error occured please try again!");
            });
    }

    const renderVinarije = () => {
        return vinarije.map((vinarija) => <option key={vinarija.id} value={vinarija.id}>{vinarija.ime}</option>)
    }

    const renderTipove = () => {
        return tipovi.map((tip) => <option key={tip.id} value={tip.id}>{tip.ime}</option>)
    }

    return (
        <>
            <Row>
                <Col>
                </Col>
                <Col xs="12" sm="10" md="8">
                    <h1>Dodaj vino</h1>
                </Col>
                <Form>
                    <Form.Group>
                        <Form.Label>Opis</Form.Label>
                        <Form.Control id="opis" name="opis" onChange={(e) => valueInputChanged(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ime</Form.Label>
                        <Form.Control id="ime" name="ime" onChange={(e) => valueInputChanged(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Godina proizvodnje</Form.Label>
                        <Form.Control required type="number" id="godinaProizvodnje" name="godinaProizvodnje" onChange={(e) => valueInputChanged(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Broj dostupnih flasa</Form.Label>
                        <Form.Control required type="number" id="brojDostupnihFlasa" name="brojDostupnihFlasa" onChange={(e) => valueInputChanged(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cena flase</Form.Label>
                        <Form.Control required type="number" id="cenaFlase" name="cenaFlase" onChange={(e) => valueInputChanged(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vinarije</Form.Label>
                        <Form.Select name="vinarije" onChange={(e) => vinarijaSelectionChanged(e)}>
                            <option> </option>
                            {renderVinarije()}
                        </Form.Select><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipovi</Form.Label>
                        <Form.Select name="tipovi" onChange={(e) => tipSelectionChanged(e)}>
                            <option> </option>
                            {renderTipove()}
                        </Form.Select><br />
                    </Form.Group>
                    <Button onClick={(e)=>{ e.preventDefault(); create(novoVino); }}>Dodaj auto</Button>
                </Form>
            </Row>

        </>
    )

}
export default DodajVino

