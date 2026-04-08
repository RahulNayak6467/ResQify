function ErrorMessage({ message }: { message: string }) {
  return <span className="text-critical text-sm ml-1">{message}</span>;
}

export default ErrorMessage;
