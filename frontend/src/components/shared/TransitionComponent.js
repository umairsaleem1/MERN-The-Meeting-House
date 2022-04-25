import React from 'react'
import { Slide } from '@mui/material';

const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default TransitionComponent;




// This component is being used in dialog boxes for Transition