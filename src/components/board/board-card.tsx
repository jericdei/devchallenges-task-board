"use client";

import { Board } from "@/db/schema";
import Logo from "../vector/logo";
import PencilIcon from "../vector/pencil-icon";
import { useState } from "react";
import CheckIcon from "../vector/check-icon";
import { updateBoard } from "@/lib/actions";

export default function BoardCard({ board }: { board: Board }) {
  const [editing, setEditing] = useState(false);
  const [boardData, setBoardData] = useState({
    name: board.name,
    description: board.description ?? "",
  });

  const editBoard = async () => {
    if (editing) {
      await updateBoard(board.id, boardData);
    }

    setEditing(!editing);
  };

  return (
    <div className="mb-4 grid w-full grid-cols-[min-content_1fr] grid-rows-2 gap-x-4 gap-y-2">
      <Logo className="row-span-1 self-center justify-self-end" />

      <div className="flex items-center gap-2">
        <div>
          <input
            type="text"
            className={`bg-transparent title w-full px-4 text-neutral-900 placeholder-neutral-400 outline-none ${editing ? "border-b border-neutral-400" : ""}`}
            value={boardData.name}
            onChange={(e) =>
              setBoardData({ ...boardData, name: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && editBoard()}
            readOnly={!editing}
          />
        </div>

        <button onClick={editBoard}>
          {editing ? (
            <div className="rounded-full bg-success-700">
              <CheckIcon />
            </div>
          ) : (
            <PencilIcon />
          )}
        </button>
      </div>

      <input
        type="text"
        className={`bg-transparent description col-start-2 px-4 text-neutral-900 placeholder-neutral-400 outline-none ${editing ? "border-b border-neutral-400" : ""}`}
        value={boardData.description ?? ""}
        onChange={(e) =>
          setBoardData({ ...boardData, description: e.target.value })
        }
        onKeyDown={(e) => e.key === "Enter" && editBoard()}
        readOnly={!editing}
      />
    </div>
  );
}
