import './Card.css';
import type { PropsWithChildren } from "react";

function Card(props: PropsWithChildren) {
  return (
    <div className="card">
          { props.children }
    </div>
  );
}

export default Card;