import RegisterForm from "./RegisterForm";
import RegisterStrip from "./RegisterStrip";

function Register() {
  return (
    // <section className="flex items-center justify-center ">
    //   <RegisterStrip />
    //   <RegisterForm />
    // </section>
    <section className="flex items-center justify-center min-h-screen">
      <section className="flex items-center justify-center  h-[720px] ">
        <RegisterStrip />
        <RegisterForm />
      </section>
    </section>
  );
}

export default Register;
