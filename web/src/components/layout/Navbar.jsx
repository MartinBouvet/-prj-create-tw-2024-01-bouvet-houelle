import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaCog, FaThermometerHalf } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <NavBrand>
        <FaThermometerHalf />
        <BrandName>P.E.IoT</BrandName>
      </NavBrand>
      
      <NavLinks>
        <NavItem isActive={location.pathname === '/'}>
          <NavLink to="/">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </NavItem>
        <NavItem isActive={location.pathname === '/admin'}>
          <NavLink to="/admin">
            <FaCog />
            <span>Admin</span>
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: ${props => props.theme.cardBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  color: ${props => props.theme.primary};
`;

const BrandName = styled.span`
  font-weight: 700;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const NavItem = styled.li`
  position: relative;
  font-weight: ${props => props.isActive ? '600' : '400'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.primary};
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.text};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

export default Navbar;
