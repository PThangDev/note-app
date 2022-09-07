import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import EmptyItem from 'src/components/EmptyItem';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotes } from '../notes/noteSlice';
import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const notes = useAppSelector((state) => state.notes);
  const [isShowSelect, setIsShowSelect] = useState<boolean>(false);
  const [notesChecked, setNotesChecked] = useState<string[]>([]);
  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(fetchGetNotes({ is_trash: true, sort: '-updatedAt' }));
  }, [dispatch]);

  // ********** Handle Event **********
  const handleToggleCheckbox = (id: string) => {
    setNotesChecked((prevNotesChecked) => {
      if (prevNotesChecked.includes(id)) {
        return prevNotesChecked.filter((note) => note !== id);
      } else {
        return [...prevNotesChecked, id];
      }
    });
  };
  const handleToggleSelect = () => {
    setIsShowSelect((prevIsShowSelect) => {
      if (prevIsShowSelect) {
        setNotesChecked([]);
      }
      return !prevIsShowSelect;
    });
  };
  // ********** Logic and render UI **********

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Trash</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <ButtonDeleteMany hardDelete noteIds={notesChecked} />
          <ButtonSelect isActive={isShowSelect} onClick={handleToggleSelect} />
        </div>
        {notes.data.length === 0 && <EmptyItem />}
        <CardNoteContainer
          heading="Note Trash"
          data={notes.data}
          isLoading={notes.isLoading}
          isTrash
          isShowSelect={isShowSelect}
          onToggleCheckbox={handleToggleCheckbox}
        />
      </div>
    </>
  );
};
export default TrashsPage;
