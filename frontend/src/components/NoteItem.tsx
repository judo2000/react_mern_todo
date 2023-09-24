import { FC } from "react";
import AppButton from "./AppButton";

interface Props {
  title?: string;
  onEditClick?(): void;
  onDeleteClick?(): void;
}

const NoteItem: FC<Props> = ({ title, onEditClick, onDeleteClick }) => {
  return (
    <div>
      <p className="font-semibold mb-4 text-gray-700 text-lg">{title}</p>
      <div className="space-x-4">
        <AppButton
          title="View"
          type="regular"
          onClick={() => {
            console.log("Viewing Note");
          }}
        />
        <AppButton onClick={onEditClick} title="Edit" type="normal" />
        <AppButton title="Delete" type="danger" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;
