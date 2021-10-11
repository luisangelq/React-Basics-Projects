import {Fragment} from 'react' 
import styled from 'styled-components';
import Project from './Project';

const ProjectsList = () => {

    const projects = [
        {name: 'Project 1'},
        {name: 'Project 2'},
        {name: 'Project 3'},
        {name: 'Project 4'},
        {name: 'Project 5'},
        {name: 'Project 6'},
    ]

    return(
        <List>
            {projects.map(project => (
                <Fragment key={project.name}>
                    <Project
                        project={project}
                    />
                </Fragment>
            ))}
        </List>
    )
}

const List = styled.ul`
    
`

export default ProjectsList;