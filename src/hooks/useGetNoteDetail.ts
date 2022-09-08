import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNoteDetail } from 'src/pages/note_detail/noteDetailSlice';

type Props = {};

const useGetNoteDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id === undefined) return;

    dispatch(fetchGetNoteDetail(id));
  }, [dispatch, id]);

  const { isLoading, data: noteDetail } = useAppSelector((state) => state.noteDetail);

  return { isLoading, noteDetail };
};

export default useGetNoteDetail;
