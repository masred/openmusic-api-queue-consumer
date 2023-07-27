const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE playlists.id = $1',
      values: [id],
    };
    const {rows} = await this.pool.query(query);

    if (!rows.length) {
      throw new Error('Playlist Not Found');
    }

    return rows[0];
  }
}

module.exports = PlaylistsService;
