import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tok.css'


function Tok({tok, weight}) {
    let processedTok = tok.replace(/ /g, '○').replace(/\n/g, '↵');
    const url = window.location.href.split('/').slice(0, -2).join('/') + '/code/' + tok
    return (
        <span 
            style={{backgroundColor: `rgba(135,206,250,${Math.min(0.6*weight, 1)})`, border: '0.3px solid black', padding: '0.3px'}}> <a href={url}>{processedTok}</a></span>
    )
}

function AtomComponent({atom_idx, atom_weight=false}) {
    const [data, setData] = useState([['', 1.008]])
    const [maxWeight, setMaxWeight] = useState(255)

    useEffect(() => {
        const apiURL = "https://tok-embed-nnmf-api-489e56c40ef7.herokuapp.com/atom/"+atom_idx+'?k=400&lowest_ratio=0.18'
        // console.log('Fetching from: ', apiURL)
        fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setData(data)
                setMaxWeight(data[0][1])
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })
    }, [atom_idx])

    const weightString = atom_weight ? `, Weight ${atom_weight}` : ''


    return (
        <>
            <h3 style={{textAlign: 'left'}}>Atom {atom_idx} {weightString}</h3>
            <div style={{width: '100%', textAlign: 'left'}}>
                {data.map((info, idx) => {
                    return (
                        // <span key={idx}>{dict['tok']}</span>
                        <Tok key={idx} tok={info[0]} weight={info[1]/maxWeight} />
                    )
                })}
            </div>
        </>
    )
}


function CodeComponent({codeStringCandidate=' hello'}) {
    const [codeStr, setCodeStr] = useState(codeStringCandidate)
    const [codeIdx, setCodeIdx] = useState('')
    const [codeData, setCodeData] = useState([{atom: '', weight: 255.}])
    const [maxWeight, setMaxWeight] = useState(255)
    const [atomsRendered, setAtomsRendered] = useState(0)
    const [totalAtoms, setTotalAtoms] = useState(100)

    useEffect(() => {
        const apiURL = "https://tok-embed-nnmf-api-489e56c40ef7.herokuapp.com/code_str/"+codeStr
        fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setCodeStr(data['tok_str'])
                setCodeIdx(data['tok_id'])
                setCodeData(data['results'])
                //length of data['results]
                setTotalAtoms(data['results'].length)
                setMaxWeight(data['results'][0][-1])
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })
    }, [codeIdx])


    return (
        <div style={{width: '100%', textAlign: 'left'}}>
            <h2 style={{'textAlign': 'left'}}>"{codeStr}"</h2>
            {codeData.map((tuple, idx) => {
                return (
                    // <span key={idx}>{dict['atom']}</span>
                    <AtomComponent key={idx} atom_idx={tuple[0]} atom_weight={tuple[1]}/>
                )
            })}
        </div>
    )
}

export { AtomComponent, CodeComponent }