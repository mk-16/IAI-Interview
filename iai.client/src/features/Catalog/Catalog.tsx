import { useContext, useState } from 'react';
import './Catalog.css';
import Card from '../../components/Card/Card';
import { TracksContext } from '../../contexts/TracksContext/TracksContext';
import Container from '../../components/Container/Container';

function Catalog () {
    const [ tracks, setTracks ] = useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
    const [ activeTrack, setActiveCard ] = useState(-1);
    const tracksContext = useContext(TracksContext);
    return (
        <>
            <section className={ (tracksContext?.tracks?.length ?? 0) > 0 ? 'catalog' : 'empty-catalog' }>
                { (tracksContext?.tracks?.length ?? 0) > 0 ?
                    tracksContext?.tracks?.map((value, index) => {
                        return <Card key={ index } closeHandler={ () => { } } >{ value.id }</Card>;
                    })
                    : <p className="catalog-placeholder">Click on "New Track" in the catalog control</p>
                }
            </section>

            <section className="track-control-panel">
                {/*<TrackControl />*/ }
            </section>
        </>
    );
}

export default Catalog;