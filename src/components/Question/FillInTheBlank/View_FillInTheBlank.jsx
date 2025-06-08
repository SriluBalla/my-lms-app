import React from "react";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function ViewFillInTheBlank({
  question,
  onEdit,
  onDelete,
  onApprove,
  approvedMsg,
  deletedMsg,
}) {
  const answers = [1, 2, 3, 4, 5]
    .map((i) => {
      const answer = question[`option_${i}`];
      return answer?.trim() ? answer.trim() : null;
    })
    .filter(Boolean);

  if (approvedMsg || deletedMsg) {
    return (
      <Msg_in_Body
        type={approvedMsg ? approvedMsg.type : deletedMsg.type}
        text={approvedMsg ? approvedMsg.text : deletedMsg.text}
        duration={-1}
      />
    );
  }

  return (
    <div className="card-qst bNavy-bgBlue">
      <p className="qst-head">{question.question_text}</p>

      <div className="fill-answers">
        <p className="qst-opt">
          <strong>Acceptable Answers:</strong> {answers.join(", ")}
        </p>
      </div>

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
