import { Link } from "react-router-dom";
import "./KidProfileButtonStyle.css";

export const KidProfileButton = ({ firstName, lastName, id }) => {
  return (
    <body>
      <div className="container">
        <Link to={`/KidProfilePage/${id}`}>
          <button className="button">
            {firstName} {lastName}
          </button>
        </Link>
      </div>
    </body>
  );
};
