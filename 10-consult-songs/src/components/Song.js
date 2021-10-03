

const Song = ({lyric}) => {
    if (lyric.length === 0) return null;
    return (
        
        <div>
            <h2>Song Lyric</h2>
            <p className="letra">{lyric}</p>
        </div>
    )
}

export default Song;