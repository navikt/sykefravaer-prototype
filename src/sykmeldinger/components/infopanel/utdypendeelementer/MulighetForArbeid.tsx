import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import tekster from '../infopanel-tekster';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

// TODO: Koble opp til data i sykmelding
const testSvar = 'andre årsaker til sykefravær';

const MulighetForArbeid = () => {
    if (!true) {
        return null;
    }

    return (
        <SeksjonMedTittel understrek tittel={tekster['muliget-for-arbeid.tittel']}>
            <Margin>
                <ElementMedTekst tittel={tekster['muliget-for-arbeid.medisinske-arsaker.tittel']} />
                <EnkelCheckbox tittel={tekster['muliget-for-arbeid.medisinske-arsaker']} margin checked vis />
            </Margin>

            <ElementMedTekst
                tittel={tekster['muliget-for-arbeid.medisinske-arsaker.beskriv']}
                tekst={testSvar}
                margin
            />

            <Margin>
                <ElementMedTekst tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.tittel']} />
                <EnkelCheckbox tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen']} margin checked vis />
            </Margin>

            <ElementMedTekst
                tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.angi']}
                tekst={testSvar}
                margin
            />
        </SeksjonMedTittel>
    );
};

export default MulighetForArbeid;
