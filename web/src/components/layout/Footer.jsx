import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Copyright>&copy; {currentYear} P.E.IoT - All rights reserved</Copyright>
      <FooterLinks>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  margin-top: 40px;
  background-color: ${props => props.theme.cardBg};
  border-top: 1px solid ${props => props.theme.border};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.textLight};
  font-size: 14px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.textLight};
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

export default Footer;