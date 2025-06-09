import React from "react";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function ViewMatchColumn({
  question,
  onEdit,
  onDelete,
  onApprove,
  approvedMsg,
  deletedMsg,
}) {
  const matchPairs = [1, 2, 3, 4]
    .map((i) => {
      const left = question[`option_${i}_a`];
      const right = question[`option_${i}_b`];
      return left && right ? { left, right } : null;
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
    <div className="card-qst bOrange-bgYellow">
      <p className="qst-head">{question.question_text}</p>
      <table className="table-match">
        <thead>
          <tr>
            <th>Column A</th>
            <th>Column B</th>
          </tr>
        </thead>
        <tbody>
          {matchPairs.map((pair, index) => (
            <tr key={index}>
              <td>{pair.left}</td>
              <td>{pair.right}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
