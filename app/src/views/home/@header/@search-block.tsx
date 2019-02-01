import React, { Component, ReactNode, FormEvent, createRef } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { observable, action } from "mobx";
import classNames from "classnames";
import { Icon as _Icon, Tooltip } from "antd";

const Wrapper = styled.div`
  width: 100%;
  max-width: 530px;
  height: 42px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.2s linear;

  &.focus {
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.24);
  }
`;

const Icon = styled(_Icon)`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 50%;
  transition: all 0.2s linear;

  &:hover {
    background-color: rgba(60, 64, 67, 0.08);
    cursor: pointer;
  }
`;

const SearchIcon = styled(Icon)`
  font-size: 20px;
  font-weight: 700;
`;

const ClearIcon = styled(Icon)`
  font-size: 14px;
  font-weight: normal;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

interface SearchBlockProps {}

@observer
export class SearchBlock extends Component<SearchBlockProps> {
  @observable
  private searchFocus = false;

  @observable
  private searchText = "";

  private searchInput = createRef<HTMLInputElement>();

  render() {
    return (
      <Wrapper className={classNames({ focus: this.searchFocus })}>
        {this.buildTooltip(<SearchIcon type="search" />, "搜索")}
        <SearchInput
          ref={this.searchInput}
          placeholder="搜索邮件"
          value={this.searchText}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
        />
        {this.searchText
          ? this.buildTooltip(
              <ClearIcon type="close" onClick={this.onClear} />,
              "清除搜索条件"
            )
          : undefined}
      </Wrapper>
    );
  }

  private buildTooltip(node: ReactNode, title: string): ReactNode {
    return (
      <Tooltip placement="bottom" title={title} mouseEnterDelay={0.2}>
        {node}
      </Tooltip>
    );
  }

  @action
  private toggleSearchFocus(): void {
    this.searchFocus = !this.searchFocus;
  }

  @action
  private setSearchText(searchText: string): void {
    this.searchText = searchText;
  }

  private onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    this.setSearchText(currentTarget.value.trim());
  };

  private onFocus = (): void => {
    this.toggleSearchFocus();
  };

  private onBlur = (): void => {
    this.toggleSearchFocus();
  };

  private onClear = (): void => {
    this.setSearchText("");
    this.searchInput.current!.focus();
  };
}
