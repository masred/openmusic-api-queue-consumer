require('dotenv').config();

const PlaylistsService = require('./services/postgres/PlaylistsService');
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService');
const MailSender = require('./services/mail/MailSender');
const runConsumer = require('./services/rabbitmq/consumer');
const Listener = require('./services/rabbitmq/listener');

const serve = async () => {
  const playlistsService = new PlaylistsService();
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();

  const listener = new Listener(
      playlistsService, playlistSongsService, mailSender,
  );

  await runConsumer(listener);
};

serve();
