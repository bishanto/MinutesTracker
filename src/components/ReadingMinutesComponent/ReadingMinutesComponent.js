import "./ReadingMinutes.css";

export const ReadingMinutesComponent = ({ readingMinutes }) => {
  return (
    <body>
      <div className="container">{readingMinutes} Minutes</div>
    </body>
  );
};
