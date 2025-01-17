import React from 'react';
import { useDispatch } from 'react-redux';
import { getAtomicPhpVersion } from 'calypso/state/hosting/actions';

export default function QuerySitePhpVersion( { siteId } ) {
	const dispatch = useDispatch();
	React.useEffect( () => {
		dispatch( getAtomicPhpVersion( siteId ) );
	}, [ dispatch, siteId ] );

	return null;
}
