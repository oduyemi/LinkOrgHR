import { Layout, Menu, Button } from "antd";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getSession } from "../../utils/sessionManager";

const { Header, Content } = Layout;

export default function WebsiteLayout() {
  // const session = getSession();
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>(null);

  // useEffect(() => {
  //   if (session) {
  //     setUserDetails(session);
  //   }
  // }, [navigate]);

  const handleMenuClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      {/* Ant Design Header */}
      <Header
        className="header sticky"
        style={{
          backgroundColor: "#010156",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
        }}
      >
        <div
          onClick={() => navigate("/")}
          className="logo"
          style={{ color: "white" }}
        >
          <h1
            className="text-xl font-semibold cursor-pointer"
            style={{ margin: 0, color: "#fff" }}
          >
            HR Management
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Menu
            mode="horizontal"
            selectedKeys={[current]}
            onClick={handleMenuClick}
            style={{
              backgroundColor: "transparent",
              borderBottom: "none",
              marginRight: "20px",
            }}
          >
            <Menu.Item key="careers">
              <Link to="/" style={{ color: "#fff" }}>
                Careers
              </Link>
            </Menu.Item>
          </Menu> */}

          {/* Login Button in Header */}
          {!userDetails && (
            <Button
              onClick={() => navigate("/auth/login")}
              type="primary"
              shape="default"
              style={{
                backgroundColor: "#fff",
                color: "#010156",
                borderColor: "#fff",
              }}
            >
              Login
            </Button>
          )}

          {/* Dashboard Button in Header */}
          {userDetails && (
            <Button
              onClick={() => navigate("/")}
              type="primary"
              shape="default"
              style={{
                backgroundColor: "#fff",
                color: "#010156",
                borderColor: "#fff",
              }}
            >
              Dashboard
            </Button>
          )}
        </div>
      </Header>

      {/* Main content area */}
      <Content style={{ padding: "20px" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 ">
          {/* Replace with your content */}
          <Outlet />
          {/* /End replace */}
        </div>
      </Content>
    </Layout>
  );
}
