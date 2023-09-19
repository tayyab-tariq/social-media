import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { useGetPostsMutation, useGetUserPostsMutation } from "../../slices/usersApiSlice";


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [feedPost, { isLoading }] = useGetPostsMutation();
  const [userPosts, { isUserLoading }] = useGetUserPostsMutation();


  const getPosts = async () => {
    const response = await feedPost().unwrap();
    dispatch(setPosts({ posts: response }));
  };

  const getUserPosts = async () => {
    const response = await userPosts(userId).unwrap();
    dispatch(setPosts({ posts: response }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts && posts.map(({
        _id, 
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <PostWidget 
          key={_id}
          postId = {_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
        />
      ))}
    </>
  )
}

export default PostsWidget