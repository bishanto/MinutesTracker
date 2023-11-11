import "./MathMinutes.css";

export const MathMinutesComponent = ({ mathMinutes }) => {
  return (
    <body>
      <div className="container">{mathMinutes} Minutes</div>
    </body>
  );
};
