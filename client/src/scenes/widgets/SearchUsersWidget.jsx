import { Box, Typography, useTheme, IconButton, InputBase } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchUsers from "../../components/SearchUsers";

const SearchUsersWidget = ({ title, userId }) => {
  const { palette } = useTheme();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const token = useSelector((state) => state.token);
  
  const [searchedUser, setSearchedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const searchUsers = async () => {
    const response = await fetch(`http://localhost:3001/users/all`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAllUsers(data);
  };

  const checkFilteredUsers = () => {
    const filtered = allUsers.filter((user) => {
      return user.firstName.toLowerCase().includes(searchedUser.toLowerCase());
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    searchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {title}
      </Typography>
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="9px"
        gap="3rem"
        padding="0.1rem 1.5rem"
      >
        <InputBase placeholder="Search..." onChange={(e) => {
          setSearchedUser(e.target.value);
          checkFilteredUsers();
        }} />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          mt: "1rem",
        }}
      >
        {filteredUsers.map((user) => {
          return (
            <SearchUsers user={user} />
          );
        })}
      </Box>
      
    </WidgetWrapper>
  );
};

export default SearchUsersWidget;
