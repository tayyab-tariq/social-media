import { Box } from "@mui/material";

const UserImage = ({ image, size = '60px' }) => {
    return (
        <Box width={size} height={size}>    
            <img 
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                width= '50px'
                height='50px'
                alt='user'
                src={`http://localhost:5000/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage