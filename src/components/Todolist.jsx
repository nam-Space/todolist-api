import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

const Todolist = () => {
    const [dataArray, setDataArray] = useState([])
    const [form, setForm] = useState({title: ''})

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setDataArray(res.data)
            })
    }, [])

    const handleChange = e => {
        setForm({
            ...form, [e.target.name] : e.target.value
        })
    }

    const handleValidate = Yup.object().shape({
        title: Yup.string().required().min(8)
    })

    const handleSubmit = values => {
        const res = {
            ...values,
            userId: Math.floor(Math.random() * 11),
            completed: Math.floor(Math.random() * 2) ? 'true' : 'false'
        }

        axios.post(`https://jsonplaceholder.typicode.com/todos`, res)
            .then(status => {
                console.log(status)
                alert(status.status)
                setDataArray([...dataArray, res])
                setForm({title: ''})
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='wrapper'>
            <h1>Todolist</h1>
            <Formik
                initialValues={form}
                enableReinitialize={true}
                validationSchema={handleValidate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field 
                        placeholder='Write here' 
                        name='title' 
                        onChange={handleChange} 
                        value={form.title}
                    />
                    <ErrorMessage component='div' name='title' className='error'/>
                    <br />
                    <br />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <ul>
                {dataArray.map((data, index) => (
                    <li key={index}>{data.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Todolist