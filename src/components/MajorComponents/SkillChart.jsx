import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container } from 'react-bootstrap';
import "../../Stylesheets/Skills.css"

function SkillChart() {

    const data = {
        labels: ['FrontEnd', 'BackEnd', 'Database', 'Programming'],
        datasets: [
            {
                label: 'My Skills Chart',
                backgroundColor: 'rgba(229, 184, 244,0.5)',
                borderColor: 'rgba(129, 12, 168,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(193, 71, 233,0.8)',
                hoverBorderColor: 'rgba(129, 12, 168,1)',
                data: [90, 70, 80, 60],
            },

        ],
    };

    return (
        <>
            <section id="skillsChart" className="skills-chart-section">
                <Container className="col-xxl-8 skill-chart-cont ">
                    <h2 className='display-6 fw-bold pb-1'>SkillChart</h2>
                    <Bar data={data} className='chart'/>
                </Container>
            </section>
        </>
    )
}

export default SkillChart