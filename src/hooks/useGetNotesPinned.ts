import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotesPinned } from 'src/pages/pins/notesPinnedSlice';

type Props = {};

const useGetNotesPinned = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetNotesPinned());
  }, [dispatch]);

  const { isLoading, data: notesPinned } = useAppSelector((state) => state.notesPinned);

  return { isLoading, notesPinned };
};

export default useGetNotesPinned;
