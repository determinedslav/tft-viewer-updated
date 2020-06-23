import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import {setLoggedUser} from '../redux/actions/loggedUser';

const NavProfile = props => {

    const loggedUserUsername = useSelector(state => state.loggedUser.username);
    const loggedUserFriends = useSelector(state => state.loggedUser.friends);

    const dispatch = useDispatch();
    const history = useHistory();

    const redirect = (value) => {
        switch(value) {
            case 'login':
                history.push('/login');
                break;
            case 'register':
                history.push('/register');
                break;
            case 'profile':
                history.push('/profile');
                break;
            default:
              return 'Error';
          }
    };

    const logout = () => {
        dispatch(setLoggedUser({}))
        history.push('/')
    }

    return <div>
            {loggedUserUsername !== undefined ? 
            <div>
                <div className="btn text-light">
                    <span onClick = {() => redirect("profile")}><i className="fa fa-user mr-2"></i>{loggedUserUsername}</span><span onClick = {() => logout()}><i className="fa fa-sign-out ml-4"></i></span>
                </div>
                <div className="text-light">
                    <select id="selectFriend" defaultValue = "0" className="form-control-sm">
                        <option value="0" disabled>Saved players</option>
                        {loggedUserFriends.map((friend, i) => {
                            return <option key={i} value={friend}>{friend}</option>
                        })}
                    </select>
                </div>
            </div> 
            :
            <div className="">
                <div className="btn btn-outline-light" onClick = {() => redirect("login")}>Login</div>
                <div className="btn btn-outline-primary ml-2" onClick = {() => redirect("register")}>Register</div>
            </div>
            }
        </div>
}
    
export default NavProfile;