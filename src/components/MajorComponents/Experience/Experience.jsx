import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import TVS from '../../../assets/Experience/TVSe.png'
import ExpCArd from '../../NestedComponents/ExpCArd';
import './Experience.css'


function Experience() {
    return (
        <Container className='mt-5 pt-4'>
            <Row>
                <Col className='mb-4'>
                    <h3 className="justify-content-center d-flex headings">Experience</h3>
                </Col>
            </Row>
            <Row className='exp-cardfull m-auto'>
                <Col md={2} className='m-auto d-flex justify-content-center'>
                    <Image src={TVS} className='TVSimage' />
                </Col>
                <Col md={10}>
                    <ExpCArd
                        title={"Graduate Engineer Trainee - Process Engineer"}
                        company={"TVS Electronics"}
                        year={"June 2022 - June 2023"}
                        description={
                            <>
                                Worked as a Repair, Testing and QA specialist on hardware appliances like Laptops and TVS products.
                                <br />
                                Maintained an internal software of TVS electronics for updating records.
                                <br />
                                Javascript development Trainee.
                            </>
                        }
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Experience