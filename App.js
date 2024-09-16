import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, UserContext} from "./src/screens/context/AuthContext";
import Navigation from "./src/components/navigation/Navigation";
import VideoCall from "./src/screens/videoCall/VideoCall";


const App = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [callInfo, setCallInfo] = useState(null);

    return (
        <AuthContext>
            <Navigation/>
        </AuthContext>
    );
};

export default App;
