import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNoteDetail } from 'src/pages/note_detail/noteDetailSlice';

type Props = {};

const useGetNoteDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (slug === undefined) return;
    dispatch(fetchGetNoteDetail(slug));
  }, [dispatch, slug]);

  const { isLoading, data: noteDetail } = useAppSelector((state) => state.noteDetail);

  return { isLoading, noteDetail };
};

export default useGetNoteDetail;
