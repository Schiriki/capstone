import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {NavigationContainer, NavLinksContainer, NavLink, LogoContainer} from './navigation.styles'
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../util/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)

    const signOutHandler = async () => {
        await signOutUser();
    }

	return (
		<Fragment>
			<NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>)
                        : ( <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>)}

                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	)
}

export default Navigation