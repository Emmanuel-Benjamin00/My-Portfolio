import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'
import '../MajorComponents/Experience/Experience.css'

function ExpCard({ title, company, year, description }) {
    return (
        <Card className='py-3 px-3 exp-card'>
            <Card.Body>
                <Card.Title className='fs-5 fw-bold pb-1'>{title}</Card.Title>
                <Card.Subtitle className="mb-2 pb-3">{company}<br />{year}</Card.Subtitle>
                <Card.Text className='exp-font'>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

ExpCard.propTypes = {
    title: PropTypes.string,
    company: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.node,
};

export default ExpCard
