import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const Wrapper = styled.div`
  padding: 10px;
  background-color: #fefefe;
  border: 1px solid #ccc;
`;

interface MailEditorProps {
  initContent?: string;
}

@observer
export class MailEditor extends Component<MailEditorProps> {
  private editorInstance: BraftEditor | undefined;

  render() {
    let { initContent } = this.props;

    return (
      <Wrapper>
        <BraftEditor
          ref={instance =>
            (this.editorInstance = instance ? instance : undefined)
          }
          defaultValue={BraftEditor.createEditorState(initContent)}
        />
      </Wrapper>
    );
  }

  getValue = (): string | undefined => {
    if (!this.editorInstance) {
      return undefined;
    }

    return this.editorInstance.getValue().toHTML();
  };
}
