import React from "react";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function ViewCheckbox({
  question,
  onEdit,
  onDelete,
  onApprove,
  approvedMsg,
  deletedMsg,
}) {
  // Normalize options based on data shape
  const options = question.checkbox_options
    ? question.checkbox_options // structured
    : [1, 2, 3, 4, 5] // flattened
        .map((num) => {
          const text = question[`option_${num}`];
          const isCorrect = question[`is_correct_${num}`];
          return text?.trim()
            ? { id: `opt${num}`, option_text: text, is_correct: isCorrect }
            : null;
        })
        .filter(Boolean); // remove nulls

  if (approvedMsg || deletedMsg) {
    return (
      <Msg_in_Body
        type={approvedMsg ? approvedMsg.type : deletedMsg.type}
        text={approvedMsg ? approvedMsg.text : deletedMsg.text}
      />
    );
  }

  return (
    <div className="card-qst bBlue-bgBlue">
      <p className="qst-head">{question.question_text}</p>
      <ul className="bullet-no">
        {options.map((opt) => (
          <li key={opt.id}>
            <span>
              <input
                className="check-grade"
                type="checkbox"
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
