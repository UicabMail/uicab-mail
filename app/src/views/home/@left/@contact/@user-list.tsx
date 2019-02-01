import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { List, Avatar } from "antd";

const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

const Wrapper = styled.div`
  flex: 1;
`;

interface UserListProps {}

@observer
export class UserList extends Component<UserListProps> {
  render() {
    return (
      <Wrapper>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://avatars0.githubusercontent.com/u/33797740?s=460&v=4" />
                }
                title={item.title}
              />
              <div>写信</div>
            </List.Item>
          )}
        />
      </Wrapper>
    );
  }
}
