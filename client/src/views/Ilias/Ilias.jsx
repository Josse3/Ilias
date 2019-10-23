import React, { useState } from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import Reader from '../../components/Reader/Reader';

const Ilias = () => {
    const [userInput, setUserInput] = useState({}); // User input, to be received from Toolbar component
    const [visualPreference, setVisualPreference] = useState({}); // User's visual preference, to be received from Toolbar component

    return (
        <div className="ilias">
            <Toolbar
                transportUserInput={setUserInput}
                updateVisualPreference={setVisualPreference}
            />
            <Reader
                userInput={userInput}
                visualPreference={visualPreference}
            />
        </div>
    );
}

export default Ilias;