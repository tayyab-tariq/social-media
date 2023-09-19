import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FriendsListWidget from "../widgets/FriendsListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import Navbar from "../navbar/Navbar";
import { useGetUsersMutation } from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";


const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const [userData, { isLoading }] = useGetUsersMutation();
  const { _id } = useSelector((state) => state.user);


  const getUser = async () => {
    const res = await userData({userId: _id}).unwrap();
    
    // Now, 'userId' will contain the dynamic value from the URL
    console.log(`User data for user with ID ${userId}:`, res);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box width='10%'>

      </Box>
    </Box>
  )
}

export default Profile