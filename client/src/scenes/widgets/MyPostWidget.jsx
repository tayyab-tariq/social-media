import {
  EditOutlined,
  DeleteOutlineOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  DeleteOutlined
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import { useState } from "react";
import { setPosts } from "../../state";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatePostsMutation } from "../../slices/usersApiSlice";



const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const [userPosts, { isLoading }] = useUpdatePostsMutation();


    const handlePost = async () => {
        const jsonObj = {'userId': _id, 'description': post}
        if (image){
            jsonObj.picture = image;
            jsonObj.pictureObj = image.name;   
        }
        
        const posts = await userPosts(jsonObj).unwrap();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    };
    
    return(
        <WidgetWrapper>
            <FlexBetween gap='1.5rem'>
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem'
                    }}
                />
            </FlexBetween>
            
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius='5px'
                    mt='1rem'
                    p='1rem'
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            setImage(acceptedFiles[0])
                        }}
                    >
                        {( { getRootProps, getInputProps } ) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p='1rem'
                                    width='100%'
                                    sx={{ '&:hover': { cursor: 'pointer' } }}
                                >
                                    <input {...getInputProps()}/>
                                    {
                                        !image ? (
                                            <p>Add Image Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{image.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )
                                    }
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />
            
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                        <GifBoxOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                        <AttachFileOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                        <MicOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                    ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem'
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )

};

export default MyPostWidget;
