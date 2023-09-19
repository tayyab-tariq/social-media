import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, Share, ShareOutlined } from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import { useLikePostMutation } from "../../slices/usersApiSlice";

const PostWidget = ({postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    }) => {
        
        const [isComments, setIsComments] = useState(false);
        const dispatch = useDispatch();
        const loggedInUserId = useSelector((state) => state.user._id);
        const isLiked = Boolean(likes[loggedInUserId]);
        const likeCount = Object.keys(likes).length;

        const { palette } = useTheme();
        const main = palette.neutral.main;
        const primary = palette.primary.main;
        const [likePost, { isLoading }] = useLikePostMutation();

        
        const patchLike = async () => {
            const response = await likePost({ userId: loggedInUserId, postId }).unwrap();

            dispatch(setPost({ post: response }));        
        };

        return (
            <WidgetWrapper m='2rem 0'>
                <Friend
                    friendId={postUserId}
                    name={name}
                    subtitle={location}
                    usePicturePath={userPicturePath}
                />
                <Typography color={main} sx={{ mt: '2rem' }}>
                    {description}
                </Typography>
                
                {picturePath && (
                    <img 
                        width='100%'
                        height='auto'
                        alt="post"
                        style={{ borderRadius: '0.75', marginTop: '0.75rem' }}
                        src={`http://localhost:5000/assets/${picturePath}`}
                    />
                )}
                
                <FlexBetween mt='0.25rem'>
                    <FlexBetween gap='1rem'>
                        <IconButton onClick={patchLike}>
                            {isLiked ? ( <FavoriteOutlined sx={{ color: primary }} /> ): ( 
                                <FavoriteBorderOutlined /> 
                            )}
                        </IconButton>
                        <Typography>
                            {likeCount}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>
                            {comments.length}
                        </Typography>
                    </FlexBetween>

                    <IconButton>
                        <ShareOutlined />
                    </IconButton>

                </FlexBetween>
                    
                {isComments && (
                    <Box mt='0.5rem'>
                        {comments.map((comment, i) => (
                            <Box key={`${name}-${i}`}> 
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                )}

            </WidgetWrapper>
        )
};

export default PostWidget