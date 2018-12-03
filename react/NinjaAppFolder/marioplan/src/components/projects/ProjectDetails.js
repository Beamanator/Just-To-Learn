import React from 'react'

function ProjectDetails(props) {
    // get id from url
    const id = props.match.params.id;

    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <div className="card-title">Project Title - {id}</div>
                    <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
                </div>

                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by The Beamanator</div>
                    <div>3rd November, 2am</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
