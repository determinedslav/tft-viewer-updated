import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingSplash from '../components/LoadingSplash';
import {setLoggedUser} from '../redux/actions/loggedUser';
import service from "../network/graphql-service";

const Profile = () => {

    const [selectedTab, setSelectedTab] = useState('Profile');

    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [newPassword, setNewPassword] = useState(' ');
    const [confNewPassword, setConfNewPassword] = useState(' ');
    const [errorMessageUser, setErrorMessageUser] = useState(' ');
    const [confMessageUser, setConfMessageUser] = useState(' ');
    const [errorMessagePass, setErrorMessagePass] = useState(' ');
    const [confMessagePass, setConfMessagePass] = useState(' ');
    const [errorMessageDel, setErrorMessageDel] = useState(' ');
    const [deleteCheck, SetDeleteCheck] = useState(false);

    const loggedUser = useSelector(state => state.loggedUser);
    const loggedUserFriends = useSelector(state => state.loggedUser.friends);

    const dispatch = useDispatch();
    const history = useHistory();

    const renderSection = () => {
        switch(selectedTab) {
            case 'Profile':
                return profile()
            case 'Saved Players':
                return players()
            case 'Settings':
                return settings()
            default:
              return 'An error has occurred while trying to open page';
        }
    }

    const logout = () => {
        dispatch(setLoggedUser({}))
        history.push('/')
    }

    const loadFriend = (friend) => {

    }

    const validateUsername = () => {
        if (username === ' ') {
            return;
        } else if (username.length < 4 || username.length > 16) {
            setErrorMessageUser("Usernames must be between 4 and 16 symbols long");
        }else if (username === loggedUser.username) {
                setErrorMessageUser("Username is the same");
        } else {
            setErrorMessageUser(" ");
            editUserUsername();
        }
    }

    const validatePassword = () => {
        if (password === ' ' || newPassword === ' ' || confNewPassword === ' ') {
            return;
        } else if (newPassword.length < 6 || newPassword.length > 20) {
            setErrorMessagePass("Passwords must be between 6 and 20 symbols long");
        } else if (newPassword !== confNewPassword) {
            setErrorMessagePass("Password does not match");
        } else if (newPassword === password) {
            setErrorMessagePass("New password cannot be the same as old password");
        } else {
            editUserPassword();
        }
    }

    const validateDelete = () => {
        if (deleteCheck === true) {
            deleteUser();
        }
    }

    const editUserUsername = async () => {
        try{
            const response = await service.editUserUsername(loggedUser.email, username);
            if(response && response.hasOwnProperty('data')){
                console.log(response)
                setErrorMessageUser(" ")
                setConfMessageUser("Username has been updated");
                let user = loggedUser;
                user.username = response.data.editUserUsername.username;
                dispatch(setLoggedUser(user))
                setTimeout(()=>{
                    setConfMessageUser(" ");
                },4000);
            } else {
                setErrorMessageUser("An error has occured while trying to update username");
            }
        } catch (error){
            setErrorMessageUser("An error has occured while trying to update username");
        }
    }

    const editUserPassword = async () => {
        try{
            const response = await service.editUserPassword(loggedUser.email, password, newPassword);
            if(response && response.hasOwnProperty('data')){
                console.log(response)
                setErrorMessagePass(" ");
                setConfMessagePass("Password has been updated");
                setTimeout(()=>{
                    setConfMessagePass(" ");
                },4000);
            } else {
                setErrorMessagePass("Wrong password");
            }
        } catch (error){
            setErrorMessagePass("An error has occured while trying to update password");
        }
    }

    const deleteUser = async () => {
        try{
            const response = await service.deleteUser(loggedUser.email);
            if(response && response.hasOwnProperty('data')){
                console.log(response)
                dispatch(setLoggedUser({}))
                history.push('/');
            } else {
                setErrorMessageDel("An error has occured while trying to delete account");
            }
        } catch (error){
            setErrorMessageDel("An error has occured while trying to delete account");
        }
    }

    const removeFriend = async (friend) => {
        try{
            delete friend.__typename;
            const response = await service.removeFriend(loggedUser.email, friend);
            if(response && response.hasOwnProperty('data')){
                console.log(response)
                let user = loggedUser;
                user.friends = response.data.removeFriend.friends;
                dispatch(setLoggedUser(user))
            } else {
                console.log("error");
            }
        } catch (error){
            console.log(error);
        }
    }

    const profile = () => {
        return <div>
            {loggedUser.savedAccount === undefined ?
            <div className="row mb-3">
                <div className="col">
                    <form id="searchUser" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">Save Your League Account</div>
                        <div className="row p-2">
                            <div className="col-md-8">
                                <input type="text" className="form-control mt-2" id="user" placeholder="Username"  required/>
                            </div>
                            <div className="col-md-4">
                            <select id="selectRegion" defaultValue = "0" className="form-control mt-2"  required>
                                <option value="0" disabled>Select region</option>
                                <option value="eun1">EU Nordic and East</option>
                                <option value="euw1">EU West</option>
                            </select>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-md-9">
                                <div className="p-1 m-1 text-danger small" id="errMessage">
                                    errorMessage
                                </div>
                            </div>           
                            <div className="col-md-3 text-right">
                                <button className="btn btn-primary"><i className="fa fa-search mr-1"></i>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            :
            <div>
                <div className = "row mt-4">
                    <div className="col">
                        <div className="mb-3">Saved Account</div>
                        <div className="p-2">
                            <div>{loggedUser.savedAccount} undefined</div>
                            <button className="btn btn-primary mt-3 mb-4">Change</button>
                        </div>
                    </div>        
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 col-sm-7 col-9">
                        <div className="p-2 mb-3 bg-white border rounded">
                            <div className="text-center">
                                <div>
                                    <span className="font-weight-bold">BlackHeart</span>
                                    <span className="text-muted">#EUNE</span>								
                                </div>
                                <div className="font-weight-bold">
                                    lvl&nbsp;123
                                </div>
                                <div>
                                    <img className="img-fluid float-center w-25 m-3" src= {"images/emblems/PLATINUM.PNG"} alt="Ranked Emblem"/>
                                </div>
                                <div className="font-weight-bold">
                                    PLATINUM&nbsp;IV&nbsp;0LP
                                </div>
                            </div>
                            <div className="mt-3 p-2">
                                <div className="text-center font-weight-bold mb-3 mt-2">Ranked statistics</div>
                                <div className="border-bottom mb-2">
                                    <span className="font-weight-bolder">Games played&nbsp;</span><span className="float-right">88</span>
                                </div>
                                <div className="border-bottom mb-2">
                                    <span className="font-weight-bolder">Games won&nbsp;</span><span className="float-right">11</span>
                                </div>
                                <div className="border-bottom mb-2">
                                    <span className="font-weight-bolder">Win rate&nbsp;</span><span className="float-right">12%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    }

    const players = () => {
        return <div>
            <div className="row">
                <div className="col">
                {loggedUserFriends.length === 0 ?
                <div className="mt-3 mb-3">You don't have any players saved to your account</div>
                :
                loggedUserFriends.map((friend, i) => {
                    return <div key={i} className="border-bottom p-3 mb-1">
                        <span className="h5">{friend.name + "#" + friend.region}</span>
                        <span className="float-right ml-2 mb-2">
                            <button className="btn btn-sm btn-primary ml-3" onClick = {() => loadFriend(friend)}><i className="fa fa-search"></i></button>
                            <button className="btn btn-sm btn-danger ml-3" onClick = {() => removeFriend(friend)}><i className="fa fa-close"></i></button>
                        </span>
                    </div>
                })}
                </div>
            </div>
        </div>
    }

    const settings = () => {
        return <div>
            <div className="row border-bottom">
                <div className="col">
                    <div className="mb-3">Registered Email</div>
                    <div className="p-2">
                        <div>{loggedUser.email}</div>
                    </div>
                </div>
            </div>
            <div className="row border-bottom">
                <div className="col-lg-6">
                    <form id="changeUsername" onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-3 mb-3">Change Username</div>
                        <div className="p-2">
                            <input type="text" className="form-control mt-1" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} required/>
                            <div className="p-1 m-1 text-danger small" id="errMessageUser">
                                {errorMessageUser}&nbsp;<span className="text-success">{confMessageUser}</span>
                            </div>
                            <button className="btn btn-primary mt-3 mb-4" onClick = {() => validateUsername()}>Change</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row border-bottom">
                <div className="col-lg-6">
                    <form id="changePassword" onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-3 mb-3" >Change Password</div>
                        <div className="p-2">
                            <div className="mb-3">
                                <label>Old Password</label>
                                <input type="password" className="form-control" id="oldPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label>New Password</label>
                                <input type="password" className="form-control" id="newPassword" placeholder="Password" onChange={e => setNewPassword(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control" id="ConfNewPassword" placeholder="Password" onChange={e => setConfNewPassword(e.target.value)} required/>
                            </div>
                            <div className="p-1 m-1 text-danger small" id="errMessagePass">
                                {errorMessagePass}&nbsp;<span className="text-success">{confMessagePass}</span>
                            </div>
                            <button className="btn btn-primary mt-3 mb-4" onClick = {() => validatePassword()}>Change</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form id="delete" onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-3 mb-3" >Delete Account</div>
                        <div className="p-2">
                            <button className="btn btn-danger mt-3 mb-4" onClick = {() => validateDelete()}>Delete</button>
                            <div className="ml-3">
                                <input type="checkbox" className="form-check-input" id="deleteCheck" onChange = {e => SetDeleteCheck(e.target.checked)} required/>
                                <label className="text-danger small form-check-label" htmlFor="deleteCheck">This will permanently delete the account, the action is irreversible</label>
                                <div className="p-1 m-1 text-danger small" id="errMessageDel">
                                    {errorMessageDel}&nbsp;
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

    return <div>
        {loggedUser.username === undefined ? 
        <LoadingSplash message="Login to your account"></LoadingSplash>
        :
        <div className="row">
            <div className="col-lg-3">
                <div className="bg-light border rounded-top mb-3">
                    <div className="text-muted p-2 mb-1">
                        My profile
                    </div>
                    <ul className="list-group text-right">
                        <li className={selectedTab === 'Profile' ? "list-group-item active" : "btn list-group-item list-group-item-action"} onClick = {() => setSelectedTab('Profile')}>Profile</li>
                        <li className={selectedTab === 'Saved Players' ? "list-group-item active" : "btn list-group-item list-group-item-action"} onClick = {() => setSelectedTab('Saved Players')}>Saved Players</li>
                        <li className={selectedTab === 'Settings' ? "list-group-item active" : "btn list-group-item list-group-item-action"} onClick = {() => setSelectedTab('Settings')}>Settings</li>
                        <li className="btn list-group-item list-group-item-secondary list-group-item-action" onClick = {() => logout()}>Sign out</li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-9">
                <div className="bg-light border rounded-top">
                    <div className="text-muted border-bottom p-2">
                        {selectedTab}
                    </div>
                    <div className="bg-white p-4">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
}

export default Profile;