import Link from "next/link";

interface Props {
  link: string;
  title: string;
  buttonTitle: string;
}

export default function AddButton(props: Props) {
  return (
    <div className="flex  items-center justify-between my-2 mx-6">
      <h1 className="text-xl font-bold ">{props.title}</h1>

      <Link href={props.link} className="">
        <button className="addButtonStyle rounded ">{props.buttonTitle}</button>
      </Link>
    </div>
  );
}
