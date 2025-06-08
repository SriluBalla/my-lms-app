import React from "react";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function ViewRadioButton({
  question,
  onEdit,
  onDelete,
  onApprove,
  approvedMsg,
  deletedMsg,
}) {
  // Normalize options from flat format
  const options = ["a", "b", "c", "d", "e"]
    .map((key) => {
      const text = question[`option_${key}`];
      return text?.trim()
        ? {
            id: `opt_${key}`,
            option_text: text,
            is_correct: key.toUpperCase() === question.is_correct,
          }
        : null;
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
    <div className="card-qst bPink-bgYellow">
      <p className="qst-head">{question.question_text}</p>
      <ul className="bullet-no">
        {options.map((opt) => (
          <li key={opt.id}>
            <span>
              <input
                className="check-grade"
                type="radio"
                disabled
                checked={opt.is_correct}
                readOnly
              />
              <p className="qst-opt">{opt.option_text}</p>
            </span>
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
