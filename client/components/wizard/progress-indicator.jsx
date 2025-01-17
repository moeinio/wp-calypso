import { useTranslate } from 'i18n-calypso';
import PropTypes from 'prop-types';
import React from 'react';

import './progress-indicator.scss';

const ProgressIndicator = ( { stepNumber, totalSteps } ) => {
	const translate = useTranslate();

	return (
		<div
			className="wizard__progress-indicator"
			data-e2e-type={ 'step-indicator-' + ( stepNumber + 1 ) }
		>
			{ translate( 'Step %(stepNumber)d of %(stepTotal)d', {
				args: {
					stepNumber: stepNumber + 1,
					stepTotal: totalSteps,
				},
			} ) }
		</div>
	);
};

ProgressIndicator.propTypes = {
	stepNumber: PropTypes.number.isRequired,
	totalSteps: PropTypes.number.isRequired,
};

export default ProgressIndicator;
