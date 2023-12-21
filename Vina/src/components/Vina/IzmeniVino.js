import React, { useCallback, useEffect, useState } from 'react';
import AutobuskaAxios from '../../apis/AutobuskaAxios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Button, Table, Form, NavItem } from 'react-bootstrap'

const IzmeniVino = () => {

    var navigate = useNavigate();
    const routeParams = useParams();
    var vinoId = routeParams.id;

    const vino = {
        id: -1,
        opis: '',
        ime: '',
        cenaFlase: '',
        brojDostupnihFlasa: '',
        godinaProizvodnje: '',
        tip: '',
        vinarija: ''
    }
    const [izmenjenoVino, setIzmenjenoVino] = useState(vino)

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

    const getVinoById = useCallback((vinoId) => {
        AutobuskaAxios.get('/vina/' + vinoId)
            .then((res) => {
                setIzmenjenoVino({
                    id: res.data.id, ime: res.data.ime, opis: res.data.opis, godinaProizvodnje: res.data.godinaProizvodnje,
                    cenaFlase: res.data.cenaFlase, brojDostupnihFlasa: res.data.brojDostupnihFlasa,
                    tip: res.data.tip, vinarija: res.data.vinarija
                })
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error occured  while fetching info about wines please try again!');

            })
    }, [])

    useEffect(() => {
        getTipovi()
        getVinarije()
        getVinoById(vinoId)
        console.log(izmenjenoVino)
    }, [])

    const onImeChange = e => {
        setIzmenjenoVino({
            ...izmenjenoVino,
            ime: e.target.value
        })
    }

    const onOpisChange = e => {
        setIzmenjenoVino({
            ...izmenjenoVino,
            opis: e.target.value     
        })
    }

    const onCenaFlaseChange = e => {
        setIzmenjenoVino({
            ...izmenjenoVino,
            cenaFlase: e.target.value
        })
    }

    const onBrojDostupnihFlasaChange = e => {
        setIzmenjenoVino({
            ...izmenjenoVino,
            brojDostupnihFlasa: e.target.value
        })
    }

    const onGodinaProizvodnjeChange = e => {
        setIzmenjenoVino({
            ...izmenjenoVino,
            godinaProizvodnje: e.target.value
        })
    }

    const tipSelectionChanged = (e) => {
        let tipId = e.target.value;
        let tip = tipovi.find((tip) => tip.id == tipId)

        setIzmenjenoVino({ ...izmenjenoVino, tip: tip })
    }

    const vinarijaSelectionChanged = (e) => {
        let vinarijaId = e.target.value;
        let vinarija = vinarije.find((vinarija) => vinarija.id == vinarijaId)

        setIzmenjenoVino({ ...izmenjenoVino, vinarija: vinarija })
    }

    const edit = () => {
        const params = {
            'id': izmenjenoVino.id,
            'ime': izmenjenoVino.ime,
            'opis':izmenjenoVino.opis,
            'cenaFlase': izmenjenoVino.cenaFlase,
            'brojDostupnihFlasa': izmenjenoVino.brojDostupnihFlasa,
            'godinaProizvodnje': izmenjenoVino.godinaProizvodnje,
            'tip': izmenjenoVino.tip,
            'vinarija': izmenjenoVino.vinarija
        }
        AutobuskaAxios.put('/vina/' + routeParams.id, params)
            .then((res) => {
                alert('vino was edited!')
                navigate('/vina')
            })
            .catch(error => {
                // handle error ovde je negde greska, id je undefined
                console.log(error);
                alert('Error occured while editing please try again!');
            })
    }

    const renderVinarije = () => {
        return vinarije.map((vinarija) => <option key={vinarija.id} value={vinarija.id}>{vinarija.ime}</option>)
    }

    const renderTipove = () => {
        return tipovi.map((tip) => <option key={tip.id} value={tip.id}>{tip.ime}</option>)
    }



    return (
        <Col>
            <Row><h1>Izmeni vino</h1></Row>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Ime</Form.Label>
                        <Form.Control name='ime' type='text' value={izmenjenoVino.ime} onChange={(e) => onImeChange(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opis</Form.Label>
                        <Form.Control name='opis' type='text' value={izmenjenoVino.opis} onChange={(e) => onOpisChange(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Godina proizvodnje</Form.Label>
                        <Form.Control name='godinaProizvodnje' type='number' value={izmenjenoVino.godinaProizvodnje} onChange={(e) => onGodinaProizvodnjeChange(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Broj dostupnih flasa</Form.Label>
                        <Form.Control name='brojDostupnihFlasa' type='number' value={izmenjenoVino.brojDostupnihFlasa} onChange={(e) => onBrojDostupnihFlasaChange(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cena</Form.Label>
                        <Form.Control name='cenaFlase' type='number'  value={izmenjenoVino.cenaFlase} onChange={(e) => onCenaFlaseChange(e)} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vinarije</Form.Label>
                        <Form.Select name="vinarije"type='number' value={izmenjenoVino.vinarija.id} onChange={(e) => vinarijaSelectionChanged(e)}>
                            <option> </option>
                            {renderVinarije()}
                        </Form.Select><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipovi</Form.Label>
                        <Form.Select name="tipovi" type='number' value={izmenjenoVino.tip.id}  onChange={(e) => tipSelectionChanged(e)}>
                            <option> </option>
                            {renderTipove()}
                        </Form.Select><br />
                    </Form.Group>
                </Form>
            </Row>
            <Button className="warning" onClick={() => edit()}>Edit</Button>
        </Col>
    )


}
export default IzmeniVino