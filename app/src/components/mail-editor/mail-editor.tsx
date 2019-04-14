import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { observable } from "mobx";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const Wrapper = styled.div`
  padding: 10px;
  background-color: #fefefe;
  border: 1px solid #ccc;
`;

interface MailEditorProps {}

@observer
export class MailEditor extends Component<MailEditorProps> {
  @observable
  private editorState = BraftEditor.createEditorState(null);

  render() {
    return (
      <Wrapper>
        <BraftEditor
          value={this.editorState}
          onChange={this.onChange}
          onSave={this.onSave}
        />
      </Wrapper>
    );
  }

  private onChange = (): void => {};
  private onSave = (): void => {};
}
