import React from 'react';

class Logout extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            localStorage.clear(),
            this.props.history.push('/')
        );
    }
}

export default Logout;
