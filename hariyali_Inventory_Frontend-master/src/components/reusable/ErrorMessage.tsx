export default function ErrorMessage({ message }: { message: any }) {
  return (
    <>
      <span className={"text-red-600"}>{`${message}`}</span>
    </>
  );
}
