import React from "react";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function ViewShortAnswer({
  question,
  onEdit,
  onDelete,
  onApprove,
  approvedMsg,
  deletedMsg,
}) {
  // Extract options from question (option_1 to option_4)
  const bulletPoints = [1, 2, 3, 4]
    .map((i) => question[`option_${i}`])
    .filter((opt) => opt?.trim());

  if (approvedMsg || deletedMsg) {
    return (
      <Msg_in_Body
        type={approvedMsg ? approvedMsg.type : deletedMsg.type}
        text={approvedMsg ? approvedMsg.text : deletedMsg.text}
      />
    );
  }

  return (
    <div className="card-qst bPurple-bgViolet">
      <p className="qst-head">{question.question_text}</p>
      <ul className="bullet-dash">
        {bulletPoints.map((point, idx) => (
          <li key={idx}>
            <p className="qst-opt">{point}</p>
          </li>
        ))}
      </ul>

      <div className="center">
        <ButtonAction
          className="edit"
          data-testid="btn-edit"
          type="button"
          id={`edit-${question.id}`}
          label="Edit Question"
          onClick={() => onEdit(question.id)}
        />

        <ButtonAction
          className="approve"
          data-testid="btn-approve"
          type="button"
          id={`approve-${question.id}`}
          label="Approve Question"
          onClick={() => onApprove(question.id)}
        />

        <ButtonAction
          className="flagged"
          data-testid="btn-delete"
          type="button"
          id={`delete-${question.id}`}
          label="Delete Question"
          onClick={() => onDelete(question.id)}
        />
      </div>
    </div>
  );
}
