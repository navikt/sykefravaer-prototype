import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import { sykmeldingerMock } from './data/sykmeldinger';
import naermesteLedereMock from './data/narmesteLedereMock';
import arbeidsgiverMock from './data/arbeidsgivereMock';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

// sykefravaer
mock.get('/syforest/sykmeldinger', sykmeldingerMock);

// sykmeldinger
mock.get('/syforest/sykmelding/:id', sykmeldingerMock[0]);
mock.get('/syforest/informasjon/arbeidsgivere', arbeidsgiverMock);
mock.post('/syforest/sendSykmelding', { res: 'posted sykmelding' });
mock.post('/syforest/sykmeldinger/:id/actions/erUtenforVentetid', { erUtenforVentetid: false });
mock.get('/syforest/naermesteledere', naermesteLedereMock);
