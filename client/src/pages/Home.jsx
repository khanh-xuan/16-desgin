import React from 'react'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu';
import PhotoCard from '../components/PhotoCard';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
    const params = useParams()

    const filter = params.project;

    const projects = useSelector(state => state.project.projects);

    const albums = (projects && filter) ? projects.filter(x => x.type === filter) : projects

    return (
        <Helmet title='Home'>
            <NavMenu />
            <div className="main">
                <Grid
                    col={3}
                    mdCol={2}
                    smCol={2}
                    gap={1}
                >
                    {albums && albums.map((item, index) => (
                        <PhotoCard key={index} item={item} />
                    ))}
                </Grid>
                {/* <motion.div layout className="projects">
                {projects.map((item, index) => (
                    <PhotoCard key={index} item={item} />
                ))}
            </motion.div> */}
            </div>

        </Helmet>
    )
}

export default Home
