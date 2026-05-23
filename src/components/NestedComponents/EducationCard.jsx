import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'
import '../MajorComponents/Education/Education.css'

function EducationCard({ logo, title, company, year }) {
    return (
        <Card className='py-3 px-3 edu-card h-100'>
            <Card.Body className='edu-cardfull'>
                <div className='eduImg-Cont d-flex justify-content-center align-items-center'>
                    <Card.Img src={logo} className='educationImg' />
                </div>
                <Card.Title className='fs-5 fw-bold my-3'>{title}</Card.Title>
                <Card.Subtitle className="my-3">{company}</Card.Subtitle>
                <Card.Text className='mt-4 mb-2'>{year}</Card.Text>
            </Card.Body>
        </Card>
    )
}

EducationCard.propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.string,
    year: PropTypes.string,
};

export default EducationCard
