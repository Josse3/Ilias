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
            <h1>Grieks online</h1>
            <p>Door Josse Cottenier</p>
            <h2>5de jaar</h2>
            <div className="tiles-container">
                {content.fifthYear.map(obj => {
                    return (
                        <Link to={obj.path}>
                            <div className="tile" key={obj.path}>
                                <h3>{`${obj.author}, ${obj.path}`}</h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default Index;