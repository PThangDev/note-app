import Swal from 'sweetalert2';
export const SweetError = (message: string = 'Something went wrong!') => {
  return Swal.fire({
    iconHtml: '<p class="swal2-icon-sad"></p>',
    title: 'Error...',
    text: message,
    // footer: '<a href="">Why do I have this issue?</a>',
  });
};
