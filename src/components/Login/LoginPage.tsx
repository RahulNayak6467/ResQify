// import LoginForm from "./LoginForm";
import Circle from "./Circle";
import LoginForm from "./LoginForm";
import LoginInfo from "./LoginInfo";

function LoginPage() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <section className="flex items-center justify-center  h-[600px] ">
        <LoginInfo />
        <LoginForm />
      </section>
    </section>
  );
}

export default LoginPage;
