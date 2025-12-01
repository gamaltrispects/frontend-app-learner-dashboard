import React from 'react';
import PropTypes from 'prop-types';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from './hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const courseData = reduxHooks.useCardCourseData(cardId);
  const GradeData = reduxHooks.useCardGradeData(cardId);
  const courseRun = reduxHooks.useCardCourseRunData(cardId);
  console.log("============ courseData ========================");
  console.log(courseData);
  console.log(GradeData);
  console.log(courseRun);
  console.log("============ courseData ========================");
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const handleTitleClicked = reduxHooks.useTrackCourseEvent(
    courseTitleClicked,
    cardId,
    homeUrl,
  );
  const { disableCourseTitle } = useActionDisabledState(cardId);
  return (
    <h3>
      {disableCourseTitle ? (
        <span className="course-card-title" data-testid="CourseCardTitle">{courseName}</span>
      ) : (
        <a
          href={homeUrl}
          className="course-card-title"
          data-testid="CourseCardTitle"
          onClick={handleTitleClicked}
        >
          {courseName}
        </a>
      )}
    </h3>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
