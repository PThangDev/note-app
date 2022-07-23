import Swal from 'sweetalert2';

const Toast = (duration: number, status: string) => {
  return Swal.mixin({
    customClass: `custom-toast-${status}`,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};
const sweetToast = {
  success(message: string = 'Successfully', duration: number = 300000) {
    return Toast(duration, 'success').fire({
      icon: 'success',
      title: message,
    });
  },
};
export default sweetToast;
