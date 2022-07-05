// Import library
import classNames from 'classnames/bind';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { convertFromHTML, convertToRaw, EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import remarkGfm from 'remark-gfm';

// Import src
import styles from './FormEditNote.module.scss';
import { Note } from 'src/types/Note';
import { Input } from 'src/layouts/UI/Form';
import { Button } from 'src/layouts/UI';
import { Col, Container, Row } from 'src/layouts/UI/Grid';
interface Props {
  data: Note;
}

const cx = classNames.bind(styles);

const FormEditNote: FC<Props> = ({ data }) => {
  // ********** Declaration **********

  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(data.content);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  });

  const [title, setTitle] = useState<string>(data.title);

  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // ********** Handle Event **********
  const uploadImageCallBack = (file: any) => {
    console.log(file);
  };
  const handleChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const content = draftToHtml(convertToRaw(editorState.getCurrentContent())) || '';

  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  // ********** Logic and render UI **********

  return (
    <div className={cx('wrapper')}>
      <div className={cx('form')}>
        <Input
          className={cx('title')}
          value={title}
          name="title"
          placeholder="Your title..."
          onChange={handleChangeInputTitle}
        />
        <Editor
          wrapperClassName={cx('draft-wrapper-class')}
          editorClassName={cx('draft-editor-class')}
          toolbarClassName={cx('draft-toolbar-class')}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />

        <div className={cx('background')}>
          <h3 className={cx('background-heading')}>
            Choose background card :
            <input
              name="background"
              value={data.background || 'rgb(177, 177, 177)'}
              onChange={() => {}}
              type="text"
              placeholder="Background color..."
            />
          </h3>
          <div className={cx('background-options')}>
            <input name="background" type="radio" />
            <input name="background" type="radio" />
            <input name="background" type="radio" />
            <input name="background" type="radio" />
          </div>
        </div>
        <div className={cx('actions')}>
          <Button>Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
      <div className={cx('preview')}>
        <h3 className={cx('heading')}>Preview</h3>
        <div className={cx('preview-content')}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} children={'* [ ] sdkshakfdkashfk'}></ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default FormEditNote;
