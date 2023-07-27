const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this.pool = new Pool();
  }

  async getSongsFromPlaylist(id) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM playlist_songs RIGHT JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1 GROUP BY songs.id',
      values: [id],
    };
    const {rows} = await this.pool.query(query);

    return rows;
  }
}

module.exports = PlaylistSongsService;
