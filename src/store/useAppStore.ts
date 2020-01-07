import createUseContext from 'constate';
import { useState } from 'react';
import { SykmeldingData } from '../sykefravaer/types/sykmeldingDataTypes';
import { Soknad, Beslutning } from '../sykefravaer/types/soknadTypes';

import { Sykmelding } from '../sykmeldinger/types/sykmeldingTypes';
import { StatusTyper } from '../sykmeldinger/types/sykmeldingDataTypes';
import Arbeidsgiver from '../sykmeldinger/types/arbeidsgiverTypes';

const useAppStore = createUseContext(() => {
    // sykefravaer
    const [sykmeldinger, setSykmeldinger] = useState<SykmeldingData[] | null>(null);
    const [soknader, setSoknader] = useState<Soknad[] | null>([
        new Soknad({ id: '1', beslutning: Beslutning.GODKJENT }),
    ]);

    const sykefravaerApp = {
        sykmeldinger,
        setSykmeldinger,
        soknader,
        setSoknader,
    };

    // sykmeldinger
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [sykmeldingStatus, setSykmeldingStatus] = useState<StatusTyper | null>(null);
    const [arbeidsgivere, setArbeidsgivere] = useState<Arbeidsgiver[] | null>(null);
    const [sykmeldingUtenforVentetid, setSykmeldingUtenforVentetid] = useState<boolean | null>(null);

    const sykmeldingerApp = {
        sykmelding,
        setSykmelding,
        sykmeldingStatus,
        setSykmeldingStatus,
        arbeidsgivere,
        setArbeidsgivere,
        sykmeldingUtenforVentetid,
        setSykmeldingUtenforVentetid,
    };

    return { ...sykefravaerApp, ...sykmeldingerApp };
});

export default useAppStore;
