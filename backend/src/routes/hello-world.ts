import RouteHandler from '@framework/routeHandler';

const handler: RouteHandler = {
  config: {
    method: 'get',
    isPublic: true
  },
  async handle (req, res) {
    res.send('Hello World');
  },
};

export default handler;
