import React from 'react'
import { Card } from 'react-bootstrap'
import TVS from '../../assets/Experience/TVSe.png'
import '../MajorComponents/Experience/Experience.css'

function ExpCArd({ title, company, year, description }) {
    return (
        <Card className='py-3 px-3 exp-card'>
            <Card.Body>
                <Card.Title className='fs-5 fw-bold pb-1'>{title}</Card.Title>
                <Card.Subtitle className="mb-2  pb-3">{company}<br />{year}</Card.Subtitle>
                <Card.Text className='exp-font'>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ExpCArd