import "./App.css";

import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";

import UserTable from "./components/UserTable";
import userAPIs from "./services/user";
import fetchUserData from "./services/fetchUserData";
import OrderTable from "./components/OrderTable";
import fetchOrderData from "./services/fetchOrderData";
import orderAPIs from "./services/order";
import { isAdmin } from "./constants";

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
`;

const ContentWrapper = styled(Content)`
  padding: 0 25px;
  margin-top: 64px;
`;

const StyledContent = styled.div`
  padding: 24px;
  min-height: 380px;
`;

function App() {
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [tableNav, setTableNav] = useState("order");
  useEffect(() => {
    async function getUserData() {
      const userData = await fetchUserData(userAPIs.getUser);
      setUser(userData);
    }
    async function getOrderData() {
      const orderData = await fetchOrderData(orderAPIs.getOrders);
      setOrder(orderData);
    }
    getUserData();
    getOrderData();
  }, []);
  return (
    <Layout>
      <StyledHeader>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["order"]}>
          <Menu.Item key="order" onClick={() => setTableNav("order")}>
            订单
          </Menu.Item>
          {isAdmin ? (
            <Menu.Item key="user" onClick={() => setTableNav("user")}>
              用户
            </Menu.Item>
          ) : null}
        </Menu>
      </StyledHeader>
      <ContentWrapper>
        <StyledContent>
          {tableNav === "user" ? (
            <UserTable data={user} setUser={setUser} />
          ) : (
            <OrderTable data={order} setOrder={setOrder} />
          )}
        </StyledContent>
      </ContentWrapper>
    </Layout>
  );
}

export default App;
