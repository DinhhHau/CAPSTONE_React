import Swal from "sweetalert2";

const showToast = (icon, title, text) =>
  Swal.fire({
    title,
    text,
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
/* TODO:
1. call api service  để lấy data => then =>(data)=>{
    lấy data lưu vào
}
*/ 
export default {
    showToast
};
