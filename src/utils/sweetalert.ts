import Swal from 'sweetalert2';

interface Content {
  title?: string;
  text: string;
}

const sweetalert = {
  success(message: string = 'Successfully', duration: number = 4000) {
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
  confirm(content?: Content) {
    return Swal.fire({
      title: content?.title || 'Are you sure?',
      text: content?.text || "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  },

  close() {
    return Swal.close();
  },
};

export default sweetalert;
