import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';
import './basic.less';

import useAppStore from './store/useAppStore';
import DataFetcher from './DataFetcher';

// Ditt Sykefravær
import DittSykefravaer from './sykefravaer/pages/DittSykefravaer/DittSykefravaer';
import DineSykmeldinger from './sykefravaer/pages/DineSykmeldinger/DineSykmeldinger';
import Soknad from './sykefravaer/pages/Soknad';
import BeslutningFraNav from './sykefravaer/pages/BeslutningerFraNav/BeslutningFraNav';
import SykmeldingOversikt from './sykefravaer/pages/SykmeldingOversikt/SykmeldingOversikt';
import Inntektsmelding from './sykefravaer/pages/Inntektsmelding';
import TidslinjeSide from './sykefravaer/pages/TidslinjeSide/TidslinjeSide';

// Sykmeldinger
import SykmeldingSide from './sykmeldinger/pages/SykmeldingSide';

const App = () => {
    return (
        <useAppStore.Provider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        {/* Ditt Sykefravær */}
                        <Route exact path="/" component={DittSykefravaer} />
                        <Route exact path="/sykmeldinger/" component={DineSykmeldinger} />
                        <Route exact path="/tidslinjen/" component={TidslinjeSide} />
                        <Route exact path="/sykmeldinger/:id/" component={SykmeldingOversikt} />
                        <Route exact path="/sykmeldinger/:id/inntektsmelding/" component={Inntektsmelding} />
                        <Route exact path="/sykmeldinger/:id/soknad/" component={Soknad} />
                        <Route exact path="/sykmeldinger/:id/beslutning/" component={BeslutningFraNav} />

                        {/* Sykmeldinger */}
                        <Route exact path="/sykmeldinger/:id/vis/" component={SykmeldingSide} />
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </useAppStore.Provider>
    );
};

export default App;
