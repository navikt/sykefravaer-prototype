import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, {
    isNotStarted,
    FetchState,
    hasData,
    isAnyNotStartedOrPending,
    hasAnyFailed,
    isAnyPending,
} from './hooks/useFetch';
import useAppStore from './store/useAppStore';
import { Sykmelding, Status } from './sykefravaer/types/sykmeldingTypes';
import { SykmeldingData, StatusTyper } from './sykmeldinger/types/sykmeldingDataTypes';
import ErUtenforVentetidData from './sykmeldinger/types/erUtenforVentetidTypes';
import Arbeidsgiver from './sykmeldinger/types/arbeidsgiverTypes';

const DataFetcher = (props: { children: any }) => {
    const { setSykmeldinger } = useAppStore();
    const sykmeldingerFetcher = useFetch<SykmeldingData[]>();
    const { setSykmelding, setSykmeldingStatus, setArbeidsgivere, setSykmeldingUtenforVentetid } = useAppStore();
    const sykmeldingFetcher = useFetch<SykmeldingData>();
    const arbeidsgivereFetcher = useFetch<Arbeidsgiver[]>();
    const sykmeldingUtenforVentetidFetcher = useFetch<ErUtenforVentetidData>();

    useEffect(() => {
        if (isNotStarted(sykmeldingFetcher)) {
            sykmeldingFetcher.fetch(
                `/syforest/sykmelding/ny123`,
                undefined,
                (fetchState: FetchState<SykmeldingData>) => {
                    if (hasData(fetchState)) {
                        const { data } = fetchState;
                        const sykmelding = new Sykmelding(data.sykmelding);
                        const sykmeldingStatus = data.status;
                        setSykmelding(sykmelding);
                        setSykmeldingStatus(sykmeldingStatus);

                        arbeidsgivereFetcher.fetch(
                            `/syforest/informasjon/arbeidsgivere?sykmeldingId=${sykmelding.id}`,
                            undefined,
                            (fetchState: FetchState<Arbeidsgiver[]>) => {
                                if (hasData(fetchState)) {
                                    const { data } = fetchState;
                                    const arbeidsgivere = data.map(ag => new Arbeidsgiver(ag));
                                    setArbeidsgivere(arbeidsgivere);
                                }
                            },
                        );

                        // Dersom sykmeldingen er ny skal den berikes
                        if (sykmeldingStatus === StatusTyper.NY) {
                            sykmeldingUtenforVentetidFetcher.fetch(
                                `/syforest/sykmeldinger/${sykmelding.id}/actions/erUtenforVentetid`,
                                { method: 'POST' },
                                (fetchState: FetchState<ErUtenforVentetidData>) => {
                                    if (hasData(fetchState)) {
                                        setSykmeldingUtenforVentetid(fetchState.data.erUtenforVentetid);
                                    }
                                },
                            );
                        }
                    }
                },
            );
        }
    }, [
        setSykmeldingUtenforVentetid,
        setSykmelding,
        setSykmeldingStatus,
        sykmeldingFetcher,
        sykmeldingUtenforVentetidFetcher,
        arbeidsgivereFetcher,
        setArbeidsgivere,
    ]);

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

    if (isAnyPending([sykmeldingFetcher, sykmeldingUtenforVentetidFetcher, arbeidsgivereFetcher])) {
        return <Spinner />;
    }

    if (hasAnyFailed([sykmeldingFetcher, sykmeldingUtenforVentetidFetcher, arbeidsgivereFetcher])) {
        return (
            <AlertStripeFeil>
                Det oppsto feil ved henting av data. Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    return props.children;
};

export default DataFetcher;
