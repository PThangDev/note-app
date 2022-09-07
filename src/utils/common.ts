import moment from 'moment';

export const delay = async (ms: number) => {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
};
export const formatDate = (date: string = '') => {
  return moment(date).format('DD-MM-YYYY');
};
export const getIdFormSlug = (slug: string) => {
  const slugSplit = slug.split('-');
  const id = slugSplit[slugSplit.length - 1];
  return id;
};
