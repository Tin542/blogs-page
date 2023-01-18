import React from "react";
import ProfileComponent from '../../components/profile/Profile.component';
import { Post } from '../../data/post';

const ProfileContainer = () => {
    return (
        <>
            <ProfileComponent data={Post}/>
        </>
    )
}
export default ProfileContainer;