/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment } from "react";
import Moment from "react-moment";
import Link from "../../components/Link";
import JobDetail from "./JobDetail";
import { useDrag } from "react-dnd";
import Button from "../../components/Button";

export default ({
  job,
  onRemoveClick,
  onUploadClick,
  onEditClick,
  onApply,
  ...props
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "JOB", job },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      sx={{
        p: 5,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: 25,
        alignItems: "center",
        opacity: isDragging ? 0.5 : 1,
      }}
      {...props}
    >
      <JobDetail job={job}></JobDetail>
      <div
        sx={{
          display: "grid",
          gridGap: 25,
          alignItems: "center",
          gridTemplateColumns: job.resume
            ? "110px 1fr auto 115px"
            : "1fr auto 115px",
        }}
      >
        <div>
          <Moment format="MMM D, YYYY">{job.created_at}</Moment>
        </div>
        {job.resume ? (
          <Fragment>
            <div
              sx={{
                fontSize: 5,
                color: job.score >= 0.8 ? "primary" : "border",
              }}
            >
              <i className="fas fa-check"></i>
            </div>
            <div
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                gridGap: 4,
                justifyContent: "center",
              }}
            >
              <Link onClick={onUploadClick}>
                <i className="fas fa-upload"></i>
              </Link>
              <Link onClick={onEditClick}>
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                onClick={() =>
                  window.confirm(`Are you user to remove ${job.title}`) &&
                  onRemoveClick()
                }
              >
                <i className="fas fa-trash"></i>
              </Link>
            </div>
            <Button onClick={onApply}>Apply</Button>
          </Fragment>
        ) : (
          <Fragment>
            <Link
              onClick={() =>
                window.confirm(`Are you user to remove ${job.title}`) &&
                onRemoveClick()
              }
            >
              <i className="fas fa-trash"></i>
            </Link>
            <Button onClick={onUploadClick}>
              <i className="fas fa-upload"></i> Upload
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};
