import React from 'react';

import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import useAppStore from '../store/useAppStore';
import NySykmelding from '../components/sykmelding/nysykmelding/NySykmelding';
import { StatusTyper } from '../types/sykmeldingDataTypes';
import AvvistSykmelding from '../components/sykmelding/avvistsykmelding/AvvistSykmelding';
import AvbruttSykmelding from '../components/sykmelding/avbruttsykmelding/AvbruttSykmelding';
import SendtSykmelding from '../components/sykmelding/sendtsykmelding/SendtSykmelding';
import BekreftetSykmelding from '../components/sykmelding/bekreftetsykmelding/BekreftetSykmelding';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmelding',
        sti: '/sykmeldinger/:id',
        erKlikkbar: false,
    },
];

const SykmeldingSide = () => {
    const { sykmelding, sykmeldingStatus, arbeidsgivere, sykmeldingUtenforVentetid } = useAppStore();

    if (!sykmelding || arbeidsgivere === null) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        switch (sykmeldingStatus) {
            case StatusTyper.NY: {
                if (sykmeldingUtenforVentetid === null) {
                    // TODO: Error-melding, ingen sykmelding funnet
                    return null;
                }

                return (
                    <NySykmelding
                        sykmelding={sykmelding}
                        arbeidsgivere={arbeidsgivere}
                        sykmeldingUtenforVentetid={sykmeldingUtenforVentetid}
                    />
                );
            }

            case StatusTyper.AVBRUTT:
                return <AvbruttSykmelding sykmelding={sykmelding} />;
            case StatusTyper.AVVIST:
                return <AvvistSykmelding sykmelding={sykmelding} />;
            case StatusTyper.SENDT:
                return <SendtSykmelding sykmelding={sykmelding} />;
            case StatusTyper.BEKREFTET:
                return <BekreftetSykmelding sykmelding={sykmelding} />;
            default:
                return null;
        }
    })();

    if (!SykmeldingComponent) {
        // TODO: Error-melding, ingen gyldig sykemeldingstype definert
        return null;
    }

    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler} />
            {SykmeldingComponent}
        </div>
    );
};

export default SykmeldingSide;
