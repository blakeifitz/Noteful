import React from 'react';

export default class ErrorBoundary extends React.Component{
    constructor() {
        super();
        this.state = {
          hasError: false
        };
      }
      static getErrorState(error) {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {      
          return (
            <h2>Could not display This Note.</h2>
          );
        }
        return this.props.children;
      }  
}