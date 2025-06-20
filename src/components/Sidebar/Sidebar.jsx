import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

const routes = [
    { title: 'Home', icon: 'house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const SidebarContainer = styled.div`
    width: ${props => props.$isOpened ? '200px' : '80px'};
    height: 100vh;
    padding: 16px;
    background-color: ${props => props.$isDark ? 'var(--color-sidebar-background-dark-default)' : 'var(--color-sidebar-background-light-default)'};
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 1000;
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
    position: relative;
    
    img {
        width: 32px;
        height: 32px;
    }
    
    span {
        color: ${props => props.$isDark ? 'var(--color-text-logo-dark-default)' : 'var(--color-text-logo-light-default)'};
        font-weight: 600;
        opacity: ${props => props.$isOpened ? 1 : 0};
        transition: opacity 0.3s ease;
        white-space: nowrap;
    }
`;

const ToggleButton = styled.button`
    position: absolute;
    right: ${props => props.$isOpened ? '-12px' : '-24px'};
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border: ${props => props.$isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)' 
        : '1px solid rgba(0, 0, 0, 0.1)'};
    background-color: ${props => props.$isDark 
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.9)'};
    color: ${props => props.$isDark 
        ? 'var(--color-text-dark-default)' 
        : 'var(--color-text-light-default)'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: ${props => props.$isDark 
        ? '0 0 8px rgba(255, 255, 255, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.05)'
        : '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 0 4px rgba(0, 0, 0, 0.05)'};
    
    &:hover {
        background-color: ${props => props.$isDark 
            ? 'rgba(255, 255, 255, 0.1)'
            : '#ffffff'};
        border-color: ${props => props.$isDark 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(0, 0, 0, 0.2)'};
        box-shadow: ${props => props.$isDark 
            ? '0 0 12px rgba(255, 255, 255, 0.15), inset 0 0 12px rgba(255, 255, 255, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 0 4px rgba(0, 0, 0, 0.1)'};
    }

    svg {
        width: 14px;
        height: 14px;
        filter: ${props => props.$isDark 
            ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))'
            : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'};
        color: ${props => props.$isDark 
            ? '#ffffff' 
            : '#666666'};
    }
`;

const MainNavContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
        border-radius: 2px;
    }
`;

const BottomNavContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    color: ${props => props.$isDark ? 'var(--color-text-dark-default)' : 'var(--color-text-light-default)'};
    transition: all 0.2s ease;
    justify-content: ${props => props.$isOpened ? 'flex-start' : 'center'};
    
    span {
        opacity: ${props => props.$isOpened ? 1 : 0};
        transition: opacity 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        width: ${props => props.$isOpened ? 'auto' : '0'};
        padding-left: ${props => props.$isOpened ? '0' : '0'};
    }
    
    &:hover {
        background-color: ${props => props.$isDark ? 'var(--color-sidebar-background-dark-hover)' : 'var(--color-sidebar-background-light-hover)'};
        color: ${props => props.$isDark ? 'var(--color-text-dark-hover)' : 'var(--color-text-light-hover)'};
        padding: ${props => props.$isOpened ? '12px' : '12px 0'};
    }
    
    &.active {
        background-color: ${props => props.$isDark ? 'var(--color-sidebar-background-dark-active)' : 'var(--color-sidebar-background-light-active)'};
        color: ${props => props.$isDark ? 'var(--color-text-dark-active)' : 'var(--color-text-light-active)'};
        padding: ${props => props.$isOpened ? '12px' : '12px 0'};
    }
`;

const ThemeToggle = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 8px;
    border: none;
    border-radius: 8px;
    background-color: ${props => props.$isDark ? 'var(--color-button-background-dark-default)' : 'var(--color-button-background-light-default)'};
    color: ${props => props.$isDark ? 'var(--color-text-dark-default)' : 'var(--color-text-light-default)'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${props => props.$isOpened ? 'flex-start' : 'center'};
    gap: 8px;
    padding: ${props => props.$isOpened ? '12px' : '12px 0'};
    
    span {
        opacity: ${props => props.$isOpened ? 1 : 0};
        transition: opacity 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        width: ${props => props.$isOpened ? 'auto' : '0'};
    }
    
    &:hover {
        background-color: ${props => props.$isDark ? 'var(--color-button-background-dark-active)' : 'var(--color-button-background-light-active)'};
    }
`;

const Sidebar = (props) => {
    const [isOpened, setIsOpened] = useState(true);
    const [isDark, setIsDark] = useState(props.color === 'dark');
    const [activePath, setActivePath] = useState('/');

    const goToRoute = (path) => {
        setActivePath(path);
        console.log(`going to "${path}"`);
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <SidebarContainer $isOpened={isOpened} $isDark={isDark}>
            <LogoContainer $isOpened={isOpened} $isDark={isDark}>
                <img src={logo} alt="TensorFlow logo"/>
                <span>TensorFlow</span>
                <ToggleButton onClick={toggleSidebar} $isDark={isDark}>
                    <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'}/>
                </ToggleButton>
            </LogoContainer>
            
            <MainNavContainer>
                {routes.map(route => (
                    <NavItem
                        key={route.title}
                        onClick={() => goToRoute(route.path)}
                        className={activePath === route.path ? 'active' : ''}
                        $isOpened={isOpened}
                        $isDark={isDark}
                    >
                        <FontAwesomeIcon icon={route.icon}/>
                        <span>{route.title}</span>
                    </NavItem>
                ))}
            </MainNavContainer>
            
            <BottomNavContainer>
                {bottomRoutes.map(route => (
                    <NavItem
                        key={route.title}
                        onClick={() => goToRoute(route.path)}
                        className={activePath === route.path ? 'active' : ''}
                        $isOpened={isOpened}
                        $isDark={isDark}
                    >
                        <FontAwesomeIcon icon={route.icon}/>
                        <span>{route.title}</span>
                    </NavItem>
                ))}
                
                <ThemeToggle onClick={toggleTheme} $isOpened={isOpened} $isDark={isDark}>
                    <FontAwesomeIcon icon={isDark ? 'sun' : 'moon'}/>
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </ThemeToggle>
            </BottomNavContainer>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
