import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, {
    isNotStarted,
    FetchState,
    hasData,
    isAnyNotStartedOrPending,
    hasAnyFailed,
} from './sykefravaer/hooks/useFetch';
import useAppStore from './store/useAppStore';
import { SykmeldingData } from './sykefravaer/types/sykmeldingDataTypes';
import { Sykmelding, Status } from './sykefravaer/types/sykmeldingTypes';

const DataFetcher = (props: { children: any }) => {
    const { setSykmeldinger } = useAppStore();
    const sykmeldingerFetcher = useFetch<SykmeldingData[]>();

    useEffect(() => {
        if (isNotStarted(sykmeldingerFetcher)) {
            sykmeldingerFetcher.fetch(
                '/syforest/sykmeldinger/',
                undefined,
                (fetchState: FetchState<SykmeldingData[]>) => {
                    if (hasData(fetchState)) {
                        const { data } = fetchState;
                        const sykmeldinger = data.map(sykmeldingData => ({
                            status: new Status(sykmeldingData.status),
                            sykmelding: new Sykmelding(sykmeldingData.sykmelding),
                        }));
                        console.log(sykmeldinger);
                        setSykmeldinger(sykmeldinger);
                    }
                },
            );
        }
    }, [setSykmeldinger, sykmeldingerFetcher]);

    if (isAnyNotStartedOrPending([sykmeldingerFetcher])) {
        return <Spinner />;
    }

    if (hasAnyFailed([sykmeldingerFetcher])) {
        return (
            <AlertStripeFeil>
                Det oppsto feil ved henting av data. Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    return props.children;
};

export default DataFetcher;
