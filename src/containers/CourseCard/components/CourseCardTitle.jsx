import React from 'react';
import PropTypes from 'prop-types';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import useActionDisabledState from './hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { isPassing } = reduxHooks.useCardGradeData(cardId);
  const { homeUrl, isStarted } = reduxHooks.useCardCourseRunData(cardId);
  const { hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const handleTitleClicked = reduxHooks.useTrackCourseEvent(
    courseTitleClicked,
    cardId,
    homeUrl,
  );
  const { disableCourseTitle } = useActionDisabledState(cardId);

  // Decide label
  let statusLabel = 'Not started';
  if (isPassing) {
    statusLabel = 'Completed';
  } else if (hasStarted) {
    statusLabel = 'Started';
  }

  // --- inline styles (inside component file) ---
  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const baseBadgeStyle = {
    fontSize: '0.75rem',
    padding: '0.15rem 0.5rem',
    borderRadius: '999px',
    fontWeight: 600,
  };

  const statusVariantStyles = {
    'Not started': {
      backgroundColor: '#f0f0f0',
      color: '#555',
    },
    Started: {
      backgroundColor: '#e0f3ff',
      color: '#005b9f',
    },
    Completed: {
      backgroundColor: '#e3f6e8',
      color: '#1c7c3c',
    },
  };

  const TitleTag = disableCourseTitle ? 'span' : 'a';
  const titleProps = disableCourseTitle
    ? {}
    : {
        href: homeUrl,
        onClick: handleTitleClicked,
      };

  return (
    <h3 style={wrapperStyle}>
      <span
        style={{ ...baseBadgeStyle, ...statusVariantStyles[statusLabel] }}
        aria-label={`Course status: ${statusLabel}`}
      >
        {statusLabel}
      </span>

      <TitleTag
        className="course-card-title"
        data-testid="CourseCardTitle"
        {...titleProps}
      >
        {courseName}
      </TitleTag>
    </h3>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
