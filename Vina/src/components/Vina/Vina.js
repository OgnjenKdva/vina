import React, { useCallback, useEffect, useState } from 'react';
import AutobuskaAxios from '../../apis/AutobuskaAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Button, Table, Form, NavItem } from 'react-bootstrap'


const Vina = (props) => {

    const routeParams = useParams();

    const prazna_pretraga = {
        vinarija: '',
        vino: ''
    }

    const [search, setSearch] = useState(prazna_pretraga)
    const [showSearch, setShowSearch] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [pageNo, setPageNo] = useState(0)
    const [vina, setVina] = useState([])
    const [vinarije, setVinarije] = useState([])
    const [tipovi, setTipovi] = useState([])
    const [dodatneFlase, setDodatneFlase] = useState([])

    var navigate = useNavigate();

    const getVina = (newPageNo) => {
        const conf = {
            params: {
                vinarija: search.vinarija.ime,
                vino: search.vino,
                pageNo: newPageNo
            }
        }
        AutobuskaAxios.get('/vina', conf)
            .then(res => {
                setPageNo(newPageNo)
                setTotalPages(res.headers['total-pages'])
                setVina(res.data)
                console.log("VINA!")
                console.log(res.data)
            })
            .catch(err => {
                alert('Doslo je do greke po preuzimanju vina')
            });
    }

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
        getVina(0)
        getTipovi()
        getVinarije()

    }, [])

    const onVinarijaChange = e => {
        let vinarijaId = e.target.value;
        let vinarija = vinarije.find((vinarija) => vinarija.id == vinarijaId)
        setSearch({
            ...search,
            vinarija: vinarija
        })
    }

    const valueInputChanged = (e) => {
        let input = e.target;

        let name = input.name;
        let value = input.value;

        setDodatneFlase(dodatneFlase => {
            dodatneFlase[name] = value;
            return dodatneFlase
        })
    }

    const onVinoChange = e => {
        setSearch({
            ...search,
            vino: e.target.value
        })
    }

    const goToAdd = () => {
        navigate('/vina/dodaj');
    }

    const goToNaruciFlase=(vinoId)=>{
        navigate('/vina/naruci/'+vinoId)
    }

    const goToEdit = (vinoId) => {
        navigate('/vina/izmeni/' + vinoId)
    }

    const deleteVino = (vinoId) => {
        AutobuskaAxios.delete('/vina/' + vinoId)
            .then(res => {
                // handle success
                console.log(res)
                alert('A vine was deleted successfully!')
                setVina((vina) => vina.filter(vino => vino.id != vinoId))
            })
            .catch(error => {
                // handle error
                console.log(error)
                alert('Error occured please try again!')
            });
    }
    var renderVina = () => {
        return vina.map((vino) => {
            return (
                <tr key={vino.id}>
                    <td>{vino.ime}</td>
                    <td>{vino.opis}</td>
                    <td>{vino.godinaProizvodnje}</td>
                    <td>{vino.cenaFlase}</td>
                    <td>{vino.brojDostupnihFlasa}</td>
                    <td>{vino.tip.ime}</td>
                    <td>{vino.vinarija.ime}</td>
                    <td>
                        <Button onClick={() => goToEdit(vino.id)}>Izmeni vino</Button>
                    </td>
                    <td>
                        <Button onClick={() => goToNaruciFlase(vino.id)}>Naruci vino</Button>
                    </td>
                    <td>
                        <Button onClick={() => deleteVino(vino.id)}>Izbrisi vino</Button>
                    </td>
                </tr>
            )
        })
    }

    const renderVinarije = () => {
        return vinarije.map((vinarija) => <option key={vinarija.id} value={vinarija.id}>{vinarija.ime}</option>)
    }

    const renderSearchForm = () => {
        return (
            <>
                <Form style={{ width: '99%' }}>
                    <Row><Col>
                        <Form.Group>
                            <Form.Label>Vinarija</Form.Label>
                            <Form.Select name='vinarija' value={search.vinarija.id} onChange={(e) => onVinarijaChange(e)}>
                                <option></option>
                                {renderVinarije()}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Vino</Form.Label>
                            <Form.Control
                                name='vino'
                                as='input'
                                type='text'
                                onChange={(e) => onVinoChange(e)}>
                            </Form.Control>
                        </Form.Group>
                    </Col></Row>
                </Form>
                <Row><Col>
                    <Button className='mt-3' onClick={() => getVina(0)}>Pretraga</Button>
                </Col></Row>
            </>
        )
    }

    return (
        <Col>
            <Row><h1>Vina</h1></Row>
            <div>

                <Row><Col>
                    <Button onClick={() => goToAdd()}>Add</Button>
                </Col></Row>
                <label>
                    <input type="checkbox" onChange={() => setShowSearch(!showSearch)} />
                    Prikazi pretragu
                </label>
            </div>
            <Row hidden={!showSearch}>{renderSearchForm()}</Row><br />
            <Row><Col>
                <Table style={{ marginTop: 5 }}>
                    <thead>
                        <tr>
                            <th>Ime vina</th>
                            <th>Opis vina</th>
                            <th>Godina proizvodnje</th>
                            <th>Cena flase</th>
                            <th>Broj dostupnih flasa</th>
                            <th>Tip vina</th>
                            <th>Vinarija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderVina()}
                    </tbody>
                </Table>
                <Button disabled={pageNo === 0}
                    onClick={() => getVina(pageNo - 1)}
                    className="mr-3">Prev</Button>
                <Button disabled={pageNo == totalPages - 1} onClick={() => getVina(pageNo + 1)}>Next</Button>
            </Col></Row>
        </Col>
    )





}
export default Vina