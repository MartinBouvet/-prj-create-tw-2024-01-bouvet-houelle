import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <SpinnerText>Loading...</SpinnerText>
    </SpinnerContainer>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme.border};
  border-top: 4px solid ${props => props.theme.primary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const SpinnerText = styled.p`
  margin-top: 15px;
  color: ${props => props.theme.textLight};
`;

export default LoadingSpinner;