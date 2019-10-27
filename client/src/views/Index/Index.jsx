import React from 'react';
import './Index.css';

import { Link } from 'react-router-dom';

const Index = () => {
    const content = {
        fifthYear: [
            {
                path: 'Ilias',
                author: 'Homeros'
            },
            {
                path: 'Odyssee',
                author: 'Homeros'
            }
        ]
    };

    return (
        <div className="index">
            <h1>5de jaar</h1>
            <div className="tiles-container">
                {content.fifthYear.map(obj => {
                    return (
                        <Link to={obj.path} key={obj.path}>
                            <div className="tile" key={obj.path}>
                                <h3>{`${obj.author}, ${obj.path}`}</h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <footer>
                Website gemaakt door <a href="https://jossecottenier.tech" target="_blank" rel="noopener noreferrer">Josse Cottenier</a> | Tekstinhoud door <a href="https://scaife.perseus.org" target="_blank" rel="noopener noreferrer">Perseus</a>
            </footer>
        </div>
    )
}

export default Index;