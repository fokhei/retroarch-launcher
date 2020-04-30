import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: Red;
`;

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: any) {
    return { error };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: false };
  }

  //componentDidCatch(error, info) {
  //logErrorToMyService(error, info);
  //}

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <Layout>
          <h1>An unexpected error has occurred: </h1>
          <h3> {error.toString()} </h3>
        </Layout>
      );
    }
    return children;
  }
}

interface ErrorBoundaryState {
  error: any;
}

interface ErrorBoundaryProps {
  children: any;
}

export default ErrorBoundary;
