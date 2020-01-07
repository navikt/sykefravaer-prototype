import React from 'react';
import { SykmeldingData } from '../../../types/sykmeldingDataTypes';
import { Soknad } from '../../../types/soknadTypes';
import { Sidetittel, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Kategori from '../../../components/Kategori';
import Lenkepanel from '../../../components/Lenkepanel';

import bjorn from '../../../svg/bjorn.svg';
import { useParams } from 'react-router-dom';

interface SoknadGodkjentProps {
    sykmeldingDto: SykmeldingData;
    soknad: Soknad;
}

const SoknadGodkjent = ({ sykmeldingDto, soknad }: SoknadGodkjentProps) => {
    const { id } = useParams();
    const { sykmelding } = sykmeldingDto;

    return (
        <div className="soknad-godkjent">
            <Sidetittel style={{ textAlign: 'center', marginBottom: '1rem' }}>Sykmelding</Sidetittel>
            <Undertittel style={{ textAlign: 'center', marginBottom: '3rem' }}>
                fra {sykmelding.perioder[0].fom.toDateString()} til{' '}
                {sykmelding.perioder[sykmelding.perioder.length - 1].tom.toDateString()}
            </Undertittel>
            <div style={{ marginBottom: '3rem' }}>
                <Veilederpanel type={'plakat'} svg={bjorn}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Normaltekst style={{ marginBottom: '1rem' }}>
                            NAV har godkjent din søknad om sykepenger
                        </Normaltekst>
                    </div>
                </Veilederpanel>
            </div>
            <Kategori tittel={'Begrunnelse'}>
                <Normaltekst>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eius itaque distinctio, id numquam
                    sint doloribus perferendis alias! Nostrum aut quos corrupti voluptatibus quod magnam nihil?
                    Consectetur minus error maxime!
                </Normaltekst>
                <Lenkepanel
                    innhold={
                        <>
                            <h1>Utbetaling fra NAV</h1>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores laboriosam repudiandae
                                magnam dolorum, laborum quam? Perferendis, atque error ratione minus magnam aspernatur
                                recusandae doloribus nemo suscipit velit fugit autem nulla!
                            </p>
                            <h3>Vi har beregnet følgende for deg</h3>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum minus possimus sint
                                inventore, corporis debitis delectus expedita quae nobis provident magnam voluptatum
                                quis, reiciendis aspernatur nesciunt et, nisi obcaecati! Libero.
                            </p>
                        </>
                    }
                    lenkeTil={`/sykmeldinger/${id}/beslutning`}
                />
            </Kategori>
            <Kategori tittel={'Dokumenter for beslutningsgrunnlag'}>
                <Lenkepanel innhold={'Inntektsmelding'} lenkeTil={'#'} />
                <Lenkepanel innhold={'Sykmeldinger for periode'} lenkeTil={'#'} />
                <Lenkepanel innhold={'Søknader om sykepenger for periode'} lenkeTil={'#'} />
            </Kategori>
        </div>
    );
};

export default SoknadGodkjent;
