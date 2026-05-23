import { Col, Container, Image, Row } from 'react-bootstrap'
import TVS from '../../../assets/Experience/TVSe.png'
import ExpCard from '../../NestedComponents/ExpCard'
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
                    <ExpCard
                        title="Graduate Engineer Trainee"
                        company="TVS Electronics"
                        year="June 2022 – June 2023"
                        description={
                            <>
                                Worked as a Repair, Testing and QA specialist on hardware appliances including Laptops and TVS products.
                                <br />
                                Maintained an internal software tool for updating records.
                                <br />
                                Transitioned into full-stack development, working as a Full Stack Developer in AIQ.
                            </>
                        }
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Experience
