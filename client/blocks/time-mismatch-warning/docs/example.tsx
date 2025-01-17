import React from 'react';
import { TimeMismatchWarning } from 'calypso/blocks/time-mismatch-warning';

const TimeMismatchWarningExample = () => {
	return <TimeMismatchWarning siteId={ 1 } settingsUrl="https://example.com" />;
};
TimeMismatchWarningExample.displayName = 'TimeMismatchWarning';

export default TimeMismatchWarningExample;
