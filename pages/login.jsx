import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Student from "../components/svg/Student";

export default function Login() {
  const { register, handleSubmit, watch, errors } = useForm();

  // media queries
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 451px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-device-width: 450px)",
  });

  const onSubmit = (data, e) => {
    axios
      .post(process.env.BACKEND_BASEURL + "/login", {
        studentID: data.studentID,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Your GPA: ${res.data.msg}`, { autoClose: 4000 });
      });
  };

  return (
    <div className="login">
      <ToastContainer />

      {isDesktopOrLaptop && (
        <div className="desktop_under_construct">
          <p>
            Hi, currently this website is only available for mobile user with
            450 pixels screen and below. Thank you.
          </p>
        </div>
      )}

      <div className="content_wrapper">
        <div className="header">
          <Student />
          Student Portal
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("studentID", { required: true })}
            placeholder="Student ID"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          <button>
            Login <i className="fad fa-sign-in"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
