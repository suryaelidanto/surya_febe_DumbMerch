import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import { API } from '../config/api'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {

    document.title = 'Edit Category';
    const [name, setName] = useState()

    const { id } = useParams()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setName(e.target.value)
    };

    const handleName = async () => {
        const data = await API.get(`/category/${id}`)
        setName(data.data.data.name)
    }

    const handleSubmit = useMutation(async (event) => {
        try {
            event.preventDefault();
            const data = await API.patch(`/category/${id}`, { name }, {
                validateStatus: () => true,
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

            toast.success('Add category success!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            navigate('/category')

        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        handleName()
    }, [])

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-white fw-bold"> Edit Category </h3>
                <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Product category" style={{ backgroundColor: '#474647' }} className="text-white" onChange={handleChange} value={name} />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100 mt-4">
                        Save
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditCategory