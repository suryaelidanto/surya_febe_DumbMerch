import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import registerStyle from '../styles/Register.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../config/api'


const Register = () => {

    document.title = 'Register | DumbwaysMerch';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = useMutation(async (event) => {
        try {
            event.preventDefault();

            const data = await API.post(`/register`, { name, email, password }, {
                validateStatus: () => true
            })

            if (data.data.status != "success") return toast.error(data.data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            toast.success('New account has been successfully created!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            navigate('/');

        } catch (error) {
            console.log(error)
        }
    })

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row>
                <Col sm={6} style={{ marginBottom: '30px', marginTop: '100px' }}>
                    <Image src='../assets/img/logo.png' style={{ maxWidth: '200px', maxHeight: '200px', heigt: '100%', width: '100%' }} alt='Image cannot be loaded!' fluid={true} />
                    <div className="mt-4">
                        <h1 className={registerStyle.fontWhiteBold}> Easy, Fast and Reliable </h1>
                        <p style={{ color: '#6A6A6A' }}>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in Indonesia</p>
                    </div>
                    <Row className="mt-5">
                        <Col sm={6}>
                            <Link to='/' className='btn btn-danger text-white text-decoration-none px-3 mx-2'>Login</Link>
                            <Link to='/register' className='btn btn-outline-secondary text-white text-decoration-none px-3 mx-2'>Register</Link>
                        </Col>
                        <Col sm={6}>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6} className="d-flex align-items-center">
                    <Container style={{ backgroundColor: '#191819', padding: '30px', borderRadius: '10px' }}>
                        <h1 className={registerStyle.fontWhiteBold}>Register</h1>
                        <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Name" style={{ backgroundColor: '#474647' }} name="name" onChange={handleNameChange} className="text-white" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Email" style={{ backgroundColor: '#474647' }} name="email" onChange={handleEmailChange} className="text-white" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Password" style={{ backgroundColor: '#474647' }} name="password" onChange={handlePasswordChange} className="text-white" />
                            </Form.Group>
                            <Button variant="danger" type="submit" className="w-100 mt-4">
                                Register
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Register