import {
  Box,
  Flex,
  Button,
  Image,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";

export default function WebsiteLayout() {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const userDetails = null; // Replace with actual user details logic

  return (
    <Box>
      {/* Header */}
      <Flex
        as="header"
        bg="#010156"
        color="white"
        justify="space-between"
        align="center"
        p={4}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Box onClick={() => navigate("/")}>
          <Image src={logo} alt="sitelogo" boxSize="70px" />
        </Box>
        <Flex align="center">
          {/* Login Button in Header */}
          {/* {!userDetails && (
            <Button
              onClick={() => navigate("/login")}
              colorScheme="whiteAlpha"
              variant="outline"
              mr={4}
            >
              Login
            </Button>
          )}
          Dashboard Button in Header
          {userDetails && ( */}
            <Button
              onClick={() => navigate("/")}
              colorScheme="whiteAlpha"
              variant="outline"
            >
              Dashboard
            </Button>
          {/* )} */}
        </Flex>
      </Flex>

      {/* Main content area */}
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
