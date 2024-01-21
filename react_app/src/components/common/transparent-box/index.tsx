import "./style.scss";

function TransparentBox({ type, text, icon: BoxIcon }) {
  return (
    <div className={`highlights ${type}`}>
      <div className="icon">
        <BoxIcon />
      </div>
      <div className="text">{text}</div>
    </div>
  );
}

export default TransparentBox;
