const axios = require('axios');
const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('fastify-raw-body'), {
  field: 'rawBody', // change the default request.rawBody property name
  global: false, // add the rawBody to every request. Default: `true`
  encoding: 'utf8', // set it to false to set rawBody as a Buffer. Default: `'utf8'`
  runFirst: true, // get the body before any preParsing hook change/uncompress it. Default: `false`
});

fastify.register(require('fastify-cors'), {
  origin: true,
});

fastify.register(require('fastify-compress'), { global: true });

fastify.addContentTypeParser(
  'application/x-ndjson',
  { parseAs: 'string' },
  function (req, body, done) {
    try {
      done(null, body); // forward as string
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  }
);

fastify.post('/*', {
  config: {
    rawBody: true,
  },
  handler: (req, reply) => {
    const res = axios.post(
      'https://search.1xinternet.de/test-rvk-content-node-is/_msearch',
      // 'https://rvk-test.1xinternet.de/api-proxy/search/test-rvk-content-node-is/_msearch',
      // 'https://beta.reykjavik.is/api-proxy/search/stage-rvk-content-node-is/_msearch',
      req.body,
      {
        headers: { 'Content-Type': 'application/x-ndjson' },
        auth: { username: 'hugsmidjan', password: 'HugSearch2020' },
        // auth: { username: 'reykjavik', password: 'LetM3In' },
      }
    );

    res
      .then((response) => {
        console.info(response);
        reply.send(response.data);
      })
      .catch((reason) => {
        reply.send({ reason });
      });
  },
});

fastify.listen(9000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
