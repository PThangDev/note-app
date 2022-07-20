import Swal from 'sweetalert2';

const sweetalert = {
  success(message: string = 'Successfully', duration: number = 1500) {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: duration,
    });
  },

  error(message: string = 'Server not responding!') {
    return Swal.fire({
      iconHtml: '<p class="swal2-icon-sad"></p>',
      title: 'Error...',
      text: message,
      // footer: '<a href="">Why do I have this issue?</a>',
    });
  },
  loading() {
    return Swal.fire({
      title: 'Loading...',
      footer: 'Wait a minute!',
      didOpen: () => {
        Swal.showLoading();
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  },
};

export default sweetalert;
