import { Box, Typography, useTheme } from "@mui/material"
import { useEffect } from "react";
import Friend from "../../components/Friend";
import { setFriends } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useGetFriendsMutation } from "../../slices/usersApiSlice";


const FriendsListWidget = ({ userId }) => {

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends);
  const [userFriends, { isLoading }] = useGetFriendsMutation();


  const getFriends = async () => {
    const res = await userFriends(userId).unwrap();
    dispatch(setFriends({ friends: res }));
  }

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
        <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight='500'
            sx={{ mb: '1.5rem' }}
        >
            Friend List
        </Typography>
        <Box display='flex' flexDirection='column' gap='3rem' mb='1.5rem' >
            {friends.map((friend) => (
                <Friend 
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    usePicturePath={friend.picturePath}
                />
            ))}
        </Box>
    </WidgetWrapper>
  )
}

export default FriendsListWidget