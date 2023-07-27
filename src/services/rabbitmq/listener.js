class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this.playlistsService = playlistsService;
    this.playlistSongsService = playlistSongsService;
    this.mailSender = mailSender;
  }

  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const playlist = await this.playlistsService.getPlaylistById(playlistId);
      playlist['songs'] = await this.playlistSongsService.getSongsFromPlaylist(playlistId);
      const result = await this.mailSender.sendMail(targetEmail, JSON.stringify({playlist}));
      console.log("success", result);
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  }
}

module.exports = Listener;
